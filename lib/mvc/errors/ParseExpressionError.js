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
var ParseExpressionError = /** @class */ (function (_super) {
    tslib_1.__extends(ParseExpressionError, _super);
    function ParseExpressionError(name, expression, message) {
        return _super.call(this, ParseExpressionError.buildMessage(name, expression, message)) || this;
    }
    /**
     *
     * @param name
     * @param expression
     * @param message
     * @returns {string}
     */
    ParseExpressionError.buildMessage = function (name, expression, message) {
        name = name.toLowerCase().replace(/parse|params|filter/gi, "");
        return ("Bad request on parameter request." + name + (expression ? "." + expression : "") + ". " + (message ? message : "")).trim();
    };
    return ParseExpressionError;
}(ts_httpexceptions_1.BadRequest));
exports.ParseExpressionError = ParseExpressionError;
//# sourceMappingURL=ParseExpressionError.js.map