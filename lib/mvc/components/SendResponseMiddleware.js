"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
/**
 * @module common/mvc
 */
/** */
var Express = require("express");
var ConverterService_1 = require("../../converters/services/ConverterService");
var middleware_1 = require("../decorators/class/middleware");
var response_1 = require("../decorators/param/response");
var responseData_1 = require("../decorators/param/responseData");
/**
 * @private
 * @middleware
 */
var SendResponseMiddleware = /** @class */ (function () {
    function SendResponseMiddleware(converterService) {
        this.converterService = converterService;
    }
    SendResponseMiddleware.prototype.use = function (data, response) {
        var type = typeof data;
        if (data !== undefined) {
            if (data === null || ["number", "boolean", "string"].indexOf(type) > -1) {
                response.send(String(data));
            }
            else {
                response.json(this.converterService.serialize(data));
            }
        }
    };
    tslib_1.__decorate([
        tslib_1.__param(0, responseData_1.ResponseData()), tslib_1.__param(1, response_1.Response()),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], SendResponseMiddleware.prototype, "use", null);
    SendResponseMiddleware = tslib_1.__decorate([
        middleware_1.Middleware(),
        tslib_1.__metadata("design:paramtypes", [ConverterService_1.ConverterService])
    ], SendResponseMiddleware);
    return SendResponseMiddleware;
}());
exports.SendResponseMiddleware = SendResponseMiddleware;
//# sourceMappingURL=SendResponseMiddleware.js.map