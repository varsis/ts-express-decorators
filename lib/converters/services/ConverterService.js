"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ts_httpexceptions_1 = require("ts-httpexceptions");
var Metadata_1 = require("../../core/class/Metadata");
var utils_1 = require("../../core/utils");
var di_1 = require("../../di");
/**
 * @module common/converters
 */
/** */
var service_1 = require("../../di/decorators/service");
var index_1 = require("../constants/index");
var ConverterDeserializationError_1 = require("../errors/ConverterDeserializationError");
var ConverterSerializationError_1 = require("../errors/ConverterSerializationError");
var RequiredPropertyError_1 = require("../errors/RequiredPropertyError");
var UnknowPropertyError_1 = require("../errors/UnknowPropertyError");
var PropertyRegistry_1 = require("../registries/PropertyRegistry");
var ConverterService = /** @class */ (function () {
    function ConverterService(injectorService) {
        var _this = this;
        this.injectorService = injectorService;
        /**
         *
         * @param obj
         * @param instance
         * @param {string} propertyName
         * @param {PropertyMetadata} propertyMetadata
         */
        this.convertProperty = function (obj, instance, propertyName, propertyMetadata) {
            if (utils_1.getClass(instance) !== Object && propertyMetadata === undefined) {
                throw new UnknowPropertyError_1.UnknowPropertyError(utils_1.getClass(instance), propertyName);
            }
            propertyMetadata = propertyMetadata || {};
            var propertyValue = obj[propertyMetadata.name] || obj[propertyName];
            var propertyKey = propertyMetadata.propertyKey || propertyName;
            try {
                if (typeof instance[propertyKey] !== "function") {
                    instance[propertyKey] = _this.deserialize(propertyValue, propertyMetadata.isCollection ? propertyMetadata.collectionType : propertyMetadata.type, propertyMetadata.type);
                }
            }
            catch (err) {
                /* istanbul ignore next */
                (function () {
                    var castedError = new Error("For " + String(propertyKey) + " with value " + propertyValue + " \n" + err.message);
                    castedError.stack = err.stack;
                    throw castedError;
                })();
            }
        };
    }
    ConverterService_1 = ConverterService;
    /**
     * Return a JsonMetadata for a properties.
     * @param properties
     * @param propertyKey
     * @returns {undefined|V|string|any|T|IDBRequest}
     */
    ConverterService.getPropertyMetadata = function (properties, propertyKey) {
        if (properties.has(propertyKey)) {
            return properties.get(propertyKey);
        }
        var property;
        properties.forEach(function (p) {
            if (p.name === propertyKey || p.propertyKey === propertyKey) {
                property = p;
            }
        });
        return property;
    };
    /**
     * Convert instance to plainObject.
     * @param obj
     */
    ConverterService.prototype.serialize = function (obj) {
        var _this = this;
        try {
            if (utils_1.isEmpty(obj)) {
                return obj;
            }
            var converter = this.getConverter(obj);
            if (converter && converter.serialize) {
                // deserialize from a custom JsonConverter
                return converter.serialize(obj);
            }
            if (typeof obj.serialize === "function") {
                // deserialize from serialize method
                return obj.serialize();
            }
            if (typeof obj.toJSON === "function" && !obj.toJSON.$ignore) {
                // deserialize from serialize method
                return obj.toJSON();
            }
            // Default converter
            if (!utils_1.isPrimitiveOrPrimitiveClass(obj)) {
                var plainObject_1 = utils_1.isArrayOrArrayClass(obj) ? [] : {};
                var properties_1 = PropertyRegistry_1.PropertyRegistry.getProperties(obj);
                Object.keys(obj).forEach(function (propertyKey) {
                    if (typeof obj[propertyKey] !== "function") {
                        var propertyMetadata = ConverterService_1.getPropertyMetadata(properties_1, propertyKey);
                        if (utils_1.getClass(obj) !== Object && propertyMetadata === undefined) {
                            throw new UnknowPropertyError_1.UnknowPropertyError(utils_1.getClass(obj), propertyKey);
                        }
                        propertyMetadata = propertyMetadata || {};
                        plainObject_1[propertyMetadata.name || propertyKey] = _this.serialize(obj[propertyKey]);
                    }
                });
                // Required validation
                properties_1.forEach(function (propertyMetadata) {
                    var key = propertyMetadata.name || propertyMetadata.propertyKey;
                    if (!propertyMetadata.isValidValue(plainObject_1[key])) {
                        throw new RequiredPropertyError_1.RequiredPropertyError(utils_1.getClass(obj), propertyMetadata.propertyKey);
                    }
                });
                return plainObject_1;
            }
        }
        catch (err) {
            if (err.name === "BAD_REQUEST") {
                throw new ts_httpexceptions_1.BadRequest(err.message);
            }
            else {
                /* istanbul ignore next */
                throw new ConverterSerializationError_1.ConverterSerializationError(utils_1.getClass(obj), err);
            }
        }
        /* istanbul ignore next */
        return obj;
    };
    /**
     * Convert a plainObject to targetType.
     * @param obj Object source that will be deserialized
     * @param targetType Pattern of the object deserialized
     * @param baseType
     * @returns {any}
     */
    ConverterService.prototype.deserialize = function (obj, targetType, baseType) {
        var _this = this;
        try {
            if (targetType !== Boolean && (utils_1.isEmpty(obj) || utils_1.isEmpty(targetType) || targetType === Object)) {
                return obj;
            }
            var converter = this.getConverter(targetType);
            if (converter) {
                // deserialize from a custom JsonConverter
                return converter.deserialize(obj, targetType, baseType);
            }
            /* istanbul ignore next */
            if (utils_1.isArrayOrArrayClass(obj)) {
                var converter_1 = this.getConverter(Array);
                return converter_1.deserialize(obj, Array, baseType);
            }
            if (targetType.prototype && typeof targetType.prototype.deserialize === "function") {
                // deserialize from method
                var instance_1 = new targetType();
                instance_1.deserialize(obj);
                return instance_1;
            }
            // Default converter
            var instance_2 = new targetType();
            var properties_2 = PropertyRegistry_1.PropertyRegistry.getProperties(targetType);
            Object.keys(obj).forEach(function (propertyName) {
                var propertyMetadata = ConverterService_1.getPropertyMetadata(properties_2, propertyName);
                return _this.convertProperty(obj, instance_2, propertyName, propertyMetadata);
            });
            // Required validation
            properties_2.forEach(function (propertyMetadata) {
                if (!propertyMetadata.isValidValue(instance_2[propertyMetadata.propertyKey])) {
                    throw new RequiredPropertyError_1.RequiredPropertyError(targetType, propertyMetadata.propertyKey);
                }
            });
            return instance_2;
        }
        catch (err) {
            /* istanbul ignore next */
            if (err.name === "BAD_REQUEST") {
                throw new ts_httpexceptions_1.BadRequest(err.message);
            }
            else {
                /* istanbul ignore next */
                throw new ConverterDeserializationError_1.ConverterDeserializationError(targetType, obj, err);
            }
        }
    };
    /**
     *
     * @param targetType
     * @returns {any}
     */
    ConverterService.prototype.getConverter = function (targetType) {
        var converter = Metadata_1.Metadata.get(index_1.CONVERTER, targetType);
        if (converter) {
            return this.injectorService.invoke(converter);
        }
    };
    ConverterService = ConverterService_1 = tslib_1.__decorate([
        service_1.Service(),
        tslib_1.__metadata("design:paramtypes", [di_1.InjectorService])
    ], ConverterService);
    return ConverterService;
    var ConverterService_1;
}());
exports.ConverterService = ConverterService;
//# sourceMappingURL=ConverterService.js.map