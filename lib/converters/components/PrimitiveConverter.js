"use strict";
/**
 * @module common/converters
 */ /** */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ts_httpexceptions_1 = require("ts-httpexceptions");
var converter_1 = require("../decorators/converter");
/**
 * @private
 * @converter
 */
var PrimitiveConverter = /** @class */ (function () {
    function PrimitiveConverter() {
    }
    PrimitiveConverter.prototype.deserialize = function (data, target) {
        switch (target) {
            case String:
                return "" + data;
            case Number:
                var n = +data;
                if (isNaN(n)) {
                    throw new ts_httpexceptions_1.BadRequest("Cast error. Expression value is not a number.");
                }
                return n;
            case Boolean:
                if (data === "true")
                    return true;
                if (data === "false")
                    return false;
                return !!data;
        }
    };
    PrimitiveConverter.prototype.serialize = function (object) {
        return object;
    };
    PrimitiveConverter = tslib_1.__decorate([
        converter_1.Converter(String, Number, Boolean)
    ], PrimitiveConverter);
    return PrimitiveConverter;
}());
exports.PrimitiveConverter = PrimitiveConverter;
//# sourceMappingURL=PrimitiveConverter.js.map