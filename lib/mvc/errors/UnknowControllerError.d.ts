/**
 * @module common/mvc
 */ /** */
import { InternalServerError } from "ts-httpexceptions";
import { Type } from "../../core/interfaces/Type";
/**
 * @private
 */
export declare class UnknowControllerError extends InternalServerError {
    name: "UNKNOW_CONTROLLER_ERROR";
    constructor(target: Type<any> | string);
    /**
     *
     * @returns {string}
     */
    static buildMessage(target: Type<any> | string): string;
}
