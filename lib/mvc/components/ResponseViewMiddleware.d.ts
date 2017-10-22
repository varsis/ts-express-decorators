/// <reference types="express" />
/**
 * @module common/mvc
 */ /** */
import * as Express from "express";
import { EndpointMetadata } from "../class/EndpointMetadata";
import { IMiddleware } from "../interfaces";
/**
 * @private
 * @middleware
 */
export declare class ResponseViewMiddleware implements IMiddleware {
    use(data: any, endpoint: EndpointMetadata, response: Express.Response): Promise<{}>;
}
