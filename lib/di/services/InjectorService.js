"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
/**
 * @module common/di
 */
/** */
var ts_log_debug_1 = require("ts-log-debug");
var core_1 = require("../../core");
var Metadata_1 = require("../../core/class/Metadata");
var InjectionError_1 = require("../errors/InjectionError");
var ProviderRegistry_1 = require("../registries/ProviderRegistry");
/**
 * This service contain all services collected by `@Service` or services declared manually with `InjectorService.factory()` or `InjectorService.service()`.
 *
 * ### Example:
 *
 * ```typescript
 * import {InjectorService} from "ts-express-decorators";
 *
 * // Import the services (all services are decorated with @Service()";
 * import MyService1 from "./services/service1";
 * import MyService2 from "./services/service2";
 * import MyService3 from "./services/service3";
 *
 * // When all services is imported you can load InjectorService.
 * InjectorService.load();
 *
 * const myService1 = InjectorService.get<MyService1>(MyServcice1);
 * ```
 *
 * > Note: `ServerLoader` make this automatically when you use `ServerLoader.mount()` method (or settings attributes) and load services and controllers during the starting server.
 *
 */
var InjectorService = /** @class */ (function (_super) {
    tslib_1.__extends(InjectorService, _super);
    function InjectorService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Invoke the class and inject all services that required by the class constructor.
     *
     * #### Example
     *
     * ```typescript
     * import {InjectorService} from "ts-express-decorators";
     * import MyService from "./services";
     *
     * class OtherService {
     *     constructor(injectorService: InjectorService) {
     *          const myService = injectorService.invoke<MyService>(MyService);
     *      }
     *  }
     * ```
     *
     * @param target The injectable class to invoke. Class parameters are injected according constructor signature.
     * @param locals  Optional object. If preset then any argument Class are read from this object first, before the `InjectorService` is consulted.
     * @param designParamTypes Optional object. List of injectable types.
     * @returns {T} The class constructed.
     */
    InjectorService.prototype.invoke = function (target, locals, designParamTypes) {
        if (locals === void 0) { locals = new Map(); }
        return InjectorService.invoke(target, locals, designParamTypes);
    };
    /**
     * Invoke a class method and inject service.
     *
     * #### IInjectableMethod options
     *
     * * **target**: Optional. The class instance.
     * * **methodName**: `string` Optional. The method name.
     * * **designParamTypes**: `any[]` Optional. List of injectable types.
     * * **locals**: `Map<Function, any>` Optional. If preset then any argument Class are read from this object first, before the `InjectorService` is consulted.
     *
     * #### Example
     *
     * ```typescript
     * import {InjectorService} from "ts-express-decorators";
     *
     * class MyService {
     *      constructor(injectorService: InjectorService) {
     *          injectorService.invokeMethod(this.method, {
     *              this,
     *              methodName: 'method'
     *          });
     *      }
     *
     *   method(otherService: OtherService) {}
     * }
     * ```
     *
     * @returns {any}
     * @param handler The injectable method to invoke. Method parameters are injected according method signature.
     * @param options Object to configure the invocation.
     */
    InjectorService.prototype.invokeMethod = function (handler, options) {
        return InjectorService.invokeMethod(handler, options);
    };
    /**
     * Invoke a class method and inject service.
     *
     * #### IInjectableMethod options
     *
     * * **target**: Optional. The class instance.
     * * **methodName**: `string` Optional. The method name.
     * * **designParamTypes**: `any[]` Optional. List of injectable types.
     * * **locals**: `Map<Function, any>` Optional. If preset then any argument Class are read from this object first, before the `InjectorService` is consulted.
     *
     * #### Example
     *
     * ```typescript
     * import {InjectorService} from "ts-express-decorators";
     *
     * class MyService {
     *      constructor(injectorService: InjectorService) {
     *          injectorService.invokeMethod(this.method, {
     *              this,
     *              methodName: 'method'
     *          });
     *      }
     *
     *   method(otherService: OtherService) {}
     * }
     * ```
     *
     * @returns {any}
     * @param handler The injectable method to invoke. Method parameters are injected according method signature.
     * @param options Object to configure the invocation.
     */
    InjectorService.invokeMethod = function (handler, options) {
        var _this = this;
        var designParamTypes, target, methodName;
        var locals = new Map();
        if (options instanceof Array) {
            designParamTypes = options;
        }
        else {
            designParamTypes = options.designParamTypes;
            target = options.target;
            methodName = options.methodName;
            if (options.locals) {
                locals = options.locals;
            }
        }
        /* istanbul ignore next */
        if (locals instanceof Map === false) {
            locals = new Map();
        }
        if (handler.$injected) {
            return handler.call(target, locals);
        }
        if (!designParamTypes) {
            designParamTypes = Metadata_1.Metadata.getParamTypes(target, methodName);
        }
        var services = designParamTypes
            .map(function (serviceType) {
            var serviceName = typeof serviceType === "function" ? core_1.nameOf(serviceType) : serviceType;
            /* istanbul ignore next */
            if (locals.has(serviceName)) {
                return locals.get(serviceName);
            }
            if (locals.has(serviceType)) {
                return locals.get(serviceType);
            }
            /* istanbul ignore next */
            if (!_this.has(serviceType)) {
                return undefined;
            }
            return _this.get(serviceType);
        });
        return handler.apply(void 0, services);
    };
    /**
     * Initialize injectorService and load all services/factories.
     */
    InjectorService.prototype.load = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, InjectorService.load()];
            });
        });
    };
    /**
     * Invoke the class and inject all services that required by the class constructor.
     *
     * #### Example
     *
     * ```typescript
     * import {InjectorService} from "ts-express-decorators";
     * import MyService from "./services";
     *
     * class OtherService {
     *     constructor(injectorService: InjectorService) {
     *          const myService = injectorService.invoke<MyService>(MyService);
     *      }
     *  }
     * ```
     *
     * @param target The injectable class to invoke. Class parameters are injected according constructor signature.
     * @param locals  Optional object. If preset then any argument Class are read from this object first, before the `InjectorService` is consulted.
     * @param designParamTypes Optional object. List of injectable types.
     * @returns {T} The class constructed.
     */
    InjectorService.invoke = function (target, locals, designParamTypes) {
        var _this = this;
        if (locals === void 0) { locals = new Map(); }
        if (!designParamTypes) {
            designParamTypes = Metadata_1.Metadata.getParamTypes(target);
        }
        var services = designParamTypes
            .map(function (serviceType) {
            var serviceName = typeof serviceType === "function" ? core_1.nameOf(serviceType) : serviceType;
            /* istanbul ignore next */
            if (locals.has(serviceName)) {
                return locals.get(serviceName);
            }
            if (locals.has(serviceType)) {
                return locals.get(serviceType);
            }
            /* istanbul ignore next */
            if (!_this.has(serviceType)) {
                throw new InjectionError_1.InjectionError(target, serviceName.toString());
            }
            return _this.get(serviceType);
        });
        return new (target.bind.apply(target, [void 0].concat(services)))();
    };
    /**
     * Construct the service with his dependencies.
     * @param target The service to be built.
     */
    InjectorService.construct = function (target) {
        var provider = ProviderRegistry_1.ProviderRegistry.get(target);
        /* istanbul ignore else */
        return this.invoke(provider.useClass);
    };
    /**
     * Emit an event to all service. See service [lifecycle hooks](docs/services/lifecycle-hooks.md).
     * @param eventName The event name to emit at all services.
     * @param args List of the parameters to give to each services.
     * @returns {Promise<any[]>} A list of promises.
     */
    InjectorService.emit = function (eventName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var promises;
            return tslib_1.__generator(this, function (_a) {
                promises = [];
                ProviderRegistry_1.ProviderRegistry.forEach(function (provider) {
                    var service = InjectorService.get(provider.provide);
                    if (eventName in service) {
                        /* istanbul ignore next */
                        if (eventName === "$onInjectorReady") {
                            ts_log_debug_1.$log.warn("$onInjectorReady hook is deprecated, use $onInit hook insteadof. See https://goo.gl/KhvkVy");
                        }
                        promises.push(service[eventName].apply(service, args));
                    }
                });
                return [2 /*return*/, Promise.all(promises)];
            });
        });
    };
    /**
     * @hidden
     * @param registry
     * @param callback
     */
    InjectorService.buildRegistry = function (registry, callback) {
        if (callback === void 0) { callback = function () { return true; }; }
        registry.forEach(function (provider) {
            if (typeof callback && callback(provider)) {
                provider.instance = InjectorService.invoke(provider.useClass);
            }
            var token = core_1.nameOf(provider.provide);
            var useClass = core_1.nameOf(provider.useClass);
            ts_log_debug_1.$log.debug(core_1.nameOf(provider.provide), "built", token === useClass ? "" : "from class " + useClass);
        });
        return registry;
    };
    /**
     * Set a new provider from providerSetting.
     * @param provider provide token.
     * @param instance Instance
     */
    InjectorService.set = function (provider, instance) {
        var target;
        if (provider["provide"] === undefined) {
            target = provider;
            provider = {
                provide: target,
                useClass: target,
                instance: instance || target,
                type: "factory"
            };
        }
        else {
            target = provider.provide;
        }
        ProviderRegistry_1.ProviderRegistry.merge(provider.provide, provider);
        return InjectorService;
    };
    /**
     * Get a service or factory already constructed from his symbol or class.
     *
     * #### Example
     *
     * ```typescript
     * import {InjectorService} from "ts-express-decorators";
     * import MyService from "./services";
     *
     * class OtherService {
     *      constructor(injectorService: InjectorService) {
     *          const myService = injectorService.get<MyService>(MyService);
     *      }
     * }
     * ```
     *
     * @param target The class or symbol registered in InjectorService.
     * @returns {boolean}
     */
    InjectorService.prototype.get = function (target) {
        return _super.prototype.get.call(this, target).instance;
    };
    /**
     * Initialize injectorService and load all services/factories.
     */
    InjectorService.load = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.buildRegistry(ProviderRegistry_1.ProviderRegistry, function (provider) { return provider.instance === undefined || provider.type === "service"; });
                return [2 /*return*/, Promise.all([
                        this.emit("$onInit"),
                        this.emit("$onInjectorReady") // deprecated
                    ])];
            });
        });
    };
    /**
     * Emit an event to all service. See service [lifecycle hooks](docs/services/lifecycle-hooks.md).
     * @param eventName The event name to emit at all services.
     * @param args List of the parameters to give to each services.
     * @returns {Promise<any[]>} A list of promises.
     */
    InjectorService.prototype.emit = function (eventName) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return InjectorService.emit.apply(InjectorService, [eventName].concat(args));
    };
    /**
     * Get a service or factory already constructed from his symbol or class.
     *
     * #### Example
     *
     * ```typescript
     * import {InjectorService} from "ts-express-decorators";
     * import MyService from "./services";
     *
     * class OtherService {
     *      constructor(injectorService: InjectorService) {
     *          const myService = injectorService.get<MyService>(MyService);
     *      }
     * }
     * ```
     *
     * @param target The class or symbol registered in InjectorService.
     * @returns {boolean}
     */
    InjectorService.get = function (target) {
        return ProviderRegistry_1.ProviderRegistry.get(target).instance;
    };
    /**
     * Check if the service of factory exists in `InjectorService`.
     *
     * #### Example
     *
     * ```typescript
     *      import {InjectorService} from "ts-express-decorators";
     *      import MyService from "./services";
     *
     *      class OtherService {
     *    constructor(injectorService: InjectorService) {
     *
     *       const exists = injectorService.has(MyService); // true or false
     *
     *    }
     * }
     * ```
     *
     * @param target The service class
     * @returns {boolean}
     */
    InjectorService.has = function (target) {
        return ProviderRegistry_1.ProviderRegistry.has(target);
    };
    /**
     * Add a new service in the registry. This service will be constructed when `InjectorService` will loaded.
     *
     * #### Example
     *
     * ```typescript
     * import {InjectorService} from "ts-express-decorators";
     *
     * export default class MyFooService {
     *     constructor(){}
     *     getFoo() {
     *         return "test";
     *     }
     * }
     *
     * InjectorService.service(MyFooService);
     * InjectorService.load();
     *
     * const myFooService = InjectorService.get<MyFooService>(MyFooService);
     * myFooService.getFoo(); // test
     * ```
     *
     * @param target The class to add in registry.
     */
    InjectorService.service = function (target) {
        return InjectorService.set({ provide: target, useClass: target, type: "service" });
    };
    /**
     * Add a new factory in `InjectorService` registry.
     *
     * #### Example with symbol definition
     *
     * ```typescript
     * import {InjectorService} from "ts-express-decorators";
     *
     * export interface IMyFooFactory {
     *    getFoo(): string;
     * }
     *
     * export type MyFooFactory = IMyFooFactory;
     * export const MyFooFactory = Symbol("MyFooFactory");
     *
     * InjectorService.factory(MyFooFactory, {
     *      getFoo:  () => "test"
     * });
     *
     * @Service()
     * export class OtherService {
     *      constructor(@Inject(MyFooFactory) myFooFactory: MyFooFactory){
     *          console.log(myFooFactory.getFoo()); /// "test"
     *      }
     * }
     * ```
     *
     * > Note: When you use the factory method with Symbol definition, you must use the `@Inject()` decorator to retrieve your factory in another Service. Advice: By convention all factory class name will be prefixed by `Factory`.
     *
     * #### Example with class
     * ```typescript
     * import {InjectorService} from "ts-express-decorators";
     *
     * export class MyFooService {
     *  constructor(){}
     *      getFoo() {
     *          return "test";
     *      }
     * }
     *
     * InjectorService.factory(MyFooService, new MyFooService());
     *
     * @Service()
     * export class OtherService {
     *      constructor(myFooService: MyFooService){
     *          console.log(myFooFactory.getFoo()); /// "test"
     *      }
     * }
     * ```
     *
     */
    InjectorService.factory = function (target, instance) {
        return InjectorService.set({ provide: target, useClass: target, instance: instance, type: "factory" });
    };
    return InjectorService;
}(ProviderRegistry_1.ProxyProviderRegistry));
exports.InjectorService = InjectorService;
/**
 * Create the first service InjectorService
 */
InjectorService.factory(InjectorService, new InjectorService());
//# sourceMappingURL=InjectorService.js.map