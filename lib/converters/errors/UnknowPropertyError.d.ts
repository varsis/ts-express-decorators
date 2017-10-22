/**
 * @module common/mvc
 */
/** */
import { BadRequest } from "ts-httpexceptions";
import { Type } from "../../core/interfaces";
/**
 * @private
 */
export declare class UnknowPropertyError extends BadRequest {
    constructor(target: Type<any>, propertyName: string);
    /**
     *
     * @returns {string}
     * @param target
     * @param propertyName
     */
    static buildMessage(target: Type<any>, propertyName: string): string;
}
