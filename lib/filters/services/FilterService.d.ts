import { Type } from "../../core/interfaces/Type";
import { InjectorService } from "../../di/services/InjectorService";
import { FilterProvider } from "../class/FilterProvider";
import { IFilter } from "../interfaces";
import { ProxyFilterRegistry } from "../registries/FilterRegistry";
/**
 * @beta
 */
export declare class FilterService extends ProxyFilterRegistry {
    private injectorService;
    constructor(injectorService: InjectorService);
    /**
     *
     */
    $onInit(): void;
    /**
     *
     * @param target
     * @returns {ControllerProvider}
     */
    static get: (target: Type<any>) => FilterProvider | undefined;
    /**
     *
     * @param target
     * @param provider
     */
    static set(target: Type<any>, provider: FilterProvider): typeof FilterService;
    /**
     *
     * @param target
     */
    static has: (target: Type<any>) => boolean;
    /**
     *
     * @param target
     * @param locals
     * @param designParamTypes
     * @returns {T}
     */
    invoke<T extends IFilter>(target: Type<T>, locals?: Map<Function, any>, designParamTypes?: any[]): T;
    /**
     *
     * @param target
     * @param args
     * @returns {any}
     */
    invokeMethod<T extends IFilter>(target: Type<T>, ...args: any[]): any;
}
