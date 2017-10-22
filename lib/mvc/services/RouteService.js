"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ts_log_debug_1 = require("ts-log-debug");
var colorizeUtils_1 = require("ts-log-debug/lib/layouts/utils/colorizeUtils");
var utils_1 = require("../../core/utils");
/**
 * @module common/mvc
 */
/** */
var service_1 = require("../../di/decorators/service");
var ParamRegistry_1 = require("../registries/ParamRegistry");
var ControllerService_1 = require("./ControllerService");
/**
 * `RouteService` is used to provide all routes collected by annotation `@ControllerProvider`.
 */
var RouteService = /** @class */ (function () {
    function RouteService(controllerService) {
        var _this = this;
        this.controllerService = controllerService;
        /**
         * Sort controllers infos.
         * @param routeA
         * @param routeB
         * @returns {number}
         */
        this.sort = function (routeA, routeB) {
            /* istanbul ignore next */
            if (routeA.url > routeB.url) {
                return 1;
            }
            /* istanbul ignore next */
            if (routeA.url < routeB.url) {
                return -1;
            }
            /* istanbul ignore next */
            return 0;
        };
        /**
         *
         * @param routes
         * @param ctrl
         * @param endpointUrl
         */
        this.buildRoutes = function (routes, ctrl, endpointUrl) {
            // console.log("Build routes =>", ctrl.className, endpointUrl);
            ctrl.dependencies
                .map(function (ctrl) { return _this.controllerService.get(ctrl); })
                .forEach(function (provider) {
                return _this.buildRoutes(routes, provider, "" + endpointUrl + provider.path);
            });
            ctrl.endpoints.forEach(function (endpoint) {
                if (endpoint.hasHttpMethod()) {
                    var className = utils_1.nameOf(ctrl.provide), methodClassName = endpoint.methodClassName, parameters = ParamRegistry_1.ParamRegistry.getParams(ctrl.provide, endpoint.methodClassName);
                    routes.push({
                        method: endpoint.httpMethod,
                        name: className + "." + methodClassName + "()",
                        url: "" + endpointUrl + (endpoint.path || ""),
                        className: className,
                        methodClassName: methodClassName,
                        parameters: parameters
                    });
                }
            });
        };
    }
    RouteService.prototype.$afterRoutesInit = function () {
        ts_log_debug_1.$log.info("Routes mounted :");
        this.printRoutes(ts_log_debug_1.$log);
    };
    /**
     * Get all routes builded by TsExpressDecorators and mounted on Express application.
     * @returns {IControllerRoute[]}
     */
    RouteService.prototype.getRoutes = function () {
        var _this = this;
        var routes = [];
        this.controllerService.forEach(function (provider) {
            if (!provider.hasParent()) {
                provider.routerPaths.forEach(function (path) {
                    _this.buildRoutes(routes, provider, provider.getEndpointUrl(path));
                });
            }
        });
        // ControllerService
        //     .controllers
        //     .forEach((finalCtrl: ControllerProvider) => {
        //         if (!finalCtrl.parent) {
        //             finalCtrl
        //                 .getMountEndpoints()
        //                 .map(endpoint => finalCtrl.getEndpointUrl(endpoint))
        //                 .forEach(endpoint => buildRoutes(finalCtrl, endpoint));
        //         }
        //     });
        // Sorts routes befores prints
        // routes = routes.sort(this.sort);
        return routes;
    };
    /**
     * Print all route mounted in express via Annotation.
     */
    RouteService.prototype.printRoutes = function (logger) {
        if (logger === void 0) { logger = ts_log_debug_1.$log; }
        var mapColor = {
            GET: "green",
            POST: "yellow",
            PUT: "blue",
            DELETE: "red",
            PATCH: "magenta",
            ALL: "cyan"
        };
        var routes = this
            .getRoutes()
            .map(function (route) {
            var method = route.method.toUpperCase();
            route.method = {
                length: method.length, toString: function () {
                    return colorizeUtils_1.colorize(method, mapColor[method]);
                }
            };
            return route;
        });
        var str = ts_log_debug_1.$log.drawTable(routes, {
            padding: 1,
            header: {
                method: "Method",
                url: "Endpoint",
                name: "Class method"
            }
        });
        logger.info("\n" + str.trim());
    };
    /**
     * Return all Routes stored in ControllerProvider manager.
     * @returns {IControllerRoute[]}
     */
    RouteService.prototype.getAll = function () {
        return this.getRoutes();
    };
    RouteService = tslib_1.__decorate([
        service_1.Service(),
        tslib_1.__metadata("design:paramtypes", [ControllerService_1.ControllerService])
    ], RouteService);
    return RouteService;
}());
exports.RouteService = RouteService;
//# sourceMappingURL=RouteService.js.map