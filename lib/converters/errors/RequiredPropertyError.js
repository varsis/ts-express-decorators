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
var RequiredPropertyError = /** @class */ (function (_super) {
    tslib_1.__extends(RequiredPropertyError, _super);
    function RequiredPropertyError(target, propertyName) {
        return _super.call(this, RequiredPropertyError.buildMessage(target, propertyName)) || this;
    }
    /**
     *
     * @returns {string}
     * @param target
     * @param propertyName
     */
    RequiredPropertyError.buildMessage = function (target, propertyName) {
        return "Property " + propertyName + " on class " + utils_1.nameOf(target) + " is required.";
    };
    return RequiredPropertyError;
}(ts_httpexceptions_1.BadRequest));
exports.RequiredPropertyError = RequiredPropertyError;
//# sourceMappingURL=RequiredPropertyError.js.map