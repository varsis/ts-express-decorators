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
var CookiesFilter = /** @class */ (function () {
    function CookiesFilter(parseService) {
        this.parseService = parseService;
    }
    CookiesFilter.prototype.transform = function (expression, request, response) {
        return this.parseService.eval(expression, request["cookies"]);
    };
    CookiesFilter = tslib_1.__decorate([
        filter_1.Filter(),
        tslib_1.__metadata("design:paramtypes", [ParseService_1.ParseService])
    ], CookiesFilter);
    return CookiesFilter;
}());
exports.CookiesFilter = CookiesFilter;
//# sourceMappingURL=CookiesFilter.js.map