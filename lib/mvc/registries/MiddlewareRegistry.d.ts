import { ProxyRegistry } from "../../core/class/ProxyRegistry";
import { Registry } from "../../core/class/Registry";
/**
 * @module common/mvc
 */
/** */
import { MiddlewareProvider } from "../class/MiddlewareProvider";
import { IMiddlewareOptions } from "../interfaces/IMiddlewareOptions";
export declare const MiddlewareRegistry: Registry<MiddlewareProvider, IMiddlewareOptions>;
export declare abstract class ProxyMiddlewareRegistry extends ProxyRegistry<MiddlewareProvider, IMiddlewareOptions> {
    constructor();
}
