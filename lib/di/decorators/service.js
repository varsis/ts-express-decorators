"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @module common/di
 */
/** */
var InjectorService_1 = require("../services/InjectorService");
/**
 * The decorators `@Service()` declare a new service can be injected in other service or controller on there `constructor()`.
 * All services annotated with `@Service()` are constructed one time.
 * `@Service()` use the `reflect-metadata` to collect and inject service on controllers or other services.
 *
 * @returns {Function}
 * @constructor
 */
function Service() {
    return function (target) {
        InjectorService_1.InjectorService.service(target);
        return target;
    };
}
exports.Service = Service;
//# sourceMappingURL=service.js.map