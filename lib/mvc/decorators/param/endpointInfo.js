"use strict";
/**
 * @module common/mvc
 */ /** */
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../../constants/index");
var ParamRegistry_1 = require("../../registries/ParamRegistry");
/**
 *
 * @returns {Function}
 * @decorator
 */
function EndpointInfo() {
    return function (target, propertyKey, parameterIndex) {
        if (typeof parameterIndex === "number") {
            ParamRegistry_1.ParamRegistry.useService(index_1.ENDPOINT_INFO, {
                propertyKey: propertyKey,
                parameterIndex: parameterIndex,
                target: target
            });
        }
    };
}
exports.EndpointInfo = EndpointInfo;
//# sourceMappingURL=endpointInfo.js.map