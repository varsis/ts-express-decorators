"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ProxyRegistry_1 = require("../../core/class/ProxyRegistry");
var Registry_1 = require("../../core/class/Registry");
/**
 * @module common/mvc
 */
/** */
var MiddlewareProvider_1 = require("../class/MiddlewareProvider");
exports.MiddlewareRegistry = new Registry_1.Registry(MiddlewareProvider_1.MiddlewareProvider);
var ProxyMiddlewareRegistry = /** @class */ (function (_super) {
    tslib_1.__extends(ProxyMiddlewareRegistry, _super);
    function ProxyMiddlewareRegistry() {
        return _super.call(this, exports.MiddlewareRegistry) || this;
    }
    return ProxyMiddlewareRegistry;
}(ProxyRegistry_1.ProxyRegistry));
exports.ProxyMiddlewareRegistry = ProxyMiddlewareRegistry;
//# sourceMappingURL=MiddlewareRegistry.js.map