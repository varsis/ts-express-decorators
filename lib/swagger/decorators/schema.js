"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PropertyRegistry_1 = require("../../converters/registries/PropertyRegistry");
var Store_1 = require("../../core/class/Store");
var utils_1 = require("../../core/utils");
function Schema(schema) {
    return Store_1.Store.decorate(function (store, parameters) {
        if (utils_1.getDecoratorType(parameters) === "property") {
            PropertyRegistry_1.PropertyRegistry.get(parameters[0], parameters[1]);
        }
        store.merge("schema", schema);
    });
}
exports.Schema = Schema;
//# sourceMappingURL=schema.js.map