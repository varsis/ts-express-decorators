import { Type } from "../../core/interfaces";
import { ParamMetadata } from "../class/ParamMetadata";
import { IInjectableParamSettings, IParamArgs } from "../interfaces";
export declare class ParamRegistry {
    /**
     *
     * @param target
     * @param targetKey
     * @param index
     * @returns {any}
     */
    static get(target: Type<any>, targetKey: string | symbol, index: number): ParamMetadata;
    /**
     *
     * @param target
     * @param targetKey
     * @returns {Array}
     */
    static getParams: (target: Type<any>, targetKey?: string | symbol | undefined) => ParamMetadata[];
    /**
     *
     * @param target
     * @param targetKey
     * @param index
     * @param injectParams
     */
    static set(target: Type<any>, targetKey: string | symbol, index: number, injectParams: ParamMetadata): void;
    /**
     *
     * @param target
     * @param method
     */
    static isInjectable: (target: any, method: string) => boolean;
    /**
     *
     * @param service
     * @param settings
     */
    static useService(service: symbol, settings: IParamArgs<any>): typeof ParamRegistry;
    /**
     *
     * @param target
     * @param propertyKey
     * @param parameterIndex
     * @param allowedValues
     */
    static required(target: Type<any>, propertyKey: string | symbol, parameterIndex: number, allowedValues?: any[]): typeof ParamRegistry;
    /**
     *
     * @param service
     * @param options
     */
    static useFilter(service: Type<any>, options: IInjectableParamSettings<any>): ParamMetadata;
    /**
     *
     * @param target
     * @param propertyKey
     */
    static hasNextFunction: (target: Type<any>, propertyKey: string) => boolean;
}
