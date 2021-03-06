import { IFilter } from "../interfaces/index";
import { ParseService } from "../services/ParseService";
/**
 * @private
 * @filter
 */
export declare class LocalsFilter implements IFilter {
    private parseService;
    constructor(parseService: ParseService);
    transform(expression: string, request: any, response: any): any;
}
