"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @module common/mvc
 */
/** */
var index_1 = require("../../constants/index");
var ParamRegistry_1 = require("../../registries/ParamRegistry");
/**
 * Request service.
 * @returns {function(Function, (string|symbol), number): void}
 * @decorator
 */
function Request() {
    return Req();
}
exports.Request = Request;
/**
 * Request service.
 * @returns {function(Function, (string|symbol), number): void}
 * @decorator
 * @alias Request
 */
function Req() {
    return function (target, propertyKey, parameterIndex) {
        if (typeof parameterIndex === "number") {
            ParamRegistry_1.ParamRegistry.useService(index_1.EXPRESS_REQUEST, {
                target: target,
                propertyKey: propertyKey,
                parameterIndex: parameterIndex
            });
        }
    };
}
exports.Req = Req;
//# sourceMappingURL=request.js.map