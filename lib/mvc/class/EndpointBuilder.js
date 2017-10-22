"use strict";
/**
 * @module common/mvc
 */
/** */
Object.defineProperty(exports, "__esModule", { value: true });
var ts_log_debug_1 = require("ts-log-debug");
var utils_1 = require("../../core/utils");
var SendResponseMiddleware_1 = require("../components/SendResponseMiddleware");
var HandlerBuilder_1 = require("./HandlerBuilder");
/**
 *
 */
var EndpointBuilder = /** @class */ (function () {
    function EndpointBuilder(endpoint, router) {
        var _this = this;
        this.endpoint = endpoint;
        this.router = router;
        /**
         *
         */
        this.onRequest = function () {
            return function (request, response, next) {
                /* istanbul ignore else */
                if (request.id) {
                    ts_log_debug_1.$log.debug(request.tagId, "Endpoint =>", JSON.stringify({
                        target: utils_1.nameOf(_this.endpoint.target),
                        methodClass: _this.endpoint.methodClassName,
                        httpMethod: _this.endpoint.httpMethod
                    }));
                }
                request.getEndpoint = function () { return _this.endpoint; };
                request.storeData = function (data) {
                    this._responseData = data;
                    return this;
                };
                request.getStoredData = function () {
                    return this._responseData;
                };
                next();
            };
        };
    }
    /**
     *
     * @param middlewares
     */
    EndpointBuilder.prototype.routeMiddlewares = function (middlewares) {
        if (this.endpoint.hasHttpMethod() && this.router[this.endpoint.httpMethod]) {
            (_a = this.router)[this.endpoint.httpMethod].apply(_a, [this.endpoint.path].concat(middlewares));
        }
        else {
            var args = [this.endpoint.path].concat(middlewares).filter(function (o) { return !!o; });
            (_b = this.router).use.apply(_b, args);
        }
        var _a, _b;
    };
    /**
     *
     * @returns {any[]}
     * @param invokable
     */
    EndpointBuilder.prototype.build = function () {
        var endpoint = this.endpoint;
        var middlewares = []
            .concat(endpoint.beforeMiddlewares)
            .concat(endpoint.middlewares)
            .concat([endpoint])
            .concat(endpoint.afterMiddlewares)
            .concat(SendResponseMiddleware_1.SendResponseMiddleware)
            .filter(function (item) { return (!!item); })
            .map(function (middleware) { return HandlerBuilder_1.HandlerBuilder.from(middleware).build(); });
        middlewares = [this.onRequest()].concat(middlewares);
        this.routeMiddlewares(middlewares);
        return middlewares;
    };
    return EndpointBuilder;
}());
exports.EndpointBuilder = EndpointBuilder;
//# sourceMappingURL=EndpointBuilder.js.map