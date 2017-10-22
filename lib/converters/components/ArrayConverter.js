"use strict";
/**
 * @module common/converters
 */ /** */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var utils_1 = require("../../core/utils");
var converter_1 = require("../decorators/converter");
var ConverterService_1 = require("../services/ConverterService");
/**
 * @private
 * @converter
 */
var ArrayConverter = /** @class */ (function () {
    function ArrayConverter(converterService) {
        this.converterService = converterService;
    }
    /**
     *
     * @param data
     * @param target
     * @param baseType
     * @returns {any[]}
     */
    ArrayConverter.prototype.deserialize = function (data, target, baseType) {
        var _this = this;
        if (utils_1.isArrayOrArrayClass(data)) {
            return data.map(function (item) {
                return _this.converterService.deserialize(item, baseType);
            });
        }
        return [data];
    };
    /**
     *
     * @param data
     * @returns {any[]}
     */
    ArrayConverter.prototype.serialize = function (data) {
        var _this = this;
        return data.map(function (item) {
            return _this.converterService.serialize(item);
        });
    };
    ArrayConverter = tslib_1.__decorate([
        converter_1.Converter(Array),
        tslib_1.__metadata("design:paramtypes", [ConverterService_1.ConverterService])
    ], ArrayConverter);
    return ArrayConverter;
}());
exports.ArrayConverter = ArrayConverter;
//# sourceMappingURL=ArrayConverter.js.map