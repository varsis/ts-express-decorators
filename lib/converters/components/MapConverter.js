"use strict";
/**
 * @module common/converters
 */ /** */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var converter_1 = require("../decorators/converter");
var ConverterService_1 = require("../services/ConverterService");
/**
 * @private
 * @converter
 */
var MapConverter = /** @class */ (function () {
    function MapConverter(converterService) {
        this.converterService = converterService;
    }
    /**
     *
     * @param data
     * @param target
     * @param baseType
     * @returns {Map<string, T>}
     */
    MapConverter.prototype.deserialize = function (data, target, baseType) {
        var _this = this;
        var obj = new Map();
        Object.keys(data).forEach(function (key) {
            obj.set(key, _this.converterService.deserialize(data[key], baseType));
        });
        return obj;
    };
    /**
     *
     * @param data
     */
    MapConverter.prototype.serialize = function (data) {
        var _this = this;
        var obj = {};
        data.forEach(function (value, key) {
            return obj[key] = _this.converterService.serialize(value);
        });
        return obj;
    };
    MapConverter = tslib_1.__decorate([
        converter_1.Converter(Map),
        tslib_1.__metadata("design:paramtypes", [ConverterService_1.ConverterService])
    ], MapConverter);
    return MapConverter;
}());
exports.MapConverter = MapConverter;
//# sourceMappingURL=MapConverter.js.map