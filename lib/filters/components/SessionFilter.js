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
var SessionFilter = /** @class */ (function () {
    function SessionFilter(parseService) {
        this.parseService = parseService;
    }
    SessionFilter.prototype.transform = function (expression, request, response) {
        return this.parseService.eval(expression, request["session"], false);
    };
    SessionFilter = tslib_1.__decorate([
        filter_1.Filter(),
        tslib_1.__metadata("design:paramtypes", [ParseService_1.ParseService])
    ], SessionFilter);
    return SessionFilter;
}());
exports.SessionFilter = SessionFilter;
//# sourceMappingURL=SessionFilter.js.map