"use strict";
/**
 * @module common/core
 */ /** */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * `ExpressApplication` is an alias type to the [Express.Application](http://expressjs.com/fr/4x/api.html#app) interface. It use the new feature `Injector.factory()` and let you to inject [Express.Application](http://expressjs.com/fr/4x/api.html#app) created by [ServerLoader](docs/server-loader.md).
 *
 * ```typescript
 * import {ExpressApplication, Service, Inject} from "ts-express-decorators";
 *
 * @Service()
 * export default class OtherService {
 *    constructor(@Inject(ExpressApplication) expressApplication: ExpressApplication){
 *           console.log(myFooFactory.getFoo()); /// "test"
 *     }
 * }
 * ```
 *
 * > Note: TypeScript transform and store `ExpressApplication` as `Function` type in the metadata. So to inject a factory, you must use the `@Inject(type)` decorator.
 *
 * @type {symbol}
 */
exports.ExpressApplication = Symbol("ExpressApplication");
//# sourceMappingURL=ExpressApplication.js.map