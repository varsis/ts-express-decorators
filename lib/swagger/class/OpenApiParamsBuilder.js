"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var utils_1 = require("../../core/utils");
var ParamRegistry_1 = require("../../mvc/registries/ParamRegistry");
var utils_2 = require("../utils");
var OpenApiPropertiesBuilder_1 = require("./OpenApiPropertiesBuilder");
var OpenApiParamsBuilder = /** @class */ (function (_super) {
    tslib_1.__extends(OpenApiParamsBuilder, _super);
    function OpenApiParamsBuilder(target, methodClassName) {
        var _this = _super.call(this, target) || this;
        _this._parameters = [];
        _this.name = "";
        _this.name = "" + utils_1.nameOf(target) + (methodClassName.charAt(0).toUpperCase() + methodClassName.slice(1));
        _this.injectedParams = ParamRegistry_1.ParamRegistry.getParams(target, methodClassName);
        return _this;
    }
    OpenApiParamsBuilder.prototype.build = function () {
        var _this = this;
        var bodySchema = undefined;
        var bodyParam = {};
        this._parameters = this.injectedParams
            .map(function (param) {
            var inType = {
                "BodyParamsFilter": "body",
                "PathParamsFilter": "path",
                "QueryParamsFilter": "query",
                "HeaderParamsFilter": "header"
            }[param.name];
            if (inType === undefined) {
                return;
            }
            var baseParam = _this.createBaseParameter(inType, param);
            // Next assign type/schema:
            if (inType === "body") {
                if (param.expression) {
                    bodySchema = utils_1.deepExtends(bodySchema || {}, _this.createSchema(param));
                    bodyParam = baseParam;
                }
                else {
                    var builder = new OpenApiPropertiesBuilder_1.OpenApiPropertiesBuilder(param.type);
                    builder.build();
                    utils_1.deepExtends(_this._responses, builder.responses);
                    utils_1.deepExtends(_this._definitions, builder.definitions);
                    return Object.assign(baseParam, {
                        schema: {
                            "$ref": "#/definitions/" + param.typeName
                        }
                    });
                }
            }
            else {
                // Apply the schema to be backwards compatible...
                return Object.assign(baseParam, param.store.get("schema"), {
                    type: utils_2.swaggerType(param.type)
                });
            }
        })
            .filter(function (o) { return !!o; });
        if (bodySchema && bodyParam) {
            var model = this.name + "Payload";
            bodyParam.schema = {};
            bodyParam.schema["$ref"] = "#/definitions/" + model;
            this._parameters.push(bodyParam);
            this._definitions[model] = bodySchema;
        }
        return this;
    };
    OpenApiParamsBuilder.prototype.createBaseParameter = function (inType, param) {
        var baseParam = {
            name: (inType === "body") ? "body" : param.expression,
            in: inType,
            required: !!param.required,
            description: ""
        };
        if (param.required) {
            this._responses[400] = { description: "Missing required parameter" };
        }
        // override defaults with baseParameter
        return utils_1.deepExtends(baseParam, param.store.get("baseParameter") || {});
    };
    /**
     *
     * @param model
     * @returns {Schema}
     */
    OpenApiParamsBuilder.prototype.createSchema = function (model) {
        var keys = (model.expression || "").split(".");
        var builder;
        var output = {
            type: "object",
            properties: {}
        };
        var current = output;
        keys.forEach(function (key, index) {
            current.properties[key] = { type: "object" };
            current = current.properties[key];
        });
        if (model.isClass) {
            builder = new OpenApiPropertiesBuilder_1.OpenApiPropertiesBuilder(model.type);
            builder.build();
            utils_1.deepExtends(this._definitions, builder.definitions);
            utils_1.deepExtends(this._responses, builder.responses);
        }
        else {
            if (!model.isCollection) {
                delete current.properties;
            }
        }
        Object.assign(current, _super.prototype.createSchema.call(this, model));
        return output;
    };
    OpenApiParamsBuilder.prototype.completeMissingPathParams = function (openAPIPath) {
        var _this = this;
        this._parameters = openAPIPath
            .split("/")
            .filter(function (keyPath) {
            if (keyPath.match(/{/)) {
                var name_1 = keyPath.replace(/{|}/, "");
                return !_this._parameters.find(function (o) { return o["in"] === "path" && o.name === name_1; });
            }
        })
            .map(function (keyPath) { return ({
            in: "path",
            name: keyPath.replace(/{|}/gi, ""),
            type: "string",
            required: keyPath.indexOf("?") === -1
        }); })
            .concat(this._parameters);
        return this._parameters;
    };
    Object.defineProperty(OpenApiParamsBuilder.prototype, "parameters", {
        get: function () {
            return this._parameters;
        },
        enumerable: true,
        configurable: true
    });
    return OpenApiParamsBuilder;
}(OpenApiPropertiesBuilder_1.OpenApiPropertiesBuilder));
exports.OpenApiParamsBuilder = OpenApiParamsBuilder;
//# sourceMappingURL=OpenApiParamsBuilder.js.map