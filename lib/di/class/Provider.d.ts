import { Type } from "../../core/interfaces";
/**
 * @module common/di
 */
/** */
import { IProvider } from "../interfaces/IProvider";
export declare class Provider<T> implements IProvider<T> {
    private _provide;
    protected _useClass: Type<T>;
    protected _instance: T;
    protected _type: any;
    constructor(_provide: any);
    /**
     *
     * @returns {any}
     */
    /**
     *
     * @param value
     */
    provide: any;
    /**
     *
     * @returns {Type<T>}
     */
    /**
     *
     * @param value
     */
    useClass: Type<T>;
    /**
     *
     * @returns {T}
     */
    /**
     *
     * @param value
     */
    instance: T;
    /**
     *
     * @returns {any}
     */
    /**
     *
     * @param value
     */
    type: any;
    readonly className: string;
}
