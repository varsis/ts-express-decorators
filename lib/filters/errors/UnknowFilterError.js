"use strict";
/**
 * @module mvc
 */ /** */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ts_httpexceptions_1 = require("ts-httpexceptions");
var index_1 = require("../../core/utils/index");
/**
 * @private
 */
var UnknowFilterError = /** @class */ (function (_super) {
    tslib_1.__extends(UnknowFilterError, _super);
    function UnknowFilterError(target) {
        return _super.call(this, UnknowFilterError.buildMessage(target)) || this;
    }
    /**
     *
     * @returns {string}
     */
    UnknowFilterError.buildMessage = function (target) {
        return "Filter " + index_1.nameOf(target) + " not found.";
    };
    return UnknowFilterError;
}(ts_httpexceptions_1.InternalServerError));
exports.UnknowFilterError = UnknowFilterError;
//# sourceMappingURL=UnknowFilterError.js.map