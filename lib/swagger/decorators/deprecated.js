"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @module swagger
 */
/** */
var utils_1 = require("../../core/utils");
var operation_1 = require("./operation");
/**
 * Add deprecated metadata on the decorated element.
 *
 * ## Examples
 * ### On method
 *
 * ```typescript
 * class Model {
 *    @Deprecated()
 *    id: string;
 * }
 * ```
 *
 * @returns {Function}
 * @constructor
 */
function Deprecated() {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var type = utils_1.getDecoratorType(args);
        switch (type) {
            case "method":
                return operation_1.Operation({ deprecated: true }).apply(void 0, args);
            default:
                throw new Error("Deprecated is only supported on method");
        }
    };
}
exports.Deprecated = Deprecated;
//# sourceMappingURL=deprecated.js.map