"use strict";
/**
 * @module common/filters
 */
/** */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var filter_1 = require("../decorators/filter");
var ParseService_1 = require("../services/ParseService");
/**
 * @private
 * @filter
 */
var LocalsFilter = /** @class */ (function () {
    function LocalsFilter(parseService) {
        this.parseService = parseService;
    }
    LocalsFilter.prototype.transform = function (expression, request, response) {
        return this.parseService.eval(expression, response["locals"], false);
    };
    LocalsFilter = tslib_1.__decorate([
        filter_1.Filter(),
        tslib_1.__metadata("design:paramtypes", [ParseService_1.ParseService])
    ], LocalsFilter);
    return LocalsFilter;
}());
exports.LocalsFilter = LocalsFilter;
//# sourceMappingURL=LocalsFilter.js.map