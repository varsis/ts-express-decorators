import { ProxyRegistry } from "../../core/class/ProxyRegistry";
import { Registry } from "../../core/class/Registry";
/**
 * @module common/mvc
 */
/** */
import { ControllerProvider } from "../class/ControllerProvider";
import { IControllerOptions } from "../interfaces/IControllerOptions";
export declare const ControllerRegistry: Registry<ControllerProvider, IControllerOptions>;
export declare abstract class ProxyControllerRegistry extends ProxyRegistry<ControllerProvider, IControllerOptions> {
    constructor();
}
