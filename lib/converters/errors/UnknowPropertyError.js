"use strict";
/**
 * @module common/mvc
 */
/** */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ts_httpexceptions_1 = require("ts-httpexceptions");
var utils_1 = require("../../core/utils");
/**
 * @private
 */
var UnknowPropertyError = /** @class */ (function (_super) {
    tslib_1.__extends(UnknowPropertyError, _super);
    function UnknowPropertyError(target, propertyName) {
        return _super.call(this, UnknowPropertyError.buildMessage(target, propertyName)) || this;
    }
    /**
     *
     * @returns {string}
     * @param target
     * @param propertyName
     */
    UnknowPropertyError.buildMessage = function (target, propertyName) {
        return "Property " + propertyName + " on class " + utils_1.nameOf(target) + " is not allowed.";
    };
    return UnknowPropertyError;
}(ts_httpexceptions_1.BadRequest));
exports.UnknowPropertyError = UnknowPropertyError;
//# sourceMappingURL=UnknowPropertyError.js.map