/**
 * @module common/converters
 */
/** */
import { Type } from "../../core/interfaces/Type";
import { PropertyMetadata } from "../class/PropertyMetadata";
export declare class PropertyRegistry {
    /**
     *
     * @param target
     * @param propertyKey
     * @returns {PropertyMetadata}
     */
    static get(target: Type<any>, propertyKey: string | symbol): PropertyMetadata;
    /**
     *
     * @param target
     * @returns {Array}
     */
    static getProperties(target: Type<any>): Map<string | symbol, PropertyMetadata>;
    /**
     *
     * @param {Type<any>} target
     * @returns {Map<string | symbol, PropertyMetadata>}
     */
    static getOwnProperties(target: Type<any>): Map<string | symbol, PropertyMetadata>;
    /**
     *
     * @param target
     * @param propertyKey
     * @param property
     */
    static set(target: Type<any>, propertyKey: string | symbol, property: PropertyMetadata): void;
    /**
     *
     * @param target
     * @param propertyKey
     * @param allowedValues
     */
    static required(target: Type<any>, propertyKey: string | symbol, allowedValues?: any[]): typeof PropertyRegistry;
}
