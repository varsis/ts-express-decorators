"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @module testing
 */
/** */
var ts_log_debug_1 = require("ts-log-debug");
/**
 * Load the server silently without listening port and configure it on test profile.
 * @decorator
 * @param server
 * @param args
 * @returns {(done:Function)=>undefined}
 */
function bootstrap(server) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    ts_log_debug_1.$log.stop();
    process.env.NODE_ENV = process.env.NODE_ENV || "test";
    return function (done) {
        if (server.$$instance === undefined) {
            var instance = new (server.bind.apply(server, [void 0].concat(args)))();
            server.$$instance = instance;
            instance.startServers = function () {
                return Promise.resolve();
            };
            instance.start().then(function () { return done(); });
        }
        else {
            done();
        }
    };
}
exports.bootstrap = bootstrap;
//# sourceMappingURL=bootstrap.js.map