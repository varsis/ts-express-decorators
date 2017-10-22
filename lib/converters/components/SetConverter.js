"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
/**
 * @module common/converters
 */
/** */
var converter_1 = require("../decorators/converter");
var ConverterService_1 = require("../services/ConverterService");
/**
 * @private
 * @converter
 */
var SetConverter = /** @class */ (function () {
    function SetConverter(converterService) {
        this.converterService = converterService;
    }
    /**
     *
     * @param data
     * @param target
     * @param baseType
     * @returns {Map<string, T>}
     */
    SetConverter.prototype.deserialize = function (data, target, baseType) {
        var _this = this;
        var obj = new Set();
        Object.keys(data).forEach(function (key) {
            obj.add(_this.converterService.deserialize(data[key], baseType));
        });
        return obj;
    };
    /**
     *
     * @param data
     */
    SetConverter.prototype.serialize = function (data) {
        var _this = this;
        var array = [];
        data.forEach(function (value) {
            return array.push(_this.converterService.serialize(value));
        });
        return array;
    };
    SetConverter = tslib_1.__decorate([
        converter_1.Converter(Set),
        tslib_1.__metadata("design:paramtypes", [ConverterService_1.ConverterService])
    ], SetConverter);
    return SetConverter;
}());
exports.SetConverter = SetConverter;
//# sourceMappingURL=SetConverter.js.map