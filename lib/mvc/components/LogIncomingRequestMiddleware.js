"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
/**
 * @module common/mvc
 */
/** */
var Express = require("express");
var ts_log_debug_1 = require("ts-log-debug");
var interfaces_1 = require("../../core/interfaces");
var utils_1 = require("../../core/utils");
var ServerSettingsService_1 = require("../../server/services/ServerSettingsService");
var middleware_1 = require("../decorators/class/middleware");
var request_1 = require("../decorators/param/request");
var response_1 = require("../decorators/param/response");
/**
 * @private
 * @middleware
 */
var LogIncomingRequestMiddleware = /** @class */ (function () {
    function LogIncomingRequestMiddleware(serverSettingsService) {
        this.serverSettingsService = serverSettingsService;
        this.AUTO_INCREMENT_ID = 1;
        this.env = serverSettingsService.env;
    }
    /**
     * Handle the request.
     * @param {e.Request} request
     * @param {e.Response} response
     */
    LogIncomingRequestMiddleware.prototype.use = function (request, response) {
        var _this = this;
        this.configureRequest(request);
        this.onLogStart(request);
        utils_1.applyBefore(response, "end", function () { return _this.onLogEnd(request, response); });
    };
    /**
     * The separate onLogStart() function will allow developer to overwrite the initial request log.
     * @param {e.Request} request
     */
    LogIncomingRequestMiddleware.prototype.onLogStart = function (request) {
        request.log.info();
    };
    /**
     * Attach all informations that will be necessary to log the request. Attach a new `request.log` object.
     * @param request
     */
    LogIncomingRequestMiddleware.prototype.configureRequest = function (request) {
        var _this = this;
        request.id = String(request.id ? request.id : this.AUTO_INCREMENT_ID++);
        request.tagId = "[#" + request.id + "]";
        request.tsedReqStart = new Date();
        request.log = {
            info: function (obj) { return ts_log_debug_1.$log.info(_this.stringify(request)(obj)); },
            debug: function (obj) { return ts_log_debug_1.$log.debug(_this.stringify(request)(obj)); },
            warn: function (obj) { return ts_log_debug_1.$log.warn(_this.stringify(request)(obj)); },
            error: function (obj) { return ts_log_debug_1.$log.error(_this.stringify(request)(obj)); },
            trace: function (obj) { return ts_log_debug_1.$log.trace(_this.stringify(request)(obj)); }
        };
    };
    /**
     * Return a partial request.
     * @param request
     * @returns {Object}
     */
    LogIncomingRequestMiddleware.prototype.requestToObject = function (request) {
        return {
            reqId: request.id,
            method: request.method,
            url: request.originalUrl || request.url,
            duration: this.getDuration(request),
            headers: request.headers,
            body: request.body,
            query: request.query,
            params: request.params
        };
    };
    /**
     * Return the duration between the time when LogIncomingRequest has handle the request and now.
     * @param request
     * @returns {number}
     */
    LogIncomingRequestMiddleware.prototype.getDuration = function (request) {
        return new Date().getTime() - request.tsedReqStart.getTime();
    };
    /**
     * Stringify a request to JSON.
     * @param request
     * @returns {(scope: any) => string}
     */
    LogIncomingRequestMiddleware.prototype.stringify = function (request) {
        var _this = this;
        return function (scope) {
            if (scope === void 0) { scope = {}; }
            scope = Object.assign(scope, _this.requestToObject(request));
            if (_this.env !== interfaces_1.EnvTypes.PROD) {
                return JSON.stringify(scope, null, 2);
            }
            return JSON.stringify(scope);
        };
    };
    /**
     * Called when the `request.end()` is called by Express.
     * @param request
     * @param response
     */
    LogIncomingRequestMiddleware.prototype.onLogEnd = function (request, response) {
        /* istanbul ignore else */
        if (request.id) {
            var status_1 = response._header
                ? response.statusCode
                : undefined;
            request.log.debug({ status: status_1, data: request.getStoredData && request.getStoredData() });
            this.cleanRequest(request);
        }
    };
    /**
     * Remove all data that added with `LogIncomingRequest.configureRequest()`.
     * @param request
     */
    LogIncomingRequestMiddleware.prototype.cleanRequest = function (request) {
        delete request.id;
        delete request.tagId;
        delete request.tsedReqStart;
        request.log = {
            info: function () {
            },
            debug: function () {
            },
            warn: function () {
            },
            error: function () {
            },
            trace: function () {
            }
        };
    };
    tslib_1.__decorate([
        tslib_1.__param(0, request_1.Req()), tslib_1.__param(1, response_1.Res()),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], LogIncomingRequestMiddleware.prototype, "use", null);
    LogIncomingRequestMiddleware = tslib_1.__decorate([
        middleware_1.Middleware(),
        tslib_1.__metadata("design:paramtypes", [ServerSettingsService_1.ServerSettingsService])
    ], LogIncomingRequestMiddleware);
    return LogIncomingRequestMiddleware;
}());
exports.LogIncomingRequestMiddleware = LogIncomingRequestMiddleware;
//# sourceMappingURL=LogIncomingRequestMiddleware.js.map
