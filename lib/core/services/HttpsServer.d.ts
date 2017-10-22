/// <reference types="node" />
/**
 * @module common/core
 */
/** */
import * as Https from "https";
export interface HttpsServer {
    get(): Https.Server;
}
export declare const HttpsServer: symbol;
