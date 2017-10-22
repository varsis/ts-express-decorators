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
var QueryParamsFilter = /** @class */ (function () {
    function QueryParamsFilter(parseService) {
        this.parseService = parseService;
    }
    QueryParamsFilter.prototype.transform = function (expression, request, response) {
        return this.parseService.eval(expression, request["query"]);
    };
    QueryParamsFilter = tslib_1.__decorate([
        filter_1.Filter(),
        tslib_1.__metadata("design:paramtypes", [ParseService_1.ParseService])
    ], QueryParamsFilter);
    return QueryParamsFilter;
}());
exports.QueryParamsFilter = QueryParamsFilter;
//# sourceMappingURL=QueryParamsFilter.js.map