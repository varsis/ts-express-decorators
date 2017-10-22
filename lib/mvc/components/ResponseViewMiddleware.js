"use strict";
/**
 * @module common/mvc
 */ /** */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Express = require("express");
var EndpointMetadata_1 = require("../class/EndpointMetadata");
var middleware_1 = require("../decorators/class/middleware");
var endpointInfo_1 = require("../decorators/param/endpointInfo");
var response_1 = require("../decorators/param/response");
var responseData_1 = require("../decorators/param/responseData");
var TemplateRenderingError_1 = require("../errors/TemplateRenderingError");
/**
 * @private
 * @middleware
 */
var ResponseViewMiddleware = /** @class */ (function () {
    function ResponseViewMiddleware() {
    }
    ResponseViewMiddleware_1 = ResponseViewMiddleware;
    ResponseViewMiddleware.prototype.use = function (data, endpoint, response) {
        return new Promise(function (resolve, reject) {
            var _a = endpoint.store.get(ResponseViewMiddleware_1), viewPath = _a.viewPath, viewOptions = _a.viewOptions;
            if (viewPath !== undefined) {
                if (viewOptions !== undefined) {
                    data = Object.assign({}, data, viewOptions);
                }
                response.render(viewPath, data, function (err, html) {
                    /* istanbul ignore next */
                    if (err) {
                        reject(new TemplateRenderingError_1.TemplateRenderingError(endpoint.target, endpoint.methodClassName, err));
                    }
                    else {
                        // request.storeData(html);
                        resolve(html);
                    }
                });
            }
            else {
                resolve();
            }
        });
    };
    tslib_1.__decorate([
        tslib_1.__param(0, responseData_1.ResponseData()),
        tslib_1.__param(1, endpointInfo_1.EndpointInfo()),
        tslib_1.__param(2, response_1.Response()),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, EndpointMetadata_1.EndpointMetadata, Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], ResponseViewMiddleware.prototype, "use", null);
    ResponseViewMiddleware = ResponseViewMiddleware_1 = tslib_1.__decorate([
        middleware_1.Middleware()
    ], ResponseViewMiddleware);
    return ResponseViewMiddleware;
    var ResponseViewMiddleware_1;
}());
exports.ResponseViewMiddleware = ResponseViewMiddleware;
//# sourceMappingURL=ResponseViewMiddleware.js.map