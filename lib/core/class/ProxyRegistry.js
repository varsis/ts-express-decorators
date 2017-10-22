"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ProxyRegistry = /** @class */ (function () {
    function ProxyRegistry(registry) {
        var _this = this;
        this.registry = registry;
        /**
         *
         * @param callbackfn
         * @param thisArg
         */
        this.forEach = function (callbackfn, thisArg) {
            return _this.registry.forEach(callbackfn, thisArg);
        };
    }
    /**
     *
     * @param target
     * @returns {ControllerProvider}
     */
    ProxyRegistry.prototype.get = function (target) {
        return this.registry.get(target);
    };
    /**
     *
     * @param target
     * @param provider
     */
    ProxyRegistry.prototype.set = function (target, provider) {
        this.registry.merge(target, provider);
        return this;
    };
    /**
     *
     * @param target
     */
    ProxyRegistry.prototype.has = function (target) {
        return this.registry.has(target);
    };
    Object.defineProperty(ProxyRegistry.prototype, "size", {
        /**
         *
         * @returns {number}
         */
        get: function () {
            return this.registry.size;
        },
        enumerable: true,
        configurable: true
    });
    return ProxyRegistry;
}());
exports.ProxyRegistry = ProxyRegistry;
//# sourceMappingURL=ProxyRegistry.js.map