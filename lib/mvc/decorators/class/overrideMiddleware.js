"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MiddlewareRegistry_1 = require("../../registries/MiddlewareRegistry");
function OverrideMiddleware(targetMiddleware) {
    return function (target) {
        MiddlewareRegistry_1.MiddlewareRegistry.merge(targetMiddleware, { useClass: target });
        return target;
    };
}
exports.OverrideMiddleware = OverrideMiddleware;
//# sourceMappingURL=overrideMiddleware.js.map