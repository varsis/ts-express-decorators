import { IConverter } from "../interfaces/index";
/**
 * @private
 * @converter
 */
export declare class DateConverter implements IConverter {
    deserialize(data: string): Date;
    serialize(object: Date): any;
}
