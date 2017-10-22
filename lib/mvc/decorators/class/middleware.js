"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @module common/mvc
 */
/** */
var index_1 = require("../../interfaces/index");
var MiddlewareRegistry_1 = require("../../registries/MiddlewareRegistry");
/**
 *
 * @returns {(target:any)=>void}
 * @decorator
 */
function Middleware() {
    return function (target) {
        MiddlewareRegistry_1.MiddlewareRegistry.merge(target, { type: index_1.MiddlewareType.MIDDLEWARE });
        return target;
    };
}
exports.Middleware = Middleware;
//# sourceMappingURL=middleware.js.map