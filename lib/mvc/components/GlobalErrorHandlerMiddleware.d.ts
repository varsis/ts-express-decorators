/// <reference types="express" />
/**
 * @module common/mvc
 */
/** */
import * as Express from "express";
import { IMiddlewareError } from "../interfaces";
/**
 * @middleware
 */
export declare class GlobalErrorHandlerMiddleware implements IMiddlewareError {
    use(error: any, request: Express.Request, response: Express.Response): any;
}
