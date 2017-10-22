import { Type } from "../../../core/interfaces";
/**
 * @module common/mvc
 */
/** */
import { IMiddleware } from "../../interfaces";
export declare function OverrideMiddleware(targetMiddleware: Type<any> & IMiddleware): Function;
