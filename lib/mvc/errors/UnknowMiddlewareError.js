"use strict";
/**
 * @module common/mvc
 */ /** */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ts_httpexceptions_1 = require("ts-httpexceptions");
var index_1 = require("../../core/utils/index");
/**
 * @private
 */
var UnknowMiddlewareError = /** @class */ (function (_super) {
    tslib_1.__extends(UnknowMiddlewareError, _super);
    function UnknowMiddlewareError(target) {
        return _super.call(this, UnknowMiddlewareError.buildMessage(target)) || this;
    }
    /**
     *
     * @returns {string}
     */
    UnknowMiddlewareError.buildMessage = function (target) {
        return "Middleware " + index_1.nameOf(target) + " not found.";
    };
    return UnknowMiddlewareError;
}(ts_httpexceptions_1.InternalServerError));
exports.UnknowMiddlewareError = UnknowMiddlewareError;
//# sourceMappingURL=UnknowMiddlewareError.js.map