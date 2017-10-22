"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
/**
 * @module common/converters
 */
/** */
var ts_httpexceptions_1 = require("ts-httpexceptions");
var index_1 = require("../../core/utils/index");
/**
 * @private
 */
var ConverterDeserializationError = /** @class */ (function (_super) {
    tslib_1.__extends(ConverterDeserializationError, _super);
    function ConverterDeserializationError(target, obj, err) {
        var _this = _super.call(this, ConverterDeserializationError.buildMessage(target, obj, err)) || this;
        _this.name = "CONVERTER_DESERIALIZATION_ERROR";
        _this.stack = err.stack;
        return _this;
    }
    /**
     *
     * @returns {string}
     */
    ConverterDeserializationError.buildMessage = function (target, obj, err) {
        return ("Convertion failed for class \"" + index_1.nameOf(target) + "\" with object => " + JSON.stringify(obj) + ".\n" + err.message).trim();
    };
    return ConverterDeserializationError;
}(ts_httpexceptions_1.InternalServerError));
exports.ConverterDeserializationError = ConverterDeserializationError;
//# sourceMappingURL=ConverterDeserializationError.js.map