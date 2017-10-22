/// <reference types="express" />
/**
 * @module common/mvc
 */
/** */
import * as Express from "express";
import { Provider } from "../../di/class/Provider";
import { IControllerOptions, IRouterOptions, IControllerMiddlewares } from "../interfaces";
import { IChildrenController } from "../interfaces/IChildrenController";
import { EndpointMetadata } from "./EndpointMetadata";
/**
 *
 */
export declare class ControllerProvider extends Provider<any> implements IControllerOptions {
    /**
     * The path for the controller
     */
    private _path;
    /**
     *
     */
    private _routerOptions;
    /**
     * The path for the RouterController when the controller will be mounted to the Express Application.
     */
    private _routerPaths;
    /**
     * Controllers that depend to this controller.
     * @type {Array}
     * @private
     */
    private _dependencies;
    /**
     *
     */
    private _scope;
    router: Express.Router;
    private _middlewares;
    constructor(provide: any);
    /**
     *
     * @returns {string}
     */
    /**
     * set path
     * @param value
     */
    path: string;
    readonly routerPaths: string[];
    /**
     *
     * @returns {Endpoint[]}
     */
    readonly endpoints: EndpointMetadata[];
    /**
     *
     * @returns {Type<any>[]}
     */
    /**
     *
     * @param dependencies
     */
    dependencies: IChildrenController[];
    /**
     * Create a new controler for each per incoming request.
     * @returns {boolean}
     */
    /**
     *
     * @param scope
     */
    scope: boolean | "request";
    /**
     *
     * @returns {IRouterOptions}
     */
    /**
     *
     * @param value
     */
    routerOptions: IRouterOptions;
    /**
     *
     * @returns {ControllerProvider}
     */
    readonly parent: any;
    /**
     *
     * @returns {any[]}
     */
    /**
     *
     * @param middlewares
     */
    middlewares: IControllerMiddlewares;
    /**
     *
     * @param {string} path
     */
    pushRouterPath(path: string): void;
    /**
     * Resolve final endpoint url.
     */
    getEndpointUrl: (routerPath: string) => string;
    /**
     *
     */
    hasEndpointUrl(): boolean;
    /**
     *
     * @returns {boolean}
     */
    hasDependencies(): boolean;
    /**
     *
     * @returns {boolean}
     */
    hasParent(): boolean;
}
