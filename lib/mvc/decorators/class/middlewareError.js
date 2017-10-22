"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @module common/mvc
 */
/** */
var interfaces_1 = require("../../interfaces");
var MiddlewareRegistry_1 = require("../../registries/MiddlewareRegistry");
/**
 *
 * @returns {(target:any)=>void}
 * @decorator
 */
function MiddlewareError() {
    return function (target) {
        MiddlewareRegistry_1.MiddlewareRegistry.merge(target, { type: interfaces_1.MiddlewareType.ERROR });
        return target;
    };
}
exports.MiddlewareError = MiddlewareError;
//# sourceMappingURL=middlewareError.js.map