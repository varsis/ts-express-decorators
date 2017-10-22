import { IConverter } from "../interfaces/index";
/**
 * @private
 * @converter
 */
export declare class SymbolConverter implements IConverter {
    deserialize(data: string, target: any): symbol;
    serialize(object: Symbol): any;
}
