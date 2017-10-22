/**
 * @module common/core
 */
/** */
import { InternalServerError } from "ts-httpexceptions";
/**
 * @private
 */
export declare class CastError extends InternalServerError {
    origin: Error;
    stack: any;
    constructor(err: Error);
}
