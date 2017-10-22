/**
 * @module multiparfiles
 */
/** */
import { IFilter } from "../../filters/interfaces";
/**
 * @private
 * @filter
 */
export declare class MultipartFileFilter implements IFilter {
    transform(expression: string, request: any, response: any): any;
}
