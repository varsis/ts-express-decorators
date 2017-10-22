"use strict";
/**
 * @module common/converters
 */ /** */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var converter_1 = require("../decorators/converter");
/**
 * @private
 * @converter
 */
var DateConverter = /** @class */ (function () {
    function DateConverter() {
    }
    DateConverter.prototype.deserialize = function (data) {
        return new Date(data);
    };
    DateConverter.prototype.serialize = function (object) {
        return object.toISOString();
    };
    DateConverter = tslib_1.__decorate([
        converter_1.Converter(Date)
    ], DateConverter);
    return DateConverter;
}());
exports.DateConverter = DateConverter;
//# sourceMappingURL=DateConverter.js.map