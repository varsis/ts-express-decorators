import { ProxyRegistry } from "../../core/class/ProxyRegistry";
/**
 * @module filters
 */
/** */
import { Registry } from "../../core/class/Registry";
import { Provider } from "../class/Provider";
import { IProviderOptions } from "../interfaces/IProviderOptions";
export declare const ProviderRegistry: Registry<Provider<any>, IProviderOptions<any>>;
export declare abstract class ProxyProviderRegistry extends ProxyRegistry<Provider<any>, IProviderOptions<any>> {
    constructor();
}
