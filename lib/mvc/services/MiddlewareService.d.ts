import { Type } from "../../core";
import { InjectorService } from "../../di/services/InjectorService";
import { ServerSettingsService } from "../../server/services/ServerSettingsService";
import { MiddlewareProvider } from "../class/MiddlewareProvider";
import { IMiddleware } from "../interfaces";
import { ProxyMiddlewareRegistry } from "../registries/MiddlewareRegistry";
/**
 *
 */
export declare class MiddlewareService extends ProxyMiddlewareRegistry {
    private injectorService;
    private serverSettings;
    constructor(injectorService: InjectorService, serverSettings: ServerSettingsService);
    /**
     *
     */
    $onInit(): void;
    /**
     *
     * @param target
     * @returns {ControllerProvider}
     */
    static get: (target: Type<any>) => MiddlewareProvider | undefined;
    /**
     *
     * @param target
     * @param provider
     */
    static set(target: Type<any>, provider: MiddlewareProvider): typeof MiddlewareService;
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
    /**
     *
     * @param target
     * @param locals
     * @param designParamTypes
     * @returns {T}
     */
    invoke<T extends IMiddleware>(target: Type<T>, locals?: Map<Function, any>, designParamTypes?: any[]): T;
    /**
     *
     * @param target
     * @param args
     * @returns {any}
     */
    invokeMethod<T extends IMiddleware>(target: Type<T>, ...args: any[]): any;
}
