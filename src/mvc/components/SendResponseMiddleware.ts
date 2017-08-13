/**
 * @module common/mvc
 */
/** */
import * as Express from "express";
import {ConverterService} from "../../converters/services/ConverterService";
import {InjectorService} from "../../di/services/InjectorService";
import {EndpointMetadata} from "../class/EndpointMetadata";

import {Middleware} from "../decorators/class/middleware";
import {EndpointInfo} from "../decorators/param/endpointInfo";
import {Response} from "../decorators/param/response";
import {ResponseData} from "../decorators/param/responseData";
import {IMiddleware} from "../interfaces/index";

/**
 * @private
 * @middleware
 */
@Middleware()
export class SendResponseMiddleware implements IMiddleware {

    constructor(private converterService: ConverterService, private injectorService: InjectorService) {

    }

    public use(@ResponseData() data: any, @Response() response: Express.Response, @EndpointInfo() endpoint: EndpointMetadata) {
        const type = typeof data;

        InjectorService.emit("$validateOuput", data, endpoint);

        if (data !== undefined) {
            if (data === null || ["number", "boolean", "string"].indexOf(type) > -1) {
                response.send(String(data));
            } else {
                response.json(this.converterService.serialize(data));
            }
        }
    }
}