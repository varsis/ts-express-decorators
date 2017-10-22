/// <reference types="express" />
/**
 * @module common/mvc
 */
/** */
import * as Express from "express";
import { ServerSettingsService } from "../../server/services/ServerSettingsService";
import { IMiddleware } from "../interfaces";
/**
 * @private
 * @middleware
 */
export declare class LogIncomingRequestMiddleware implements IMiddleware {
    private serverSettingsService;
    private AUTO_INCREMENT_ID;
    private env;
    constructor(serverSettingsService: ServerSettingsService);
    /**
     * Handle the request.
     * @param {e.Request} request
     * @param {e.Response} response
     */
    use(request: Express.Request, response: Express.Response): void;
    /**
     * The separate onLogStart() function will allow developer to overwrite the initial request log.
     * @param {e.Request} request
     */
    protected onLogStart(request: Express.Request): void;
    /**
     * Attach all informations that will be necessary to log the request. Attach a new `request.log` object.
     * @param request
     */
    protected configureRequest(request: Express.Request): void;
    /**
     * Return a partial request.
     * @param request
     * @returns {Object}
     */
    protected requestToObject(request: Express.Request): any;
    /**
     * Return the duration between the time when LogIncomingRequest has handle the request and now.
     * @param request
     * @returns {number}
     */
    protected getDuration(request: Express.Request): number;
    /**
     * Stringify a request to JSON.
     * @param request
     * @returns {(scope: any) => string}
     */
    protected stringify(request: Express.Request): (scope: any) => string;
    /**
     * Called when the `request.end()` is called by Express.
     * @param request
     * @param response
     */
    protected onLogEnd(request: Express.Request, response: Express.Response): void;
    /**
     * Remove all data that added with `LogIncomingRequest.configureRequest()`.
     * @param request
     */
    protected cleanRequest(request: Express.Request): void;
}
