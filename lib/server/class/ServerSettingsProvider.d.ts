/// <reference types="node" />
/**
 * @module common/server
 */
/** */
import * as Https from "https";
import { Env } from "../../core/interfaces";
import { IRouterOptions } from "../../mvc/interfaces";
import { IServerMountDirectories, IServerSettings } from "../interfaces";
import { ServerSettingsService } from "../services/ServerSettingsService";
export declare class ServerSettingsProvider implements IServerSettings {
    protected map: Map<string, any>;
    constructor();
    version: string;
    /**
     *
     * @param value
     */
    rootDir: string;
    /**
     *
     * @param value
     */
    port: string | number;
    /**
     *
     * @param value
     */
    httpsOptions: Https.ServerOptions;
    /**
     *
     * @returns {undefined|any}
     */
    /**
     *
     * @param value
     */
    httpPort: string | number;
    /**
     *
     * @returns {undefined|any}
     */
    /**
     *
     * @param value
     */
    httpsPort: string | number;
    /**
     *
     * @param value
     */
    uploadDir: string;
    /**
     *
     * @param value
     */
    endpoint: string;
    /**
     *
     * @param value
     */
    endpointUrl: string;
    /**
     *
     * @returns {Map<string, any>}
     */
    /**
     *
     * @param value
     */
    env: Env;
    /**
     *
     * @param callback
     */
    authentification: (request?: any, response?: any, next?: any, options?: any) => boolean;
    /**
     *
     * @param value
     */
    mount: IServerMountDirectories;
    /**
     *
     * @param value
     */
    componentsScan: string[];
    /**
     *
     * @param value
     */
    serveStatic: IServerMountDirectories;
    /**
     *
     * @param value
     */
    acceptMimes: string[];
    debug: boolean;
    routers: IRouterOptions;
    /**
     *
     * @param propertyKey
     * @param value
     */
    set(propertyKey: string | IServerSettings, value?: any): ServerSettingsProvider;
    /**
     *
     * @param propertyKey
     * @returns {any<string, any>}
     */
    get(propertyKey: string): any;
    /**
     *
     * @returns {ServerSettingsService}
     */
    $get: () => ServerSettingsService;
    /**
     *
     * @param target
     * @returns {any}
     */
    static getMetadata(target: any): any;
}
