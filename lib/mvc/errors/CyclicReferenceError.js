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
var CyclicReferenceError = /** @class */ (function (_super) {
    tslib_1.__extends(CyclicReferenceError, _super);
    function CyclicReferenceError(c1, c2) {
        var _this = _super.call(this, CyclicReferenceError.buildMessage(c1, c2)) || this;
        _this.name = "CYCLIC_REFERENCE_ERROR";
        return _this;
    }
    /**
     *
     * @returns {string}
     */
    CyclicReferenceError.buildMessage = function (c1, c2) {
        return "Cyclic reference between " + index_1.nameOf(c1) + " and " + index_1.nameOf(c2) + ".";
    };
    return CyclicReferenceError;
}(ts_httpexceptions_1.InternalServerError));
exports.CyclicReferenceError = CyclicReferenceError;
//# sourceMappingURL=CyclicReferenceError.js.map