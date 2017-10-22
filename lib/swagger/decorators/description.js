"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Store_1 = require("../../core/class/Store");
var utils_1 = require("../../core/utils");
var baseParameter_1 = require("./baseParameter");
var operation_1 = require("./operation");
/**
 * Add a description metadata on the decorated element.
 *
 * ## Examples
 * ### On class
 *
 * ```typescript
 * @Description("description")
 * class Model {
 *
 * }
 * ```
 *
 * ### On method
 *
 * ```typescript
 * @Controller("/")
 * class ModelCtrl {
 *    @Description("description")
 *    async method() {}
 * }
 * ```
 *
 * ### On parameter
 *
 * ```typescript
 * @Controller("/")
 * class ModelCtrl {
 *    async method(@Description("description") @PathParam("id") id: string) {}
 * }
 * ```
 *
 * ### On property
 *
 * ```typescript
 * class Model {
 *    @Description("description")
 *    id: string;
 * }
 * ```
 *
 * @param {string} description
 * @returns {Function}
 * @decorator
 */
function Description(description) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var type = utils_1.getDecoratorType(args);
        switch (type) {
            case "parameter":
                return baseParameter_1.BaseParameter({ description: description }).apply(void 0, args);
            case "method":
                return operation_1.Operation({ description: description }).apply(void 0, args);
            default:
                Store_1.Store.from.apply(Store_1.Store, args).set("description", description);
        }
    };
}
exports.Description = Description;
//# sourceMappingURL=description.js.map