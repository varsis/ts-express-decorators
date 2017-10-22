import { IConverter } from "../interfaces/index";
/**
 * @private
 * @converter
 */
export declare class PrimitiveConverter implements IConverter {
    deserialize(data: string, target: any): String | Number | Boolean | void;
    serialize(object: String | Number | Boolean): any;
}
