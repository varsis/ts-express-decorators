"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var EndpointRegistry_1 = require("../registries/EndpointRegistry");
/**
 * @module common/mvc
 */
/** */
var EndpointMetadata_1 = require("./EndpointMetadata");
/**
 * Endpoint is proxy of EndpointMetadata and EndpointRegistry.
 * @deprecated
 */
var Endpoint = /** @class */ (function (_super) {
    tslib_1.__extends(Endpoint, _super);
    function Endpoint() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     *
     * @param target
     * @param method
     */
    Endpoint.get = function (target, method) {
        return EndpointRegistry_1.EndpointRegistry.get(target, method);
    };
    /**
     *
     * @param target
     * @param method
     */
    Endpoint.has = function (target, method) {
        return EndpointRegistry_1.EndpointRegistry.has(target, method);
    };
    /**
     * Append mvc in the pool (before).
     * @param target
     * @param method
     * @param args
     */
    Endpoint.useBefore = function (target, method, args) {
        return EndpointRegistry_1.EndpointRegistry.useBefore(target, method, args);
    };
    /**
     * Add middleware and configuration for the endpoint.
     * @param target
     * @param method
     * @param args
     * @returns {Endpoint}
     */
    Endpoint.use = function (target, method, args) {
        return EndpointRegistry_1.EndpointRegistry.use(target, method, args);
    };
    /**
     * Append mvc in the pool (after).
     * @param target
     * @param method
     * @param args
     */
    Endpoint.useAfter = function (target, method, args) {
        return EndpointRegistry_1.EndpointRegistry.use(target, method, args);
    };
    /**
     * Store value for an endpoint method.
     * @param key
     * @param value
     * @param targetClass
     * @param methodClassName
     */
    Endpoint.setMetadata = function (key, value, targetClass, methodClassName) {
        return EndpointRegistry_1.EndpointRegistry.setMetadata(key, value, targetClass, methodClassName);
    };
    /**
     * Return the stored value for an endpoint method.
     * @param key
     * @param targetClass
     * @param methodClassName
     */
    Endpoint.getMetadata = function (key, targetClass, methodClassName) {
        return EndpointRegistry_1.EndpointRegistry.getMetadata(key, targetClass, methodClassName);
    };
    return Endpoint;
}(EndpointMetadata_1.EndpointMetadata));
exports.Endpoint = Endpoint;
//# sourceMappingURL=Endpoint.js.map