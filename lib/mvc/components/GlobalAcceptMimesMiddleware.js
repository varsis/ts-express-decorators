"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
/**
 * @module common/mvc
 */
/** */
var ts_httpexceptions_1 = require("ts-httpexceptions");
var ServerSettingsService_1 = require("../../server/services/ServerSettingsService");
var middleware_1 = require("../decorators/class/middleware");
var request_1 = require("../decorators/param/request");
/**
 * @middleware
 */
var GlobalAcceptMimesMiddleware = /** @class */ (function () {
    function GlobalAcceptMimesMiddleware(serverSettingsService) {
        this.serverSettingsService = serverSettingsService;
    }
    GlobalAcceptMimesMiddleware.prototype.use = function (request) {
        this.serverSettingsService
            .acceptMimes
            .forEach(function (mime) {
            if (!request.accepts(mime)) {
                throw new ts_httpexceptions_1.NotAcceptable(mime);
            }
        });
    };
    tslib_1.__decorate([
        tslib_1.__param(0, request_1.Request()),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], GlobalAcceptMimesMiddleware.prototype, "use", null);
    GlobalAcceptMimesMiddleware = tslib_1.__decorate([
        middleware_1.Middleware(),
        tslib_1.__metadata("design:paramtypes", [ServerSettingsService_1.ServerSettingsService])
    ], GlobalAcceptMimesMiddleware);
    return GlobalAcceptMimesMiddleware;
}());
exports.GlobalAcceptMimesMiddleware = GlobalAcceptMimesMiddleware;
//# sourceMappingURL=GlobalAcceptMimesMiddleware.js.map