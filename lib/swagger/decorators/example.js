"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var schema_1 = require("./schema");
/**
 * Add a example metadata on the decorated element.
 *
 * @param {string} name
 * @param {string} description
 * @returns {(...args: any[]) => any}
 * @decorator
 */
function Example(name, description) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var example;
        if (description) {
            example = (_a = {}, _a[name] = description, _a);
        }
        else {
            example = name;
        }
        return schema_1.Schema({ example: example }).apply(void 0, args);
        var _a;
    };
}
exports.Example = Example;
//# sourceMappingURL=example.js.map