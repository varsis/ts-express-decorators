"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ProxyRegistry_1 = require("../../core/class/ProxyRegistry");
var Registry_1 = require("../../core/class/Registry");
/**
 * @module common/mvc
 */
/** */
var ControllerProvider_1 = require("../class/ControllerProvider");
exports.ControllerRegistry = new Registry_1.Registry(ControllerProvider_1.ControllerProvider);
var ProxyControllerRegistry = /** @class */ (function (_super) {
    tslib_1.__extends(ProxyControllerRegistry, _super);
    function ProxyControllerRegistry() {
        return _super.call(this, exports.ControllerRegistry) || this;
    }
    return ProxyControllerRegistry;
}(ProxyRegistry_1.ProxyRegistry));
exports.ProxyControllerRegistry = ProxyControllerRegistry;
//# sourceMappingURL=ControllerRegistry.js.map