import { ParamMetadata } from "./ParamMetadata";
export declare class HandlerMetadata {
    private _target;
    private _methodClassName;
    /**
     *
     */
    private _type;
    /**
     *
     * @type {boolean}
     * @private
     */
    private _errorParam;
    /**
     *
     */
    private _injectable;
    /**
     *
     */
    private _nextFunction;
    constructor(_target: any, _methodClassName?: string | undefined);
    /**
     *
     */
    private resolve();
    readonly type: "function" | "controller" | "middleware";
    readonly errorParam: boolean;
    readonly injectable: boolean;
    readonly nextFunction: boolean;
    readonly methodClassName: string | undefined;
    readonly target: any;
    readonly services: ParamMetadata[];
}
