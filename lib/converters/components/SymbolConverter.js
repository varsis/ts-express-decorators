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
var SymbolConverter = /** @class */ (function () {
    function SymbolConverter() {
    }
    SymbolConverter.prototype.deserialize = function (data, target) {
        return Symbol(data);
    };
    SymbolConverter.prototype.serialize = function (object) {
        return object.toString().replace("Symbol(", "").replace(")", "");
    };
    SymbolConverter = tslib_1.__decorate([
        converter_1.Converter(Symbol)
    ], SymbolConverter);
    return SymbolConverter;
}());
exports.SymbolConverter = SymbolConverter;
//# sourceMappingURL=SymbolConverter.js.map