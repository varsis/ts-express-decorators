"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var utils_1 = require("../../core/utils");
/**
 * @module common/filters
 */
/** */
var service_1 = require("../../di/decorators/service");
/**
 *
 */
var ParseService = /** @class */ (function () {
    function ParseService() {
    }
    ParseService_1 = ParseService;
    /**
     * Eval an expression with a scope context and return value.
     * @param expression
     * @param scope
     * @param clone
     * @returns {any}
     */
    ParseService.prototype.eval = function (expression, scope, clone) {
        if (clone === void 0) { clone = true; }
        if (utils_1.isEmpty(expression)) {
            return typeof scope === "object" && clone ? ParseService_1.clone(scope) : scope;
        }
        var keys = expression.split(".");
        while ((scope = scope[keys.shift()]) && keys.length) {
        }
        return typeof scope === "object" && clone ? ParseService_1.clone(scope) : scope;
    };
    /**
     * Clone an object.
     * @param src
     */
    ParseService.clone = function (src) { return JSON.parse(JSON.stringify(src)); };
    ParseService = ParseService_1 = tslib_1.__decorate([
        service_1.Service(),
        tslib_1.__metadata("design:paramtypes", [])
    ], ParseService);
    return ParseService;
    var ParseService_1;
}());
exports.ParseService = ParseService;
//# sourceMappingURL=ParseService.js.map