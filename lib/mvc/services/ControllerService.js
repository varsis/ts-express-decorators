"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
/**
 * @module common/mvc
 */
/** */
var Express = require("express");
var ts_log_debug_1 = require("ts-log-debug");
var ExpressApplication_1 = require("../../core/services/ExpressApplication");
var di_1 = require("../../di");
var service_1 = require("../../di/decorators/service");
var InjectorService_1 = require("../../di/services/InjectorService");
var ServerSettingsService_1 = require("../../server/services/ServerSettingsService");
var ControllerBuilder_1 = require("../class/ControllerBuilder");
var ControllerRegistry_1 = require("../registries/ControllerRegistry");
var RouterController_1 = require("./RouterController");
/**
 * ControllerService manage all controllers declared with `@ControllerProvider` decorators.
 */
var ControllerService = /** @class */ (function (_super) {
    tslib_1.__extends(ControllerService, _super);
    /**
     *
     * @param expressApplication
     * @param injectorService
     * @param serverSettings
     */
    function ControllerService(injectorService, expressApplication, serverSettings) {
        var _this = _super.call(this) || this;
        _this.injectorService = injectorService;
        _this.expressApplication = expressApplication;
        _this.serverSettings = serverSettings;
        return _this;
    }
    /**
     *
     * @param target
     * @returns {ControllerProvider}
     */
    ControllerService.get = function (target) {
        return ControllerRegistry_1.ControllerRegistry.get(target);
    };
    /**
     *
     * @param target
     */
    ControllerService.has = function (target) {
        return ControllerRegistry_1.ControllerRegistry.has(target);
    };
    /**
     *
     * @param target
     * @param provider
     */
    ControllerService.set = function (target, provider) {
        ControllerRegistry_1.ControllerRegistry.set(target, provider);
        return this;
    };
    /**
     *
     * @param components
     */
    ControllerService.prototype.$onControllersInit = function (components) {
        ts_log_debug_1.$log.info("Build controllers");
        this.mapComponents(components);
        this.buildControllers();
    };
    /**
     *
     * @param components
     */
    ControllerService.prototype.$onRoutesInit = function (components) {
        ts_log_debug_1.$log.info("Init Routes");
        this.mountPaths();
    };
    /**
     *
     * @param components
     */
    ControllerService.prototype.mapComponents = function (components) {
        components.forEach(function (component) {
            Object.keys(component.classes)
                .map(function (clazzName) { return component.classes[clazzName]; })
                .filter(function (clazz) { return ControllerRegistry_1.ControllerRegistry.has(clazz); })
                .map(function (clazz) {
                return ControllerRegistry_1.ControllerRegistry.get(clazz).pushRouterPath(component.endpoint);
            });
        });
    };
    /**
     * Invoke a controller from his Class.
     * @param target
     * @param locals
     * @param designParamTypes
     * @returns {T}
     */
    ControllerService.prototype.invoke = function (target, locals, designParamTypes) {
        if (locals === void 0) { locals = new Map(); }
        if (!locals.has(RouterController_1.RouterController)) {
            locals.set(RouterController_1.RouterController, new RouterController_1.RouterController(Express.Router()));
        }
        return this.injectorService.invoke(target.provide || target, locals, designParamTypes);
    };
    /**
     * Build all controllers and mount routes to the ExpressApplication.
     */
    ControllerService.prototype.buildControllers = function () {
        var _this = this;
        var defaultRoutersOptions = this.serverSettings.routers;
        ControllerRegistry_1.ControllerRegistry.forEach(function (provider) {
            if (!provider.hasParent()) {
                new ControllerBuilder_1.ControllerBuilder(provider, defaultRoutersOptions).build();
            }
            var target = provider.useClass;
            if (!provider.scope && provider.instance === undefined) {
                provider.instance = _this.invoke(target);
            }
        });
        return this;
    };
    ControllerService.prototype.mountPaths = function () {
        var _this = this;
        ControllerRegistry_1.ControllerRegistry.forEach(function (provider) {
            if (!provider.hasParent()) {
                provider.routerPaths.forEach(function (path) {
                    _this.expressApplication.use(provider.getEndpointUrl(path), provider.router);
                });
            }
        });
    };
    ControllerService = tslib_1.__decorate([
        service_1.Service(),
        tslib_1.__param(1, di_1.Inject(ExpressApplication_1.ExpressApplication)),
        tslib_1.__metadata("design:paramtypes", [InjectorService_1.InjectorService, Function, ServerSettingsService_1.ServerSettingsService])
    ], ControllerService);
    return ControllerService;
}(ControllerRegistry_1.ProxyControllerRegistry));
exports.ControllerService = ControllerService;
//# sourceMappingURL=ControllerService.js.map