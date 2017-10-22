import { IConverter } from "../interfaces/index";
import { ConverterService } from "../services/ConverterService";
/**
 * @private
 * @converter
 */
export declare class ArrayConverter implements IConverter {
    private converterService;
    constructor(converterService: ConverterService);
    /**
     *
     * @param data
     * @param target
     * @param baseType
     * @returns {any[]}
     */
    deserialize<T>(data: any, target: any, baseType?: T): T[];
    /**
     *
     * @param data
     * @returns {any[]}
     */
    serialize(data: any[]): any[];
}
