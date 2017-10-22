"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @module common/mvc
 */
/** */
var Metadata_1 = require("../../core/class/Metadata");
var Store_1 = require("../../core/class/Store");
var utils_1 = require("../../core/utils");
var EndpointMetadata_1 = require("../class/EndpointMetadata");
/**
 * Registry for all Endpoint collected on a provide.
 */
var EndpointRegistry = /** @class */ (function () {
    function EndpointRegistry() {
    }
    /**
     * Retrieve all endpoints from inherited class and store it in the registry.
     * @param {Type<any>} ctrlClass
     */
    EndpointRegistry.inherit = function (ctrlClass) {
        var inheritedClass = utils_1.getInheritedClass(ctrlClass);
        while (inheritedClass && EndpointRegistry.hasEndpoints(inheritedClass)) {
            this.getEndpoints(inheritedClass)
                .forEach(function (endpointInheritedClass) {
                var endpoint = endpointInheritedClass.inherit(ctrlClass);
                EndpointRegistry
                    .getEndpoints(ctrlClass)
                    .push(endpoint);
            });
            inheritedClass = utils_1.getInheritedClass(inheritedClass);
        }
    };
    /**
     * Get endpoints by his target.
     * @param {Type<any>} target
     * @returns {EndpointMetadata[]}
     */
    EndpointRegistry.getEndpoints = function (target) {
        if (!this.hasEndpoints(target)) {
            Metadata_1.Metadata.set(EndpointRegistry.name, [], target);
        }
        return Metadata_1.Metadata.getOwn(EndpointRegistry.name, target);
    };
    /**
     * Gets a value indicating whether the target object or its prototype chain has endpoints.
     * @param {Type<any>} target
     * @returns {boolean}
     */
    EndpointRegistry.hasEndpoints = function (target) {
        return Metadata_1.Metadata.hasOwn(EndpointRegistry.name, target);
    };
    /**
     * Get an endpoint.
     * @param target
     * @param method
     */
    EndpointRegistry.get = function (target, method) {
        if (!this.has(target, method)) {
            var endpoint = new EndpointMetadata_1.EndpointMetadata(target, method);
            EndpointRegistry.getEndpoints(target).push(endpoint);
            Metadata_1.Metadata.set(EndpointRegistry.name, endpoint, target, method);
        }
        return Metadata_1.Metadata.getOwn(EndpointRegistry.name, target, method);
    };
    /**
     * Gets a value indicating whether the target object or its prototype chain has already method registered.
     * @param target
     * @param method
     */
    EndpointRegistry.has = function (target, method) {
        return Metadata_1.Metadata.hasOwn(EndpointRegistry.name, target, method);
    };
    /**
     * Append mvc in the pool (before).
     * @param target
     * @param targetKey
     * @param args
     */
    EndpointRegistry.useBefore = function (target, targetKey, args) {
        this.get(target, targetKey).before(args);
        return this;
    };
    /**
     * Add middleware and configuration for the endpoint.
     * @param target
     * @param targetKey
     * @param args
     * @returns {Endpoint}
     */
    EndpointRegistry.use = function (target, targetKey, args) {
        this.get(target, targetKey).merge(args);
        return this;
    };
    /**
     * Append mvc in the pool (after).
     * @param target
     * @param targetKey
     * @param args
     */
    EndpointRegistry.useAfter = function (target, targetKey, args) {
        this.get(target, targetKey).after(args);
        return this;
    };
    /**
     * Store a data on store manager.
     * @param targetClass
     * @param methodClassName
     * @returns {any}
     */
    EndpointRegistry.store = function (targetClass, methodClassName) {
        return Store_1.Store.from(targetClass, methodClassName, Object.getOwnPropertyDescriptor(targetClass, methodClassName));
    };
    /**
     * Store value for an endpoint method.
     * @param key
     * @param value
     * @param targetClass
     * @param methodClassName
     */
    EndpointRegistry.setMetadata = function (key, value, targetClass, methodClassName) {
        EndpointRegistry.store(targetClass, methodClassName).set(key, value);
        return EndpointRegistry;
    };
    /**
     * Return the stored value for an endpoint method.
     * @param key
     * @param targetClass
     * @param methodClassName
     */
    EndpointRegistry.getMetadata = function (key, targetClass, methodClassName) {
        return EndpointRegistry.store(targetClass, methodClassName).get(key);
    };
    return EndpointRegistry;
}());
exports.EndpointRegistry = EndpointRegistry;
//# sourceMappingURL=EndpointRegistry.js.map