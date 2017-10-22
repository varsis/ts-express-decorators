/// <reference types="express" />
/**
 * @module common/mvc
 */
/** */
import * as Express from "express";
import { ConverterService } from "../../converters/services/ConverterService";
import { IMiddleware } from "../interfaces/index";
/**
 * @private
 * @middleware
 */
export declare class SendResponseMiddleware implements IMiddleware {
    private converterService;
    constructor(converterService: ConverterService);
    use(data: any, response: Express.Response): void;
}
