"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PropertyRegistry_1 = require("../../converters/registries/PropertyRegistry");
var ParamRegistry_1 = require("../registries/ParamRegistry");
/**
 * Add allowed values when the property or parameters is required.
 *
 * #### Example on parameter:
 *
 * ```typescript
 * @Post("/")
 * async method(@Required() @Allow("") @BodyParams("field") field: string) {}
 * ```
 * > Required will throw a BadRequest when the given value is `null` or `undefined` but not for an empty string.
 *
 * #### Example on model:
 *
 * ```typescript
 * class Model {
 *   @JsonProperty()
 *   @Required()
 *   @Allow("")
 *   field: string;
 * }
 * ```
 *
 * @returns {Function}
 * @decorator
 */
function Allow() {
    var allowedValues = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        allowedValues[_i] = arguments[_i];
    }
    return function (target, propertyKey, parameterIndex) {
        if (typeof parameterIndex === "number") {
            var paramMetadata = ParamRegistry_1.ParamRegistry.get(target, propertyKey, parameterIndex);
            paramMetadata.allowedValues = allowedValues;
            ParamRegistry_1.ParamRegistry.set(target, propertyKey, parameterIndex, paramMetadata);
        }
        else {
            var propertyMetadata = PropertyRegistry_1.PropertyRegistry.get(target, propertyKey);
            propertyMetadata.allowedValues = allowedValues;
            PropertyRegistry_1.PropertyRegistry.set(target, propertyKey, propertyMetadata);
        }
    };
}
exports.Allow = Allow;
//# sourceMappingURL=allow.js.map