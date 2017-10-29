/// <reference types="express" />
import * as Express from "express";
import { Spec } from "swagger-schema-official";
import { ExpressApplication } from "../../core/services/ExpressApplication";
import { ControllerService } from "../../mvc/services/ControllerService";
import { ServerSettingsService } from "../../server/services/ServerSettingsService";
export declare class SwaggerService {
    private controllerService;
    private serverSettingsService;
    private expressApplication;
    constructor(controllerService: ControllerService, serverSettingsService: ServerSettingsService, expressApplication: ExpressApplication);
    private uiMiddleware();
    private validateMiddleware();
    swaggerValidationErrorHandler(error: any, req: Express.Request, res: Express.Response, next: Express.NextFunction): any;
    $afterControllersInit(): void | Promise<void>;
    private onRequest;
    /**
     *
     * @returns {Spec}
     */
    getOpenAPISpec(): Spec;
    private readSpecPath(path);
    /**
     * Return the global api information.
     * @returns {Info}
     */
    getDefaultSpec(): Spec;
    /**
     *
     * @param paths
     * @param definitions
     * @param ctrl
     * @param endpointUrl
     */
    private buildRoutes(paths, definitions, ctrl, endpointUrl);
    private buildTags(ctrl);
}
