import { Provider } from "../../di/class/Provider";
/**
 * @module common/mvc
 */
import { IMiddlewareOptions } from "../interfaces";
/** */
export declare class MiddlewareProvider extends Provider<any> implements IMiddlewareOptions {
    constructor(provide: any);
    type: any;
}
