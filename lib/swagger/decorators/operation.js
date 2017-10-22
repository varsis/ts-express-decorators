"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Store_1 = require("../../core/class/Store");
function Operation(operation) {
    return Store_1.Store.decorate(function (store, parameters) {
        store.merge("operation", operation);
    });
}
exports.Operation = Operation;
//# sourceMappingURL=operation.js.map