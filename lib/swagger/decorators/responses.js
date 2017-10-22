"use strict";
/**
 * @module swagger
 */
/** */
Object.defineProperty(exports, "__esModule", { value: true });
var Store_1 = require("../../core/class/Store");
function Responses(status, response) {
    return Store_1.Store.decorate(function (store) {
        store.merge("responses", (_a = {}, _a[status] = response, _a));
        var _a;
    });
}
exports.Responses = Responses;
//# sourceMappingURL=responses.js.map