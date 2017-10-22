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
var UnknowControllerError = /** @class */ (function (_super) {
    tslib_1.__extends(UnknowControllerError, _super);
    function UnknowControllerError(target) {
        return _super.call(this, UnknowControllerError.buildMessage(target)) || this;
    }
    /**
     *
     * @returns {string}
     */
    UnknowControllerError.buildMessage = function (target) {
        return "Controller " + index_1.nameOf(target) + " not found.";
    };
    return UnknowControllerError;
}(ts_httpexceptions_1.InternalServerError));
exports.UnknowControllerError = UnknowControllerError;
//# sourceMappingURL=UnknowControllerError.js.map