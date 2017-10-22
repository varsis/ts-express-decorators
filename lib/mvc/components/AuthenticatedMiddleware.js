"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
/**
 * @module common/mvc
 */
/** */
var Express = require("express");
var ts_httpexceptions_1 = require("ts-httpexceptions");
var ServerSettingsService_1 = require("../../server/services/ServerSettingsService");
var EndpointMetadata_1 = require("../class/EndpointMetadata");
var middleware_1 = require("../decorators/class/middleware");
var endpointInfo_1 = require("../decorators/param/endpointInfo");
var next_1 = require("../decorators/param/next");
var request_1 = require("../decorators/param/request");
var response_1 = require("../decorators/param/response");
/**
 * This middleware manage the authentication.
 * @private
 * @middleware
 */
var AuthenticatedMiddleware = /** @class */ (function () {
    function AuthenticatedMiddleware(serverSettingsService) {
        this.serverSettingsService = serverSettingsService;
    }
    AuthenticatedMiddleware_1 = AuthenticatedMiddleware;
    AuthenticatedMiddleware.prototype.use = function (endpoint, request, response, next) {
        var options = endpoint.get(AuthenticatedMiddleware_1) || {};
        var resolved = false;
        var callback = function (result) {
            if (!resolved) {
                resolved = true;
                if (result === false) {
                    next(new ts_httpexceptions_1.Forbidden("Forbidden"));
                    return;
                }
                next();
            }
        };
        var fn = this.serverSettingsService.authentification;
        /* istanbul ignore else */
        if (fn) {
            try {
                var result = fn(request, response, callback, options);
                /* istanbul ignore else */
                if (result !== undefined) {
                    callback(result);
                }
            }
            catch (er) {
                /* istanbul ignore next */
                console.error(er);
                /* istanbul ignore next */
                next(er);
            }
        }
        else {
            next();
        }
    };
    tslib_1.__decorate([
        tslib_1.__param(0, endpointInfo_1.EndpointInfo()),
        tslib_1.__param(1, request_1.Request()),
        tslib_1.__param(2, response_1.Response()),
        tslib_1.__param(3, next_1.Next()),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [EndpointMetadata_1.EndpointMetadata, Object, Object, Function]),
        tslib_1.__metadata("design:returntype", void 0)
    ], AuthenticatedMiddleware.prototype, "use", null);
    AuthenticatedMiddleware = AuthenticatedMiddleware_1 = tslib_1.__decorate([
        middleware_1.Middleware(),
        tslib_1.__metadata("design:paramtypes", [ServerSettingsService_1.ServerSettingsService])
    ], AuthenticatedMiddleware);
    return AuthenticatedMiddleware;
    var AuthenticatedMiddleware_1;
}());
exports.AuthenticatedMiddleware = AuthenticatedMiddleware;
//# sourceMappingURL=AuthenticatedMiddleware.js.map