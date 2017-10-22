"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
/**
 * @module swagger
 */
/** */
var Fs = require("fs");
var PathUtils = require("path");
var ts_log_debug_1 = require("ts-log-debug");
var Store_1 = require("../../core/class/Store");
var ExpressApplication_1 = require("../../core/services/ExpressApplication");
var utils_1 = require("../../core/utils");
var inject_1 = require("../../di/decorators/inject");
var service_1 = require("../../di/decorators/service");
var ControllerService_1 = require("../../mvc/services/ControllerService");
var ServerSettingsService_1 = require("../../server/services/ServerSettingsService");
var OpenApiEndpointBuilder_1 = require("../class/OpenApiEndpointBuilder");
var utils_2 = require("../utils");
var SwaggerService = /** @class */ (function () {
    function SwaggerService(controllerService, serverSettingsService, expressApplication) {
        var _this = this;
        this.controllerService = controllerService;
        this.serverSettingsService = serverSettingsService;
        this.expressApplication = expressApplication;
        this.onRequest = function (req, res, next) {
            if (req.url.indexOf("swagger.json") > -1) {
                var content = _this.getOpenAPISpec();
                res.status(200).json(content);
                next();
            }
        };
    }
    SwaggerService.prototype.uiMiddleware = function () {
        return require("swagger-ui-express");
    };
    SwaggerService.prototype.validateMiddleware = function () {
        return require("swagger-express-middleware");
    };
    /**
     *
     */
    SwaggerService.prototype.$beforeRoutesInit = function () {
        var _this = this;
        var conf = this.serverSettingsService.get("swagger");
        var host = this.serverSettingsService.getHttpPort();
        var path = conf && conf.path || "/docs";
        ts_log_debug_1.$log.info("Swagger Json is available on http://" + host.address + ":" + host.port + path + "/swagger.json");
        this.expressApplication.get(path + "/swagger.json", this.onRequest);
        if (conf) {
            var cssContent = void 0;
            if (conf.cssPath) {
                cssContent = Fs.readFileSync(PathUtils.resolve(this.serverSettingsService.resolve(conf.cssPath)), { encoding: "utf8" });
            }
            var spec_1 = this.getOpenAPISpec();
            ts_log_debug_1.$log.info("Swagger UI is available on http://" + host.address + ":" + host.port + path);
            this.expressApplication.use(path, this.uiMiddleware().serve);
            this.expressApplication.get(path, this.uiMiddleware().setup(spec_1, conf.showExplorer, conf.options || {}, cssContent));
            if (conf.specPath) {
                Fs.writeFileSync(conf.specPath, JSON.stringify(spec_1, null, 2));
            }
            if (conf.validate) {
                return new Promise(function (resolve, reject) {
                    return _this.validateMiddleware()(spec_1, _this.expressApplication, function (err, middleware) {
                        if (err) {
                            ts_log_debug_1.$log.error("Error when binding with the swagger middleware: $err");
                            reject("Error when binding with the swagger middleware");
                        }
                        _this.expressApplication.use(middleware.metadata(), middleware.files(), middleware.parseRequest(), middleware.validateRequest());
                        // .use(swaggerValidationErrorHandler)
                        resolve();
                    });
                });
            }
        }
    };
    /**
     *
     * @returns {Spec}
     */
    SwaggerService.prototype.getOpenAPISpec = function () {
        var _this = this;
        var defaultSpec = this.getDefaultSpec();
        var paths = {};
        var definitions = {};
        var tags = [];
        this.controllerService.forEach(function (provider) {
            if (!provider.hasParent()) {
                provider.routerPaths.forEach(function (path) {
                    _this.buildRoutes(paths, definitions, provider, provider.getEndpointUrl(path));
                });
                tags.push(_this.buildTags(provider));
            }
        });
        return utils_1.deepExtends(defaultSpec, {
            tags: tags,
            paths: paths,
            definitions: definitions
        }, utils_2.getReducers());
    };
    SwaggerService.prototype.readSpecPath = function (path) {
        path = this.serverSettingsService.resolve(path);
        if (Fs.existsSync(path)) {
            var json = Fs.readFileSync(path, { encoding: "utf8" });
            /* istanbul ignore else */
            if (json !== "") {
                return JSON.parse(json);
            }
        }
        return {};
    };
    /**
     * Return the global api information.
     * @returns {Info}
     */
    SwaggerService.prototype.getDefaultSpec = function () {
        var version = this.serverSettingsService.version;
        var consumes = this.serverSettingsService.acceptMimes;
        var produces = ["application/json"];
        var _a = this.serverSettingsService.get("swagger") || {}, _b = _a.spec, spec = _b === void 0 ? {
            info: {},
            securityDefinitions: {}
        } : _b, specPath = _a.specPath;
        var specPathContent = {};
        if (specPath) {
            specPathContent = this.readSpecPath(specPath);
        }
        /* istanbul ignore next */
        var _c = spec.info || {}, _d = _c.title, title = _d === void 0 ? "Api documentation" : _d, _e = _c.description, description = _e === void 0 ? "" : _e, versionInfo = _c.version, _f = _c.termsOfService, termsOfService = _f === void 0 ? "" : _f, contact = _c.contact, license = _c.license;
        return utils_1.deepExtends({
            swagger: "2.0",
            info: {
                version: versionInfo || version,
                title: title,
                description: description,
                termsOfService: termsOfService,
                contact: contact,
                license: license
            },
            consumes: consumes,
            produces: produces,
            securityDefinitions: spec.securityDefinitions || {}
        }, specPathContent, utils_2.getReducers());
    };
    /**
     *
     * @param paths
     * @param definitions
     * @param ctrl
     * @param endpointUrl
     */
    SwaggerService.prototype.buildRoutes = function (paths, definitions, ctrl, endpointUrl) {
        var _this = this;
        ctrl.dependencies
            .map(function (ctrl) { return _this.controllerService.get(ctrl); })
            .forEach(function (provider) {
            return _this.buildRoutes(paths, definitions, provider, "" + endpointUrl + provider.path);
        });
        ctrl.endpoints.forEach(function (endpoint) {
            /* istanbul ignore else */
            if (endpoint.hasHttpMethod()) {
                var builder = new OpenApiEndpointBuilder_1.OpenApiEndpointBuilder(endpoint, endpointUrl).build();
                utils_1.deepExtends(paths, builder.paths);
                utils_1.deepExtends(definitions, builder.definitions);
            }
        });
    };
    SwaggerService.prototype.buildTags = function (ctrl) {
        var clazz = ctrl.useClass;
        var ctrlStore = Store_1.Store.from(clazz);
        return Object.assign({
            name: ctrlStore.get("name") || utils_1.nameOf(clazz),
            description: ctrlStore.get("description")
        }, ctrlStore.get("tag") || {});
    };
    SwaggerService = tslib_1.__decorate([
        service_1.Service(),
        tslib_1.__param(2, inject_1.Inject(ExpressApplication_1.ExpressApplication)),
        tslib_1.__metadata("design:paramtypes", [ControllerService_1.ControllerService,
            ServerSettingsService_1.ServerSettingsService, Function])
    ], SwaggerService);
    return SwaggerService;
}());
exports.SwaggerService = SwaggerService;
//# sourceMappingURL=SwaggerService.js.map