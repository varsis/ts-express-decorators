import { Type } from "../../core/interfaces";
import { ExpressApplication } from "../../core/services/ExpressApplication";
import { InjectorService } from "../../di/services/InjectorService";
import { IComponentScanned } from "../../server/interfaces";
import { ServerSettingsService } from "../../server/services/ServerSettingsService";
import { ControllerProvider } from "../class/ControllerProvider";
import { ProxyControllerRegistry } from "../registries/ControllerRegistry";
/**
 * ControllerService manage all controllers declared with `@ControllerProvider` decorators.
 */
export declare class ControllerService extends ProxyControllerRegistry {
    private injectorService;
    private expressApplication;
    private serverSettings;
    /**
     *
     * @param expressApplication
     * @param injectorService
     * @param serverSettings
     */
    constructor(injectorService: InjectorService, expressApplication: ExpressApplication, serverSettings: ServerSettingsService);
    /**
     *
     * @param target
     * @returns {ControllerProvider}
     */
    static get(target: Type<any>): ControllerProvider | undefined;
    /**
     *
     * @param target
     */
    static has(target: Type<any>): boolean;
    /**
     *
     * @param target
     * @param provider
     */
    static set(target: Type<any>, provider: ControllerProvider): typeof ControllerService;
    /**
     *
     * @param components
     */
    $onRoutesInit(components: {
        file: string;
        endpoint: string;
        classes: any[];
    }[]): void;
    /**
     *
     * @param components
     */
    mapComponents(components: IComponentScanned[]): void;
    /**
     * Invoke a controller from his Class.
     * @param target
     * @param locals
     * @param designParamTypes
     * @returns {T}
     */
    invoke<T>(target: any, locals?: Map<Type<any>, any>, designParamTypes?: any[]): T;
    /**
     * Build all controllers and mount routes to the ExpressApplication.
     */
    buildControllers(): this;
}
