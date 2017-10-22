/**
 * @module common/core
 */
/** */
import { Type } from "../interfaces/Type";
import { Registry } from "./Registry";
export declare abstract class ProxyRegistry<T, I> {
    protected registry: Registry<T, I>;
    constructor(registry: Registry<T, I>);
    abstract invoke<T>(target: any, locals?: Map<Function, any>, designParamTypes?: any[]): T;
    /**
     *
     * @param callbackfn
     * @param thisArg
     */
    forEach: (callbackfn: (value: T, index: any, map: Map<any, any>) => void, thisArg?: any) => void;
    /**
     *
     * @param target
     * @returns {ControllerProvider}
     */
    get(target: Type<any> | symbol): T | undefined;
    /**
     *
     * @param target
     * @param provider
     */
    set(target: Type<any> | symbol, provider: I): this;
    /**
     *
     * @param target
     */
    has(target: Type<any> | symbol): boolean;
    /**
     *
     * @returns {number}
     */
    readonly size: number;
}
