/**
 * @module swagger
 */
/** */
import * as Fs from "fs";
import * as PathUtils from "path";
import * as Express from "express";
import {Info, Schema, Spec, Tag} from "swagger-schema-official";
import {$log} from "ts-log-debug";
import {Store} from "../../core/class/Store";
import {ExpressApplication} from "../../core/services/ExpressApplication";
import {deepExtends, nameOf} from "../../core/utils";
import {Inject} from "../../di/decorators/inject";
import {Service} from "../../di/decorators/service";
import {ControllerProvider} from "../../mvc/class/ControllerProvider";
import {EndpointMetadata} from "../../mvc/class/EndpointMetadata";
import {ControllerService} from "../../mvc/services/ControllerService";
import {ServerSettingsService} from "../../server/services/ServerSettingsService";
import {OpenApiEndpointBuilder} from "../class/OpenApiEndpointBuilder";
import {ISwaggerPaths, ISwaggerSettings} from "../interfaces";
import {getReducers} from "../utils";


@Service()
export class SwaggerService {

    constructor(private controllerService: ControllerService,
                private serverSettingsService: ServerSettingsService,
                @Inject(ExpressApplication) private expressApplication: ExpressApplication) {

    }

    private uiMiddleware() {
      return require("swagger-ui-express");
    }

    private validateMiddleware() {
      return require("swagger-express-middleware");
    }

    /**
     *
     */
    $afterRoutesInit(): void|Promise<void> {
      const conf = this.serverSettingsService.get<ISwaggerSettings>("swagger");
      const host = this.serverSettingsService.getHttpPort();
      const path = conf && conf.path || "/docs";


    }

    swaggerValidationErrorHandler(error: any, req: Express.Request, res: Express.Response, next: Express.NextFunction): any {
      if (error) {
        const errorOrEmptyObj = error || {};
        return res.status(errorOrEmptyObj.status || 500).json({
          message: errorOrEmptyObj.message || "Internal Server Error",
        });
      }
      return next();
    }

    $afterControllersInit(): void|Promise<void> {
      const conf = this.serverSettingsService.get<ISwaggerSettings>("swagger");
      const host = this.serverSettingsService.getHttpPort();
      const path = conf && conf.path || "/docs";

      if (conf) {
        let cssContent;

        if (conf.cssPath) {
          cssContent = Fs.readFileSync(PathUtils.resolve(this.serverSettingsService.resolve(conf.cssPath)), {encoding: "utf8"});
        }

        const spec = this.getOpenAPISpec();

        $log.info(`Swagger UI is available on http://${host.address}:${host.port}${path}`);

         this.expressApplication.use(path, this.uiMiddleware().serve);
        this.expressApplication.get(path, this.uiMiddleware().setup(spec, conf.showExplorer, conf.options || {}, cssContent));

        $log.info(`Swagger Json is available on http://${host.address}:${host.port}${path}/swagger.json`);
        this.expressApplication.get(`${path}/swagger.json`, this.onRequest);

        if (conf && conf.specPath) {
          const spec = this.getOpenAPISpec();
          Fs.writeFileSync(conf.specPath, JSON.stringify(spec, null, 2));
        }

        if (conf.validate) {
          return new Promise((resolve, reject) => {
            return this.validateMiddleware()(spec, this.expressApplication, (err: any, middleware: any) => {
              if (err) {
                $log.error("Error when binding with the swagger middleware: $err");
                reject("Error when binding with the swagger middleware");
              }

              this.expressApplication.use(
                middleware.metadata(),
                middleware.files(),
                middleware.parseRequest(),
                middleware.validateRequest(),
              )
              .use(this.swaggerValidationErrorHandler);

              resolve();
            });
          });
        }
      }
    }

    private onRequest = (req: any, res: any, next: any) => {
        if (req.url.indexOf("swagger.json") > -1) {
            const content = this.getOpenAPISpec();
            res.status(200).json(content);
            next();
        }
    };

    /**
     *
     * @returns {Spec}
     */
    public getOpenAPISpec(): Spec {
        const defaultSpec = this.getDefaultSpec();
        const paths: ISwaggerPaths = {};
        const definitions = {};
        let tags: Tag[] = [];

        this.controllerService.forEach((provider: ControllerProvider) => {
            if (!provider.hasParent()) {
                provider.routerPaths.forEach(path => {
                    this.buildRoutes(paths, definitions, provider, provider.getEndpointUrl(path));
                });

                tags.push(this.buildTags(provider));
            }
        });

        return deepExtends(
            defaultSpec,
            {
                tags,
                paths,
                definitions
            },
            getReducers()
        );
    }

    private readSpecPath(path: string) {
        path = this.serverSettingsService.resolve(path);
        if (Fs.existsSync(path)) {
            const json = Fs.readFileSync(path, {encoding: "utf8"});
            /* istanbul ignore else */
            if (json !== "") {
                return JSON.parse(json);
            }
        }
        return {};
    }

    /**
     * Return the global api information.
     * @returns {Info}
     */
    public getDefaultSpec(): Spec {
        const {version} = this.serverSettingsService;
        const consumes = this.serverSettingsService.acceptMimes;
        const produces = ["application/json"];
        const {
            spec = {
                info: {},
                securityDefinitions: {}
            }, specPath
        } = this.serverSettingsService.get<ISwaggerSettings>("swagger") || {} as any;
        let specPathContent = {};

        if (specPath) {
            specPathContent = this.readSpecPath(specPath);
        }

        /* istanbul ignore next */
        const {
            title = "Api documentation",
            description = "",
            version: versionInfo,
            termsOfService = "",
            contact,
            license
        } = spec.info || {} as any;

        return deepExtends({
                swagger: "2.0",
                info: {
                    version: versionInfo || version,
                    title,
                    description,
                    termsOfService,
                    contact,
                    license
                },
                consumes,
                produces,
                securityDefinitions: spec.securityDefinitions || {}
            },
            specPathContent,
            getReducers()
        );
    }

    /**
     *
     * @param paths
     * @param definitions
     * @param ctrl
     * @param endpointUrl
     */
    private buildRoutes(paths: ISwaggerPaths, definitions: { [key: string]: Schema }, ctrl: ControllerProvider, endpointUrl: string) {

        ctrl.dependencies
            .map(ctrl => this.controllerService.get(ctrl))
            .forEach((provider: ControllerProvider) =>
                this.buildRoutes(paths, definitions, provider, `${endpointUrl}${provider.path}`)
            );

        ctrl.endpoints.forEach((endpoint: EndpointMetadata) => {

            /* istanbul ignore else */
            if (endpoint.hasHttpMethod()) {
                const builder = new OpenApiEndpointBuilder(endpoint, endpointUrl).build();

                deepExtends(paths, builder.paths);
                deepExtends(definitions, builder.definitions);
            }
        });
    }

    private buildTags(ctrl: ControllerProvider): Tag {
        const clazz = ctrl.useClass;
        const ctrlStore = Store.from(clazz);

        return Object.assign(
            {
                name: ctrlStore.get("name") || nameOf(clazz),
                description: ctrlStore.get("description")
            },
            ctrlStore.get("tag") || {}
        );
    }
}
