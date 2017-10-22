"use strict";
/**
 * @module common/mvc
 */ /** */
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../../constants/index");
var ParamRegistry_1 = require("../../registries/ParamRegistry");
/**
 * Response service.
 * @returns {function(Function, (string|symbol), number): void}
 * @decorator
 */
function Response() {
    return Res();
}
exports.Response = Response;
/**
 * Request service.
 * @returns {function(Function, (string|symbol), number): void}
 * @decorator
 * @alias Request
 */
function Res() {
    return function (target, propertyKey, parameterIndex) {
        if (typeof parameterIndex === "number") {
            ParamRegistry_1.ParamRegistry.useService(index_1.EXPRESS_RESPONSE, {
                target: target,
                propertyKey: propertyKey,
                parameterIndex: parameterIndex
            });
        }
    };
}
exports.Res = Res;
//# sourceMappingURL=response.js.map