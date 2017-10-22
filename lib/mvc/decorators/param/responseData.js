"use strict";
/**
 * @module common/mvc
 */ /** */
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../../constants/index");
var ParamRegistry_1 = require("../../registries/ParamRegistry");
/**
 *
 * @returns {function(Function, (string|symbol), number): void}
 * @decorator
 */
function ResponseData() {
    return function (target, propertyKey, parameterIndex) {
        if (typeof parameterIndex === "number") {
            ParamRegistry_1.ParamRegistry.useService(index_1.RESPONSE_DATA, {
                propertyKey: propertyKey,
                parameterIndex: parameterIndex,
                target: target
            });
        }
    };
}
exports.ResponseData = ResponseData;
//# sourceMappingURL=responseData.js.map