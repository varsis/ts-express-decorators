import { IConverter } from "../interfaces/index";
import { ConverterService } from "../services/ConverterService";
/**
 * @private
 * @converter
 */
export declare class SetConverter implements IConverter {
    private converterService;
    constructor(converterService: ConverterService);
    /**
     *
     * @param data
     * @param target
     * @param baseType
     * @returns {Map<string, T>}
     */
    deserialize<T>(data: any, target: any, baseType: T): Set<T>;
    /**
     *
     * @param data
     */
    serialize<T>(data: Set<T>): any[];
}
