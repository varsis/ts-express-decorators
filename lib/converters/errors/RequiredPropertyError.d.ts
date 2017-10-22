/**
 * @module common/mvc
 */
/** */
import { BadRequest } from "ts-httpexceptions";
import { Type } from "../../core/interfaces";
/**
 * @private
 */
export declare class RequiredPropertyError extends BadRequest {
    constructor(target: Type<any>, propertyName: string | symbol);
    /**
     *
     * @returns {string}
     * @param target
     * @param propertyName
     */
    static buildMessage(target: Type<any>, propertyName: string | symbol): string;
}
