import { ProxyRegistry } from "../../core/class/ProxyRegistry";
/**
 * @module common/filters
 */
/** */
import { Registry } from "../../core/class/Registry";
import { IProviderOptions } from "../../di/interfaces/IProviderOptions";
import { FilterProvider } from "../class/FilterProvider";
export declare const FilterRegistry: Registry<FilterProvider, IProviderOptions<any>>;
export declare abstract class ProxyFilterRegistry extends ProxyRegistry<FilterProvider, IProviderOptions<any>> {
    constructor();
}
