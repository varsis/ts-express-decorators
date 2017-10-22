/**
 * @module multiparfiles
 */
/** */
import { IFilter } from "../../filters/interfaces";
/**
 * @private
 * @filter
 */
export declare class MultipartFilesFilter implements IFilter {
    transform(expression: string, request: any, response: any): any;
}
