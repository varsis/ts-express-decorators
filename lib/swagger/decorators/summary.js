"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../../core/utils");
var operation_1 = require("./operation");
/**
 * Add summary metadata on the decorated element.
 *
 * ## Examples
 * ### On method
 *
 * ```typescript
 * class Model {
 *    @Summary("summary")
 *    id: string;
 * }
 * ```
 *
 * @param {string} summary
 * @returns {Function}
 * @decorator
 */
function Summary(summary) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var type = utils_1.getDecoratorType(args);
        switch (type) {
            case "method":
                return operation_1.Operation({ summary: summary }).apply(void 0, args);
            default:
                throw new Error("Summary is only supported on method");
        }
    };
}
exports.Summary = Summary;
//# sourceMappingURL=summary.js.map