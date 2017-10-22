"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @module common/mvc
 */
/** */
var Metadata_1 = require("../../core/class/Metadata");
var ParamMetadata_1 = require("../class/ParamMetadata");
var constants_1 = require("../constants");
var ParamRegistry = /** @class */ (function () {
    function ParamRegistry() {
    }
    /**
     *
     * @param target
     * @param targetKey
     * @param index
     * @returns {any}
     */
    ParamRegistry.get = function (target, targetKey, index) {
        var params = this.getParams(target, targetKey);
        params[index] = params[index] || new ParamMetadata_1.ParamMetadata(target, targetKey, index);
        return params[index];
    };
    /**
     *
     * @param target
     * @param targetKey
     * @param index
     * @param injectParams
     */
    ParamRegistry.set = function (target, targetKey, index, injectParams) {
        var params = Metadata_1.Metadata.has(constants_1.PARAM_METADATA, target, targetKey)
            ? Metadata_1.Metadata.get(constants_1.PARAM_METADATA, target, targetKey)
            : [];
        params[index] = injectParams;
        Metadata_1.Metadata.set(constants_1.PARAM_METADATA, params, target, targetKey);
    };
    /**
     *
     * @param service
     * @param settings
     */
    ParamRegistry.useService = function (service, settings) {
        var param = ParamRegistry.get(settings.target, settings.propertyKey, settings.parameterIndex);
        param.service = service;
        param.useConverter = false;
        ParamRegistry.set(settings.target, settings.propertyKey, settings.parameterIndex, param);
        return this;
    };
    /**
     *
     * @param target
     * @param propertyKey
     * @param parameterIndex
     * @param allowedValues
     */
    ParamRegistry.required = function (target, propertyKey, parameterIndex, allowedValues) {
        if (allowedValues === void 0) { allowedValues = []; }
        var param = ParamRegistry.get(target, propertyKey, parameterIndex);
        param.required = true;
        param.allowedValues = allowedValues;
        ParamRegistry.set(target, propertyKey, parameterIndex, param);
        ParamRegistry.get(target, propertyKey, parameterIndex).store.merge("responses", {
            "400": {
                description: "BadRequest"
            }
        });
        return this;
    };
    /**
     *
     * @param service
     * @param options
     */
    ParamRegistry.useFilter = function (service, options) {
        var propertyKey = options.propertyKey, parameterIndex = options.parameterIndex, expression = options.expression, target = options.target, useType = options.useType, useConverter = options.useConverter;
        var param = ParamRegistry.get(target, propertyKey, parameterIndex);
        if (typeof expression !== "string") {
            useType = expression;
            expression = undefined;
        }
        param.service = service;
        param.expression = expression;
        if (useType) {
            param.type = useType;
        }
        if (useConverter !== undefined) {
            param.useConverter = useConverter;
        }
        ParamRegistry.set(target, propertyKey, parameterIndex, param);
        return param;
    };
    /**
     *
     * @param target
     * @param targetKey
     * @returns {Array}
     */
    ParamRegistry.getParams = function (target, targetKey) {
        return Metadata_1.Metadata.has(constants_1.PARAM_METADATA, target, targetKey)
            ? Metadata_1.Metadata.get(constants_1.PARAM_METADATA, target, targetKey)
            : [];
    };
    /**
     *
     * @param target
     * @param method
     */
    ParamRegistry.isInjectable = function (target, method) {
        return (Metadata_1.Metadata.get(constants_1.PARAM_METADATA, target, method) || []).length > 0;
    };
    /**
     *
     * @param target
     * @param propertyKey
     */
    ParamRegistry.hasNextFunction = function (target, propertyKey) {
        return ParamRegistry
            .getParams(target, propertyKey)
            .findIndex(function (p) { return p.service === constants_1.EXPRESS_NEXT_FN; }) > -1;
    };
    return ParamRegistry;
}());
exports.ParamRegistry = ParamRegistry;
//# sourceMappingURL=ParamRegistry.js.map