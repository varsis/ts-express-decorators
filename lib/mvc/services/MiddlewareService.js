"use strict";
/**
 * @module common/mvc
 */
/** */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ts_log_debug_1 = require("ts-log-debug");
var service_1 = require("../../di/decorators/service");
var InjectorService_1 = require("../../di/services/InjectorService");
var ServerSettingsService_1 = require("../../server/services/ServerSettingsService");
var UnknowMiddlewareError_1 = require("../errors/UnknowMiddlewareError");
var MiddlewareRegistry_1 = require("../registries/MiddlewareRegistry");
/**
 *
 */
var MiddlewareService = /** @class */ (function (_super) {
    tslib_1.__extends(MiddlewareService, _super);
    function MiddlewareService(injectorService, serverSettings) {
        var _this = _super.call(this) || this;
        _this.injectorService = injectorService;
        _this.serverSettings = serverSettings;
        return _this;
    }
    /**
     *
     */
    MiddlewareService.prototype.$onInit = function () {
        /* istanbul ignore next */
        ts_log_debug_1.$log.debug("Build middlewares");
        InjectorService_1.InjectorService.buildRegistry(MiddlewareRegistry_1.MiddlewareRegistry);
    };
    /**
     *
     * @param target
     * @param provider
     */
    MiddlewareService.set = function (target, provider) {
        MiddlewareRegistry_1.MiddlewareRegistry.set(target, provider);
        return this;
    };
    /**
     *
     * @param target
     * @param locals
     * @param designParamTypes
     * @returns {T}
     */
    // static invoke<T extends IMiddleware>(target: Type<T>, locals: Map<Function, any> = new Map<Function, any>(), designParamTypes?: any[]): T {
    //    const provider = MiddlewareRegistry.get(target);
    //    return InjectorService.invoke<T>(provider.useClass);
    // }
    /**
     *
     * @param target
     * @param locals
     * @param designParamTypes
     * @returns {T}
     */
    MiddlewareService.prototype.invoke = function (target, locals, designParamTypes) {
        if (locals === void 0) { locals = new Map(); }
        return this.injectorService.invoke(target, locals, designParamTypes);
    };
    /**
     *
     * @param target
     * @param args
     * @returns {any}
     */
    MiddlewareService.prototype.invokeMethod = function (target) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var provider = this.get(target);
        if (!provider) {
            throw new UnknowMiddlewareError_1.UnknowMiddlewareError(target);
        }
        var instance = provider.instance || this.invoke(provider.useClass);
        return instance.use.apply(instance, args);
    };
    /**
     *
     * @param target
     * @returns {ControllerProvider}
     */
    MiddlewareService.get = function (target) {
        return MiddlewareRegistry_1.MiddlewareRegistry.get(target);
    };
    /**
     *
     * @param target
     */
    MiddlewareService.has = function (target) {
        return MiddlewareRegistry_1.MiddlewareRegistry.has(target);
    };
    MiddlewareService = tslib_1.__decorate([
        service_1.Service(),
        tslib_1.__metadata("design:paramtypes", [InjectorService_1.InjectorService, ServerSettingsService_1.ServerSettingsService])
    ], MiddlewareService);
    return MiddlewareService;
}(MiddlewareRegistry_1.ProxyMiddlewareRegistry));
exports.MiddlewareService = MiddlewareService;
//# sourceMappingURL=MiddlewareService.js.map