import { InjectorService } from "../../di";
import { PropertyMetadata } from "../class/PropertyMetadata";
import { IConverter } from "../interfaces/index";
export declare class ConverterService {
    private injectorService;
    constructor(injectorService: InjectorService);
    /**
     * Return a JsonMetadata for a properties.
     * @param properties
     * @param propertyKey
     * @returns {undefined|V|string|any|T|IDBRequest}
     */
    static getPropertyMetadata(properties: Map<string | symbol, PropertyMetadata>, propertyKey: string): PropertyMetadata | undefined;
    /**
     * Convert instance to plainObject.
     * @param obj
     */
    serialize(obj: any): any;
    /**
     * Convert a plainObject to targetType.
     * @param obj Object source that will be deserialized
     * @param targetType Pattern of the object deserialized
     * @param baseType
     * @returns {any}
     */
    deserialize(obj: any, targetType: any, baseType?: any): any;
    /**
     *
     * @param obj
     * @param instance
     * @param {string} propertyName
     * @param {PropertyMetadata} propertyMetadata
     */
    private convertProperty;
    /**
     *
     * @param targetType
     * @returns {any}
     */
    getConverter(targetType: any): IConverter | undefined;
}
