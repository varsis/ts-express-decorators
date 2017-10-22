"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var InjectorService_1 = require("../di/services/InjectorService");
/**
 * @module testing
 */
/** */
var done_1 = require("./done");
var loadInjector_1 = require("./loadInjector");
/**
 * The inject function is one of the TsExpressDecorator testing utilities.
 * It injects services into the test function where you can alter, spy on, and manipulate them.
 *
 * The inject function has two parameters
 *
 * * an array of Service dependency injection tokens,
 * * a test function whose parameters correspond exactly to each item in the injection token array.
 *
 * @param targets
 * @param func
 * @returns {any}
 */
function inject(targets, func) {
    loadInjector_1.loadInjector();
    return function (done) {
        var isDoneInjected = false;
        var args = targets.map(function (target) {
            if (target === done_1.Done) {
                isDoneInjected = true;
                return done;
            }
            /* istanbul ignore next */
            if (!InjectorService_1.InjectorService.has(target)) {
                InjectorService_1.InjectorService.construct(target);
            }
            return InjectorService_1.InjectorService.get(target);
        });
        func.apply(null, args);
        if (!isDoneInjected)
            done();
    };
}
exports.inject = inject;
//# sourceMappingURL=inject.js.map