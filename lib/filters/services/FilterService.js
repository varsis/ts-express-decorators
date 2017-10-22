"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
/**
 * @module common/filters
 */
/** */
var ts_log_debug_1 = require("ts-log-debug");
var service_1 = require("../../di/decorators/service");
var InjectorService_1 = require("../../di/services/InjectorService");
var UnknowFilterError_1 = require("../errors/UnknowFilterError");
var FilterRegistry_1 = require("../registries/FilterRegistry");
/**
 * @beta
 */
var FilterService = /** @class */ (function (_super) {
    tslib_1.__extends(FilterService, _super);
    function FilterService(injectorService) {
        var _this = _super.call(this) || this;
        _this.injectorService = injectorService;
        return _this;
    }
    /**
     *
     */
    FilterService.prototype.$onInit = function () {
        /* istanbul ignore next */
        ts_log_debug_1.$log.debug("Build filters");
        InjectorService_1.InjectorService.buildRegistry(FilterRegistry_1.FilterRegistry);
    };
    /**
     *
     * @param target
     * @param provider
     */
    FilterService.set = function (target, provider) {
        FilterRegistry_1.FilterRegistry.set(target, provider);
        return this;
    };
    /**
     *
     * @param target
     * @param locals
     * @param designParamTypes
     * @returns {T}
     */
    FilterService.prototype.invoke = function (target, locals, designParamTypes) {
        if (locals === void 0) { locals = new Map(); }
        return this.injectorService.invoke(target, locals, designParamTypes);
    };
    /**
     *
     * @param target
     * @param args
     * @returns {any}
     */
    FilterService.prototype.invokeMethod = function (target) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!this.has(target)) {
            throw new UnknowFilterError_1.UnknowFilterError(target);
        }
        var provider = this.get(target);
        /* istanbul ignore next */
        if (!provider) {
            throw new Error("Target component not found in the registry");
        }
        var instance = provider.instance || this.invoke(provider.useClass);
        return instance.transform.apply(instance, args);
    };
    /**
     *
     * @param target
     * @returns {ControllerProvider}
     */
    FilterService.get = function (target) {
        return FilterRegistry_1.FilterRegistry.get(target);
    };
    /**
     *
     * @param target
     */
    FilterService.has = function (target) {
        return FilterRegistry_1.FilterRegistry.has(target);
    };
    FilterService = tslib_1.__decorate([
        service_1.Service(),
        tslib_1.__metadata("design:paramtypes", [InjectorService_1.InjectorService])
    ], FilterService);
    return FilterService;
}(FilterRegistry_1.ProxyFilterRegistry));
exports.FilterService = FilterService;
//# sourceMappingURL=FilterService.js.map