"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var filter_1 = require("../../filters/decorators/filter");
/**
 * @private
 * @filter
 */
var MultipartFileFilter = /** @class */ (function () {
    function MultipartFileFilter() {
    }
    MultipartFileFilter.prototype.transform = function (expression, request, response) {
        return request["files"][0];
    };
    MultipartFileFilter = tslib_1.__decorate([
        filter_1.Filter()
    ], MultipartFileFilter);
    return MultipartFileFilter;
}());
exports.MultipartFileFilter = MultipartFileFilter;
//# sourceMappingURL=MultipartFileFilter.js.map