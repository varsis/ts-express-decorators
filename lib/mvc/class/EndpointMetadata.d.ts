import { Storable } from "../../core/class/Storable";
import { Store } from "../../core/class/Store";
import { Type } from "../../core/interfaces";
import { PathParamsType } from "../interfaces/PathParamsType";
/**
 * EndpointMetadata contains metadata about a controller and his method.
 * Each annotation (@Get, @Body...) attached to a method are stored in a endpoint.
 * EndpointMetadata convert this metadata to an array which contain arguments to call an Express method.
 *
 * Example :
 *
 *    @Controller("/my-path")
 *    provide MyClass {
 *
 *        @Get("/")
 *        @Authenticated()
 *        public myMethod(){}
 *    }
 *
 */
export declare class EndpointMetadata extends Storable {
    private _methodClassName;
    /**
     *
     * @type {Array}
     */
    private _beforeMiddlewares;
    /**
     *
     * @type {Array}
     * @private
     */
    private _middlewares;
    /**
     *
     * @type {Array}
     * @private
     */
    private _afterMiddlewares;
    /**
     * HTTP method required.
     */
    private _httpMethod;
    /**
     * Route strategy.
     */
    private _path;
    /**
     * Endpoint inherited from parent class.
     */
    private _inheritedEndpoint;
    constructor(_provide: Type<any>, _methodClassName: string);
    /**
     *
     * @returns {any[]}
     */
    /**
     *
     * @param value
     */
    beforeMiddlewares: any[];
    /**
     *
     * @returns {any[]}
     */
    /**
     *
     * @param value
     */
    middlewares: any[];
    /**
     *
     * @returns {any[]}
     */
    /**
     *
     * @param value
     */
    afterMiddlewares: any[];
    /**
     *
     * @returns {string}
     */
    /**
     *
     * @param value
     */
    httpMethod: string;
    /**
     *
     * @returns {PathParamsType}
     */
    /**
     *
     * @param value
     */
    path: PathParamsType;
    readonly inheritedEndpoint: EndpointMetadata;
    type: Type<any>;
    /**
     *
     */
    readonly methodClassName: string;
    /**
     *
     * @returns {Store}
     */
    readonly store: Store;
    /**
     * Find the a value at the controller level. Let this value be extended or overridden by the endpoint itself.
     *
     * @param key
     * @returns {any}
     */
    get(key: any): any;
    /**
     *
     * @returns {boolean}
     */
    hasHttpMethod(): boolean;
    /**
     * Change the type and the collection type from the status code.
     * @param {string | number} code
     */
    statusResponse(code: string | number): {
        description: string;
        headers: any;
        examples: any;
    };
    /**
     *
     * @param args
     * @returns {EndpointMetadata}
     */
    before(args: any[]): this;
    /**
     *
     * @param args
     * @returns {EndpointMetadata}
     */
    after(args: any[]): this;
    /**
     * Store all arguments collected via Annotation.
     * @param args
     */
    merge(args: any[]): this;
    /**
     *
     * @param {Type<any>} target
     */
    inherit(target: Type<any>): EndpointMetadata;
    /**
     * Get value for an endpoint method.
     * @param key
     */
    getMetadata(key: any): any;
}
