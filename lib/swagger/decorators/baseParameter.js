"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Store_1 = require("../../core/class/Store");
function BaseParameter(baseParameter) {
    return Store_1.Store.decorate(function (store, parameters) {
        store.merge("baseParameter", baseParameter);
    });
}
exports.BaseParameter = BaseParameter;
//# sourceMappingURL=baseParameter.js.map