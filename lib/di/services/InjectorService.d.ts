import { Registry } from "../../core/class/Registry";
import { Type } from "../../core/interfaces";
import { Provider } from "../class/Provider";
import { IInjectableMethod, IProvider } from "../interfaces";
import { ProxyProviderRegistry } from "../registries/ProviderRegistry";
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
export declare class InjectorService extends ProxyProviderRegistry {
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
    invoke<T>(target: any, locals?: Map<Function, any>, designParamTypes?: any[]): T;
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
    invokeMethod(handler: any, options: IInjectableMethod<any> | any[]): any;
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
    static get: <T>(target: any) => T;
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
    static invokeMethod(handler: any, options: IInjectableMethod<any> | any[]): any;
    /**
     * Initialize injectorService and load all services/factories.
     */
    load(): Promise<any>;
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
    static invoke<T>(target: any, locals?: Map<string | Function, any>, designParamTypes?: any[]): T;
    /**
     * Construct the service with his dependencies.
     * @param target The service to be built.
     */
    static construct<T>(target: Type<any> | symbol): T;
    /**
     * Emit an event to all service. See service [lifecycle hooks](docs/services/lifecycle-hooks.md).
     * @param eventName The event name to emit at all services.
     * @param args List of the parameters to give to each services.
     * @returns {Promise<any[]>} A list of promises.
     */
    static emit(eventName: string, ...args: any[]): Promise<any[]>;
    /**
     * @hidden
     * @param registry
     * @param callback
     */
    static buildRegistry(registry: Registry<Provider<any>, any>, callback?: (provider: Provider<any>) => boolean): Registry<Provider<any>, any>;
    /**
     * Set a new provider from providerSetting.
     * @param provider provide token.
     * @param instance Instance
     */
    static set(provider: IProvider<any> | any, instance?: any): typeof InjectorService;
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
    get<T>(target: Type<T> | symbol): T;
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
    static has: (target: any) => boolean;
    /**
     * Initialize injectorService and load all services/factories.
     */
    static load(): Promise<[any[], any[]]>;
    /**
     * Emit an event to all service. See service [lifecycle hooks](docs/services/lifecycle-hooks.md).
     * @param eventName The event name to emit at all services.
     * @param args List of the parameters to give to each services.
     * @returns {Promise<any[]>} A list of promises.
     */
    emit(eventName: string, ...args: any[]): Promise<any[]>;
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
    static service: (target: any) => typeof InjectorService;
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
    static factory: (target: any, instance: any) => typeof InjectorService;
}
