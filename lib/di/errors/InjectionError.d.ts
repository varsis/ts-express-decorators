import { Type } from "../../core/interfaces/Type";
/**
 * @private
 */
export declare class InjectionError extends Error {
    name: string;
    constructor(target: Type<any>, serviceName: string);
}
