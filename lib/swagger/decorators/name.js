"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Store_1 = require("../../core/class/Store");
var index_1 = require("../../core/utils/index");
var baseParameter_1 = require("./baseParameter");
/**
 * Add a name metadata on the decorated element.
 *
 * ## Examples
 * ### On parameters
 *
 * ```typescript
 * async myMethod(@Name("nameOf") @PathParams("id") id: string): Promise<Model>  {
 *
 * }
 * ```
 *
 * ### On parameters
 *
 * ```typescript
 * @Name("AliasName")
 * @Controller("/")
 * class ModelCtrl {
 *
 * }
 * ```
 *
 * @returns {Function}
 * @decorator
 * @param name
 */
function Name(name) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var type = index_1.getDecoratorType(args);
        switch (type) {
            case "parameter":
                return baseParameter_1.BaseParameter({ name: name }).apply(void 0, args);
            case "class":
                Store_1.Store.from.apply(Store_1.Store, args).set("name", name);
                break;
            default:
                throw new Error("Name is only supported on parameters and class");
        }
    };
}
exports.Name = Name;
//# sourceMappingURL=name.js.map