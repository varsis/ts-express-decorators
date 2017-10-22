/// <reference types="node" />
/**
 * @module common/server
 */
/** */
import * as Https from "https";
import { Env } from "../../core/interfaces";
import { IRouterOptions } from "../../mvc/interfaces";
import { IServerMountDirectories, IServerSettings } from "../interfaces";
/**
 * `ServerSettingsService` contains all information about [ServerLoader](api/common/server/serverloader.md) configuration.
 */
export declare class ServerSettingsService implements IServerSettings {
    /**
     *
     * @type {Map<string, any>}
     */
    protected map: Map<string, any>;
    constructor(settings?: Map<string, any>);
    resolve(value: any): any;
    readonly rootDir: any;
    readonly version: any;
    /**
     *
     * @returns {string}
     */
    readonly endpoint: string;
    /**
     *
     * @returns {string}
     */
    readonly endpointUrl: string;
    /**
     *
     * @returns {Env}
     */
    readonly env: Env;
    /**
     *
     * @param value
     */
    readonly httpsOptions: Https.ServerOptions;
    /**
     *
     * @returns {undefined|any}
     */
    readonly httpPort: string | number;
    /**
     *
     * @returns {undefined|any}
     */
    readonly httpsPort: string | number;
    /**
     *
     * @returns {string|number}
     */
    getHttpPort(): {
        address: string;
        port: number;
    };
    /**
     *
     * @returns {string|number}
     */
    getHttpsPort(): {
        address: string;
        port: number;
    };
    /**
     *
     * @returns {string}
     */
    readonly uploadDir: string;
    /**
     *
     * @returns {undefined|any}
     */
    readonly mount: IServerMountDirectories;
    /**
     *
     * @returns {undefined|any}
     */
    readonly componentsScan: string[];
    /**
     *
     * @returns {undefined|any}
     */
    readonly serveStatic: IServerMountDirectories;
    /**
     *
     * @returns {undefined|any}
     */
    readonly acceptMimes: string[];
    /**
     *
     * @param propertyKey
     * @returns {undefined|any}
     */
    get<T>(propertyKey: string): T;
    /**
     *
     * @returns {Function}
     */
    readonly authentification: Function;
    readonly debug: boolean;
    readonly routers: IRouterOptions;
    /**
     *
     * @param callbackfn
     * @param thisArg
     */
    forEach(callbackfn: (value: any, index: string, map: Map<string, any>) => void, thisArg?: any): void;
    /**
     *
     * @param addressPort
     * @returns {{address: string, port: number}}
     */
    private static buildAddressAndPort(addressPort);
}
