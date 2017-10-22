"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Provider_1 = require("../../di/class/Provider");
/**
 * @module common/mvc
 */
var interfaces_1 = require("../interfaces");
/** */
var MiddlewareProvider = /** @class */ (function (_super) {
    tslib_1.__extends(MiddlewareProvider, _super);
    function MiddlewareProvider(provide) {
        return _super.call(this, provide) || this;
    }
    Object.defineProperty(MiddlewareProvider.prototype, "type", {
        get: function () {
            return interfaces_1.MiddlewareType[this._type];
        },
        set: function (type) {
            this._type = typeof type === "string" ? type : interfaces_1.MiddlewareType[type];
        },
        enumerable: true,
        configurable: true
    });
    return MiddlewareProvider;
}(Provider_1.Provider));
exports.MiddlewareProvider = MiddlewareProvider;
//# sourceMappingURL=MiddlewareProvider.js.map