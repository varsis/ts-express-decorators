"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ProxyRegistry_1 = require("../../core/class/ProxyRegistry");
/**
 * @module common/filters
 */
/** */
var Registry_1 = require("../../core/class/Registry");
var FilterProvider_1 = require("../class/FilterProvider");
exports.FilterRegistry = new Registry_1.Registry(FilterProvider_1.FilterProvider);
var ProxyFilterRegistry = /** @class */ (function (_super) {
    tslib_1.__extends(ProxyFilterRegistry, _super);
    function ProxyFilterRegistry() {
        return _super.call(this, exports.FilterRegistry) || this;
    }
    return ProxyFilterRegistry;
}(ProxyRegistry_1.ProxyRegistry));
exports.ProxyFilterRegistry = ProxyFilterRegistry;
//# sourceMappingURL=FilterRegistry.js.map