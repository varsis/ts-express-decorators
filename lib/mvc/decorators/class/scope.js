"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @module common/mvc
 */
/** */
var ControllerRegistry_1 = require("../../registries/ControllerRegistry");
/**
 *
 * @decorator
 * @param scope
 */
function Scope(scope) {
    if (scope === void 0) { scope = "request"; }
    return function (target) {
        ControllerRegistry_1.ControllerRegistry.merge(target, { scope: scope });
    };
}
exports.Scope = Scope;
//# sourceMappingURL=scope.js.map