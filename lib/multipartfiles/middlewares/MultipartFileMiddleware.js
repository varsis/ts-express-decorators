"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
/**
 * @module multiparfiles
 */
/** */
var ts_log_debug_1 = require("ts-log-debug");
var EndpointMetadata_1 = require("../../mvc/class/EndpointMetadata");
var decorators_1 = require("../../mvc/decorators");
var ServerSettingsService_1 = require("../../server/services/ServerSettingsService");
/**
 * @private
 * @middleware
 */
var MultipartFileMiddleware = /** @class */ (function () {
    function MultipartFileMiddleware(serverSettingsService) {
        this.serverSettingsService = serverSettingsService;
        try {
            /* istanbul ignore else */
            if (require.resolve("multer")) {
                this.multer = require("multer");
            }
        }
        catch (er) {
        }
    }
    MultipartFileMiddleware_1 = MultipartFileMiddleware;
    /**
     *
     * @param endpoint
     * @param request
     * @param response
     * @param next
     * @returns {any}
     */
    MultipartFileMiddleware.prototype.use = function (endpoint, request, response, next) {
        if (this.multer) {
            var options = Object.assign({
                dest: this.serverSettingsService.uploadDir
            }, endpoint.store.get(MultipartFileMiddleware_1) || {});
            var middleware = this.multer(options);
            return middleware.any()(request, response, next);
        }
        else {
            ts_log_debug_1.$log.warn("Multer isn't installed ! Run npm install --save multer before using Multipart decorators.");
        }
    };
    tslib_1.__decorate([
        tslib_1.__param(0, decorators_1.EndpointInfo()),
        tslib_1.__param(1, decorators_1.Req()),
        tslib_1.__param(2, decorators_1.Res()),
        tslib_1.__param(3, decorators_1.Next()),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [EndpointMetadata_1.EndpointMetadata, Object, Object, Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], MultipartFileMiddleware.prototype, "use", null);
    MultipartFileMiddleware = MultipartFileMiddleware_1 = tslib_1.__decorate([
        decorators_1.Middleware(),
        tslib_1.__metadata("design:paramtypes", [ServerSettingsService_1.ServerSettingsService])
    ], MultipartFileMiddleware);
    return MultipartFileMiddleware;
    var MultipartFileMiddleware_1;
}());
exports.MultipartFileMiddleware = MultipartFileMiddleware;
//# sourceMappingURL=MultipartFileMiddleware.js.map