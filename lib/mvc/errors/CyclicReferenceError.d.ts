/**
 * @module common/mvc
 */ /** */
import { InternalServerError } from "ts-httpexceptions";
import { Type } from "../../core/interfaces/Type";
/**
 * @private
 */
export declare class CyclicReferenceError extends InternalServerError {
    name: string;
    constructor(c1: Type<any>, c2: Type<any>);
    /**
     *
     * @returns {string}
     */
    static buildMessage(c1: Type<any>, c2: Type<any>): string;
}
