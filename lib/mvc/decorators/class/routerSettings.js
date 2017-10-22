"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ControllerRegistry_1 = require("../../registries/ControllerRegistry");
/**
 *
 * @returns {(target:any)=>void}
 * @decorator
 * @param routerOptions
 */
function RouterSettings(routerOptions) {
    return function (target) {
        ControllerRegistry_1.ControllerRegistry.merge(target, { routerOptions: routerOptions });
    };
}
exports.RouterSettings = RouterSettings;
//# sourceMappingURL=routerSettings.js.map