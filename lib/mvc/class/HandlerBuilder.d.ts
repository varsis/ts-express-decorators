import { IHandlerScope } from "../interfaces/IHandlerScope";
import { EndpointMetadata } from "./EndpointMetadata";
import { HandlerMetadata } from "./HandlerMetadata";
/**
 * @stable
 */
export declare class HandlerBuilder {
    private handlerMetadata;
    protected constructor(handlerMetadata: HandlerMetadata);
    /**
     *
     * @param obj
     * @returns {HandlerBuilder}
     */
    static from(obj: any | EndpointMetadata): HandlerBuilder;
    /**
     *
     * @returns {any}
     */
    build(): (err: any, request: any, response: any, next: any) => Promise<any>;
    /**
     *
     * @returns {any}
     */
    private middlewareHandler();
    /**
     *
     * @param locals
     * @returns {any}
     */
    private endpointHandler;
    /**
     *
     * @returns {any}
     */
    private readonly handler;
    /**
     *
     * @param locals
     * @returns {Promise<TResult2|TResult1>}
     */
    invoke(locals: IHandlerScope): Promise<any>;
    /**
     *
     * @param locals
     */
    private localsToParams(locals);
    /**
     *
     * @param localScope
     * @returns {[(any|EndpointMetadata|any|any),(any|EndpointMetadata|any|any),(any|EndpointMetadata|any|any),(any|EndpointMetadata|any|any),(any|EndpointMetadata|any|any)]}
     */
    private getInjectableParameters;
}
