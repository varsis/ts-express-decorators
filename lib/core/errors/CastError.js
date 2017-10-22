"use strict";
/**
 * @module common/core
 */
/** */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ts_httpexceptions_1 = require("ts-httpexceptions");
/**
 * @private
 */
var CastError = /** @class */ (function (_super) {
    tslib_1.__extends(CastError, _super);
    function CastError(err) {
        var _this = _super.call(this, err.message) || this;
        _this.stack = err.stack;
        _this.origin = err;
        return _this;
    }
    return CastError;
}(ts_httpexceptions_1.InternalServerError));
exports.CastError = CastError;
//# sourceMappingURL=CastError.js.map