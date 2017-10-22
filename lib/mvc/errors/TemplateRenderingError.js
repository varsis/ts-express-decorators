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
var TemplateRenderingError = /** @class */ (function (_super) {
    tslib_1.__extends(TemplateRenderingError, _super);
    function TemplateRenderingError(target, method, err) {
        return _super.call(this, TemplateRenderingError.buildMessage(target, method, err)) || this;
    }
    /**
     *
     * @returns {string}
     */
    TemplateRenderingError.buildMessage = function (target, method, err) {
        return "Template rendering error : " + index_1.nameOf(target) + "." + method + "()\n" + err;
    };
    return TemplateRenderingError;
}(ts_httpexceptions_1.InternalServerError));
exports.TemplateRenderingError = TemplateRenderingError;
//# sourceMappingURL=TemplateRenderingError.js.map