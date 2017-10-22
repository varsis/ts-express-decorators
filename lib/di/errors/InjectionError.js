"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
/**
 * @module common/di
 */
/** */
var index_1 = require("../../core/utils/index");
/**
 * @private
 */
var InjectionError = /** @class */ (function (_super) {
    tslib_1.__extends(InjectionError, _super);
    function InjectionError(target, serviceName) {
        var _this = _super.call(this, "Service " + index_1.nameOf(target) + " > " + serviceName + " not found.") || this;
        _this.name = "INJECTION_ERROR";
        return _this;
    }
    return InjectionError;
}(Error));
exports.InjectionError = InjectionError;
//# sourceMappingURL=InjectionError.js.map