"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @module testing
 */
/** */
var InjectorService_1 = require("../di/services/InjectorService");
var loadInjector_1 = require("./loadInjector");
function invoke(target, providers) {
    loadInjector_1.loadInjector();
    var locals = new Map();
    providers.forEach(function (p) {
        locals.set(p.provide, p.use);
    });
    return InjectorService_1.InjectorService.invoke(target, locals);
}
exports.invoke = invoke;
//# sourceMappingURL=invoke.js.map