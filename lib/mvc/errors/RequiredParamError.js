"use strict";
/**
 * @module common/mvc
 */ /** */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ts_httpexceptions_1 = require("ts-httpexceptions");
/**
 * @private
 */
var RequiredParamError = /** @class */ (function (_super) {
    tslib_1.__extends(RequiredParamError, _super);
    function RequiredParamError(name, expression) {
        return _super.call(this, RequiredParamError.buildMessage(name, "" + expression)) || this;
    }
    /**
     *
     * @param name
     * @param expression
     * @param message
     * @returns {string}
     */
    RequiredParamError.buildMessage = function (name, expression) {
        name = name.toLowerCase().replace(/parse|params|filter/gi, "");
        return "Bad request, parameter request." + name + "." + expression + " is required.";
    };
    return RequiredParamError;
}(ts_httpexceptions_1.BadRequest));
exports.RequiredParamError = RequiredParamError;
//# sourceMappingURL=RequiredParamError.js.map