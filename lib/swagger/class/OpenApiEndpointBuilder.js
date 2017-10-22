"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Store_1 = require("../../core/class/Store");
var utils_1 = require("../../core/utils");
var utils_2 = require("../utils");
var OpenApiParamsBuilder_1 = require("./OpenApiParamsBuilder");
var OpenApiPropertiesBuilder_1 = require("./OpenApiPropertiesBuilder");
/** */
var OPERATION_IDS = {};
var getOperationId = function (operationId) {
    if (OPERATION_IDS[operationId] !== undefined) {
        OPERATION_IDS[operationId]++;
        operationId = operationId + "_" + OPERATION_IDS[operationId];
    }
    else {
        OPERATION_IDS[operationId] = 0;
    }
    return operationId;
};
var OpenApiEndpointBuilder = /** @class */ (function (_super) {
    tslib_1.__extends(OpenApiEndpointBuilder, _super);
    function OpenApiEndpointBuilder(endpoint, endpointUrl) {
        var _this = _super.call(this, endpoint.target) || this;
        _this.endpoint = endpoint;
        _this.endpointUrl = endpointUrl;
        _this._paths = {};
        return _this;
    }
    OpenApiEndpointBuilder.prototype.build = function () {
        var _this = this;
        var openAPIPath = ("" + utils_2.toSwaggerPath("" + this.endpointUrl + (this.endpoint.path || ""))).trim();
        var produces = this.endpoint.get("produces") || [];
        var consumes = this.endpoint.get("consumes") || [];
        var responses = this.endpoint.get("responses") || {};
        var operationId = getOperationId(this.endpoint.targetName + "." + this.endpoint.methodClassName);
        var openApiParamsBuilder = new OpenApiParamsBuilder_1.OpenApiParamsBuilder(this.endpoint.target, this.endpoint.methodClassName);
        openApiParamsBuilder
            .build()
            .completeMissingPathParams(openAPIPath);
        if (!this._paths[openAPIPath])
            this._paths[openAPIPath] = {};
        utils_1.deepExtends(responses, openApiParamsBuilder.responses);
        var path = this._paths[openAPIPath];
        var operation = {
            operationId: operationId,
            tags: [this.getTagName()],
            parameters: openApiParamsBuilder.parameters,
            consumes: consumes,
            responses: responses,
            produces: produces
        };
        utils_1.deepExtends(operation, this.endpoint.get("operation") || {});
        path[this.endpoint.httpMethod] = operation;
        responses[this.endpoint.get("statusCode") || "200"] = { description: "Success" };
        Object.keys(responses).forEach(function (code) {
            responses[code] = _this.createResponse(code, responses[code]);
        });
        Object.assign(this._definitions, openApiParamsBuilder.definitions);
        return this;
    };
    /**
     *
     * @returns {string}
     */
    OpenApiEndpointBuilder.prototype.getTagName = function () {
        var clazz = this.endpoint.target;
        var ctrlStore = Store_1.Store.from(clazz);
        var tag = ctrlStore.get("tag");
        var name = ctrlStore.get("name");
        return name || tag && tag.name || this.endpoint.targetName;
    };
    /**
     *
     * @param {string | number} code
     * @param options
     * @returns {Response}
     */
    OpenApiEndpointBuilder.prototype.createResponse = function (code, options) {
        var _a = utils_1.deepExtends(options, this.endpoint.statusResponse(code) || {}), description = _a.description, headers = _a.headers, examples = _a.examples;
        var response = { description: description, headers: headers, examples: examples };
        if (this.endpoint.type === undefined) {
            return response;
        }
        response.schema = this.createSchema(this.endpoint);
        return response;
    };
    Object.defineProperty(OpenApiEndpointBuilder.prototype, "paths", {
        /**
         *
         * @returns {}
         */
        get: function () {
            return this._paths;
        },
        enumerable: true,
        configurable: true
    });
    return OpenApiEndpointBuilder;
}(OpenApiPropertiesBuilder_1.OpenApiPropertiesBuilder));
exports.OpenApiEndpointBuilder = OpenApiEndpointBuilder;
//# sourceMappingURL=OpenApiEndpointBuilder.js.map