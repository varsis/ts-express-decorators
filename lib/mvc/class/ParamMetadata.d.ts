import { Storable } from "../../core/class/Storable";
import { Type } from "../../core/interfaces";
import { IParamOptions } from "../interfaces";
export declare class ParamMetadata extends Storable implements IParamOptions<any> {
    /**
     *
     */
    protected _expression: string | RegExp;
    /**
     *
     * @type {boolean}
     */
    protected _useConverter: boolean;
    /**
     *
     */
    protected _service: string | Type<any> | symbol;
    /**
     *
     * @returns {string|RegExp}
     */
    /**
     *
     * @param value
     */
    expression: string | RegExp;
    /**
     *
     * @returns {symbol}
     */
    /**
     *
     * @param value
     */
    service: Type<any> | symbol;
    /**
     *
     * @returns {boolean}
     */
    /**
     *
     * @param value
     */
    useConverter: boolean;
    /**
     *
     * @returns {{service: (string|symbol), name: string, expression: string, required: boolean, use: undefined, baseType: undefined}}
     */
    toJSON(): {
        service: string;
        name: string;
        expression: string | RegExp;
        required: boolean;
        use: string;
        baseType: string;
    };
}
