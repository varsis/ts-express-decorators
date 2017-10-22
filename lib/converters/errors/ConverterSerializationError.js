"use strict";
/**
 * @module common/converters
 */
/** */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ts_httpexceptions_1 = require("ts-httpexceptions");
var index_1 = require("../../core/utils/index");
/**
 * @private
 */
var ConverterSerializationError = /** @class */ (function (_super) {
    tslib_1.__extends(ConverterSerializationError, _super);
    function ConverterSerializationError(target, err) {
        var _this = _super.call(this, ConverterSerializationError.buildMessage(target, err)) || this;
        _this.name = "CONVERTER_SERIALIZATION_ERROR";
        _this.stack = err.stack;
        return _this;
    }
    /**
     *
     * @returns {string}
     */
    ConverterSerializationError.buildMessage = function (target, err) {
        return ("Convertion failed for \"" + index_1.nameOf(target) + "\". " + err.message).trim();
    };
    return ConverterSerializationError;
}(ts_httpexceptions_1.InternalServerError));
exports.ConverterSerializationError = ConverterSerializationError;
//# sourceMappingURL=ConverterSerializationError.js.map