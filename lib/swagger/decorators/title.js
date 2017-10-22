"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../../core/utils");
var baseParameter_1 = require("./baseParameter");
var schema_1 = require("./schema");
/**
 * Add title metadata on the decorated element.
 *
 * ## Examples
 * ### On parameter
 *
 * ```typescript
 * @Controller("/")
 * class ModelCtrl {
 *    async method(@Title("title") @BodyParams("id") id: string) {}
 * }
 * ````
 *
 * Will produce:
 *
 * ```json
 * {
 *   "name":"body",
 *   "in":"body",
 *   "title":"title"
 * }
 * ```
 *
 * ### On property
 *
 * ```typescript
 * class Model {
 *    @Title("title")
 *    id: string;
 * }
 * ```
 *
 * Will produce:
 *
 * ```json
 * "Model": {
 *   "title": "title",
 * }
 * ```
 *
 * @param {string} title
 * @returns {(...args: any[]) => any}
 * @decorator
 */
function Title(title) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var type = utils_1.getDecoratorType(args);
        switch (type) {
            case "parameter":
                return baseParameter_1.BaseParameter({ title: title }).apply(void 0, args);
            default:
                schema_1.Schema({ title: title }).apply(void 0, args);
        }
    };
}
exports.Title = Title;
//# sourceMappingURL=title.js.map