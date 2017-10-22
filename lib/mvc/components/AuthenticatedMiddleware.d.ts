/// <reference types="express" />
/**
 * @module common/mvc
 */
/** */
import * as Express from "express";
import { IMiddleware } from "../";
import { ServerSettingsService } from "../../server/services/ServerSettingsService";
import { EndpointMetadata } from "../class/EndpointMetadata";
/**
 * This middleware manage the authentication.
 * @private
 * @middleware
 */
export declare class AuthenticatedMiddleware implements IMiddleware {
    private serverSettingsService;
    constructor(serverSettingsService: ServerSettingsService);
    use(endpoint: EndpointMetadata, request: Express.Request, response: Express.Response, next: Express.NextFunction): void;
}
