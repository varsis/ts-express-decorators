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
var PathParamsFilter = /** @class */ (function () {
    function PathParamsFilter(parseService) {
        this.parseService = parseService;
    }
    PathParamsFilter.prototype.transform = function (expression, request, response) {
        return this.parseService.eval(expression, request["params"]);
    };
    PathParamsFilter = tslib_1.__decorate([
        filter_1.Filter(),
        tslib_1.__metadata("design:paramtypes", [ParseService_1.ParseService])
    ], PathParamsFilter);
    return PathParamsFilter;
}());
exports.PathParamsFilter = PathParamsFilter;
//# sourceMappingURL=PathParamsFilter.js.map