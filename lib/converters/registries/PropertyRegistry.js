"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Metadata_1 = require("../../core/class/Metadata");
var utils_1 = require("../../core/utils");
var PropertyMetadata_1 = require("../class/PropertyMetadata");
var index_1 = require("../constants/index");
var PropertyRegistry = /** @class */ (function () {
    function PropertyRegistry() {
    }
    /**
     *
     * @param target
     * @param propertyKey
     * @returns {PropertyMetadata}
     */
    PropertyRegistry.get = function (target, propertyKey) {
        var properties = this.getOwnProperties(target);
        if (!properties.has(propertyKey)) {
            this.set(target, propertyKey, new PropertyMetadata_1.PropertyMetadata(target, propertyKey));
        }
        return this.getOwnProperties(target).get(propertyKey);
    };
    /**
     *
     * @param target
     * @returns {Array}
     */
    PropertyRegistry.getProperties = function (target) {
        var _this = this;
        var map = new Map();
        var classes = [];
        var currentTarget = utils_1.getClass(target);
        while (utils_1.nameOf(currentTarget) !== "") {
            classes.unshift(currentTarget);
            currentTarget = utils_1.getInheritedClass(currentTarget);
        }
        classes.forEach(function (klass) {
            _this.getOwnProperties(klass).forEach(function (v, k) {
                map.set(k, v);
            });
        });
        return map;
    };
    /**
     *
     * @param {Type<any>} target
     * @returns {Map<string | symbol, PropertyMetadata>}
     */
    PropertyRegistry.getOwnProperties = function (target) {
        return Metadata_1.Metadata.hasOwn(index_1.PROPERTIES_METADATA, target)
            ? Metadata_1.Metadata.getOwn(index_1.PROPERTIES_METADATA, target)
            : new Map();
    };
    /**
     *
     * @param target
     * @param propertyKey
     * @param property
     */
    PropertyRegistry.set = function (target, propertyKey, property) {
        var properties = this.getOwnProperties(target);
        properties.set(propertyKey, property);
        Metadata_1.Metadata.set(index_1.PROPERTIES_METADATA, properties, target);
    };
    /**
     *
     * @param target
     * @param propertyKey
     * @param allowedValues
     */
    PropertyRegistry.required = function (target, propertyKey, allowedValues) {
        if (allowedValues === void 0) { allowedValues = []; }
        var property = this.get(target, propertyKey);
        property.required = true;
        property.allowedValues = allowedValues;
        this.set(target, propertyKey, property);
        this.get(target, propertyKey).store.merge("responses", {
            "400": {
                description: "BadRequest"
            }
        });
        return this;
    };
    return PropertyRegistry;
}());
exports.PropertyRegistry = PropertyRegistry;
//# sourceMappingURL=PropertyRegistry.js.map