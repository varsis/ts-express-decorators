/**
 * @module common/mvc
 */ /** */
import { BadRequest } from "ts-httpexceptions";
/**
 * @private
 */
export declare class ParseExpressionError extends BadRequest {
    constructor(name: string, expression: string | RegExp, message?: string);
    /**
     *
     * @param name
     * @param expression
     * @param message
     * @returns {string}
     */
    static buildMessage(name: string, expression: string | RegExp, message?: string): string;
}
