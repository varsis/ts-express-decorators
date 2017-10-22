"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../../core/utils/index");
/**
 * @module common/converters
 */
/** */
var InjectorService_1 = require("../../di/services/InjectorService");
var PropertyRegistry_1 = require("../registries/PropertyRegistry");
var ConverterService_1 = require("../services/ConverterService");
/**
 * `@JsonProperty()` let you decorate an attribut that can be serialized or deserialized. By default, no parameters are required to use it.
 * But in some cases, we need to configure explicitly the JSON attribut name mapped to the provide attribut.
 * Here an example of different use cases with `@JsonProperty()`:
 *
 * ```typescript
 * provide EventModel {
 *
 *    \@JsonProperty()
 *    name: string;
 *
 *    \@JsonProperty('startDate')
 *    startDate: Date;
 *
 *    \@JsonProperty({name: 'end-date'})
 *    endDate: Date;
 *
 *    \@JsonProperty({use: Task})
 *    tasks: TaskModel[];
 * }
 *
 * provide TaskModel {
 *     subject: string;
 *     rate: number;
 * }
 *
 * > Theses ES6 collections can be used : Map and Set. Map will be serialized as an object and Set as an array.
 * By default Date, Array, Map and Set have a default custom Converter allready embded. But you can override theses (see next part).
 *
 * For the Array, you must add the `{use: type}` option to the decorators.
 * `TypeClass` will be used to deserialize each item in the collection stored on the attribut source.
 *
 * @returns {Function}
 * @decorator
 * @param options
 */
function JsonProperty(options) {
    return function (target, propertyKey) {
        /* istanbul ignore else */
        if (propertyKey) {
            var property = PropertyRegistry_1.PropertyRegistry.get(target, propertyKey);
            if (typeof options === "string") {
                property.name = options;
            }
            else if (typeof options === "object") {
                property.name = options.name;
                if (!index_1.isEmpty(options.use)) {
                    property.type = options.use;
                }
            }
            if (!target.constructor.prototype.toJSON) {
                target.constructor.prototype.toJSON = function () {
                    return InjectorService_1.InjectorService
                        .invoke(ConverterService_1.ConverterService)
                        .serialize(this);
                };
                target.constructor.prototype.toJSON.$ignore = true;
            }
        }
    };
}
exports.JsonProperty = JsonProperty;
//# sourceMappingURL=jsonProperty.js.map