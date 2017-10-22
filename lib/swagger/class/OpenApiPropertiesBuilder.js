"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PropertyRegistry_1 = require("../../converters/registries/PropertyRegistry");
var Store_1 = require("../../core/class/Store");
var utils_1 = require("../../core/utils");
var utils_2 = require("../utils");
/**
 * Builder a Schema from a target.
 */
var OpenApiPropertiesBuilder = /** @class */ (function () {
    function OpenApiPropertiesBuilder(target) {
        this.target = target;
        this._definitions = {};
        this._responses = {};
    }
    /**
     *
     * @returns {OpenApiSchemaBuilder}
     */
    OpenApiPropertiesBuilder.prototype.build = function () {
        var _this = this;
        var properties = PropertyRegistry_1.PropertyRegistry.getProperties(this.target);
        var store = Store_1.Store.from(this.target);
        var schema = Object.assign({}, store.get("schema")) || {};
        if (store.get("description")) {
            schema.description = schema.description || store.get("description");
        }
        schema.type = "object";
        schema.properties = {};
        properties.forEach(function (property) {
            var propertyKey = property.name || property.propertyKey;
            schema.properties[propertyKey] = _this.createSchema(property);
        });
        this._schema = schema;
        this._definitions[utils_1.nameOf(this.target)] = this.schema;
        return this;
    };
    OpenApiPropertiesBuilder.prototype.createSchema = function (model) {
        var builder;
        var schema = model.store.get("schema") || {};
        console.log(schema);
        if (model.store.get("description")) {
            schema.description = schema.description || model.store.get("description");
        }
        if (model.required) {
            this._responses[400] = { description: "Missing required parameter" };
        }
        if (model.isClass) {
            builder = new OpenApiPropertiesBuilder(model.type);
            builder.build();
            utils_1.deepExtends(this._definitions, builder.definitions);
        }
        if (model.isCollection) {
            if (model.isArray) {
                schema.type = "array";
                if (model.isClass) {
                    schema.items = {
                        $ref: "#/definitions/" + model.typeName
                    };
                }
                else {
                    schema.items = {
                        type: utils_2.swaggerType(model.type)
                    };
                }
                return schema;
            }
            if (model.isClass) {
                schema.additionalProperties = {
                    $ref: "#/definitions/" + model.typeName
                };
                return schema;
            }
            schema.additionalProperties = {
                type: utils_2.swaggerType(model.type)
            };
            return schema;
        }
        if (model.isClass) {
            schema.$ref = "#/definitions/" + model.typeName;
            return schema;
        }
        schema.type = utils_2.swaggerType(model.type);
        return schema;
    };
    Object.defineProperty(OpenApiPropertiesBuilder.prototype, "schema", {
        get: function () {
            return this._schema;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OpenApiPropertiesBuilder.prototype, "definitions", {
        get: function () {
            return this._definitions;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OpenApiPropertiesBuilder.prototype, "responses", {
        get: function () {
            return this._responses;
        },
        enumerable: true,
        configurable: true
    });
    return OpenApiPropertiesBuilder;
}());
exports.OpenApiPropertiesBuilder = OpenApiPropertiesBuilder;
//# sourceMappingURL=OpenApiPropertiesBuilder.js.map