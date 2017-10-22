/// <reference types="node" />
/**
 * @module common/core
 */
/** */
import * as Http from "http";
export interface HttpServer {
    get(): Http.Server;
}
export declare const HttpServer: symbol;
