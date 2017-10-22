"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../../core/utils");
var operation_1 = require("./operation");
/**
 * Add security metadata on the decorated method.
 *
 * ## Examples
 * ### On method
 *
 * ```typescript
 * @Controller("/")
 * class ModelCtrl {
 *    @Security("write:calendars")
 *    async method() {}
 * }
 * ```
 *
 * @param {string} securityDefinitionName
 * @param {string} scopes
 * @returns {(...args: any[]) => any}
 * @constructor
 */
function Security(securityDefinitionName) {
    var scopes = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        scopes[_i - 1] = arguments[_i];
    }
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var type = utils_1.getDecoratorType(args);
        switch (type) {
            case "method":
                return operation_1.Operation({ security: [(_a = {}, _a[securityDefinitionName] = scopes, _a)] }).apply(void 0, args);
            default:
                throw new Error("Security is only supported on method");
        }
        var _a;
    };
}
exports.Security = Security;
//# sourceMappingURL=security.js.map