"use strict";
/**
 * @module common/filters
 */
/** */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var filter_1 = require("../decorators/filter");
/**
 * @private
 * @filter
 */
var HeaderParamsFilter = /** @class */ (function () {
    function HeaderParamsFilter() {
    }
    HeaderParamsFilter.prototype.transform = function (expression, request, response) {
        return request.get(expression);
    };
    HeaderParamsFilter = tslib_1.__decorate([
        filter_1.Filter(),
        tslib_1.__metadata("design:paramtypes", [])
    ], HeaderParamsFilter);
    return HeaderParamsFilter;
}());
exports.HeaderParamsFilter = HeaderParamsFilter;
//# sourceMappingURL=HeaderParamsFilter.js.map