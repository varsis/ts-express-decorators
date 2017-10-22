"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var filter_1 = require("../../filters/decorators/filter");
/**
 * @private
 * @filter
 */
var MultipartFilesFilter = /** @class */ (function () {
    function MultipartFilesFilter() {
    }
    MultipartFilesFilter.prototype.transform = function (expression, request, response) {
        return request["files"];
    };
    MultipartFilesFilter = tslib_1.__decorate([
        filter_1.Filter()
    ], MultipartFilesFilter);
    return MultipartFilesFilter;
}());
exports.MultipartFilesFilter = MultipartFilesFilter;
//# sourceMappingURL=MultipartFilesFilter.js.map