"use strict";
/**
 * @module common/mvc
 */
/** */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Express = require("express");
var ts_httpexceptions_1 = require("ts-httpexceptions");
var ts_log_debug_1 = require("ts-log-debug");
var middlewareError_1 = require("../decorators/class/middlewareError");
var error_1 = require("../decorators/param/error");
var request_1 = require("../decorators/param/request");
var response_1 = require("../decorators/param/response");
/**
 * @middleware
 */
var GlobalErrorHandlerMiddleware = /** @class */ (function () {
    function GlobalErrorHandlerMiddleware() {
    }
    GlobalErrorHandlerMiddleware.prototype.use = function (error, request, response) {
        var toHTML = function (message) {
            if (message === void 0) { message = ""; }
            return message.replace(/\n/gi, "<br />");
        };
        if (error instanceof ts_httpexceptions_1.Exception || error.status) {
            ts_log_debug_1.$log.error("" + error);
            response.status(error.status).send(toHTML(error.message));
            return;
        }
        if (typeof error === "string") {
            response.status(404).send(toHTML(error));
            return;
        }
        ts_log_debug_1.$log.error(error);
        response.status(error.status || 500).send("Internal Error");
        return;
    };
    tslib_1.__decorate([
        tslib_1.__param(0, error_1.Err()),
        tslib_1.__param(1, request_1.Request()),
        tslib_1.__param(2, response_1.Response()),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, Object, Object]),
        tslib_1.__metadata("design:returntype", Object)
    ], GlobalErrorHandlerMiddleware.prototype, "use", null);
    GlobalErrorHandlerMiddleware = tslib_1.__decorate([
        middlewareError_1.MiddlewareError()
    ], GlobalErrorHandlerMiddleware);
    return GlobalErrorHandlerMiddleware;
}());
exports.GlobalErrorHandlerMiddleware = GlobalErrorHandlerMiddleware;
//# sourceMappingURL=GlobalErrorHandlerMiddleware.js.map