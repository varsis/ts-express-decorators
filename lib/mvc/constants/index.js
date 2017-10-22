"use strict";
/**
 * @module common/mvc
 */ /** */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Metadata key
 * @private
 * @type {string}
 */
exports.PARAM_METADATA = "tsed:params:metadata";
/**
 * Express methods
 * @private
 * @type {string}
 */
exports.ENDPOINT_METHODS = [
    "all", "checkout", "connect",
    "copy", "delete", "get",
    "head", "lock", "merge",
    "mkactivity", "mkcol", "move",
    "m-search", "notify", "options",
    "param", "patch", "post",
    "propfind", "propatch", "purge",
    "put", "report", "search",
    "subscribe", "trace", "unlock",
    "unsuscribe"
];
/**
 * Metadata key
 * @private
 * @type {string}
 */
exports.EXPRESS_NEXT_FN = Symbol("next");
/**
 * Metadata key
 * @private
 * @type {string}
 */
exports.EXPRESS_ERR = Symbol("err");
/**
 * Metadata key
 * @private
 * @type {string}
 */
exports.EXPRESS_REQUEST = Symbol("request");
/**
 * Metadata key
 * @private
 * @type {string}
 */
exports.EXPRESS_RESPONSE = Symbol("response");
/**
 * Metadata key
 * @private
 * @type {string}
 */
exports.RESPONSE_DATA = Symbol("responseData");
/**
 * Metadata key
 * @private
 * @type {string}
 */
exports.ENDPOINT_INFO = Symbol("endpointInfo");
//# sourceMappingURL=index.js.map