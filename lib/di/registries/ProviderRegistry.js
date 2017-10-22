"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ProxyRegistry_1 = require("../../core/class/ProxyRegistry");
/**
 * @module filters
 */
/** */
var Registry_1 = require("../../core/class/Registry");
var Provider_1 = require("../class/Provider");
exports.ProviderRegistry = new Registry_1.Registry(Provider_1.Provider);
var ProxyProviderRegistry = /** @class */ (function (_super) {
    tslib_1.__extends(ProxyProviderRegistry, _super);
    function ProxyProviderRegistry() {
        return _super.call(this, exports.ProviderRegistry) || this;
    }
    return ProxyProviderRegistry;
}(ProxyRegistry_1.ProxyRegistry));
exports.ProxyProviderRegistry = ProxyProviderRegistry;
//# sourceMappingURL=ProviderRegistry.js.map