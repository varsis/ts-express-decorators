/**
 * @module common/mvc
 */ /** */
import { BadRequest } from "ts-httpexceptions";
/**
 * @private
 */
export declare class RequiredParamError extends BadRequest {
    constructor(name: string, expression: string | RegExp);
    /**
     *
     * @param name
     * @param expression
     * @param message
     * @returns {string}
     */
    static buildMessage(name: string, expression: string): string;
}
