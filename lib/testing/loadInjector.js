"use strict";
/**
 * @module testing
 */
/** */
Object.defineProperty(exports, "__esModule", { value: true });
var interfaces_1 = require("../core/interfaces");
var ExpressApplication_1 = require("../core/services/ExpressApplication");
var InjectorService_1 = require("../di/services/InjectorService");
var ServerSettingsProvider_1 = require("../server/class/ServerSettingsProvider");
var ServerSettingsService_1 = require("../server/services/ServerSettingsService");
function loadInjector() {
    if (!InjectorService_1.InjectorService.has(ExpressApplication_1.ExpressApplication)) {
        /* istanbul ignore next */
        var app_1 = {
            use: function () { return (app_1); },
            get: function () { return (app_1); }
        };
        InjectorService_1.InjectorService.set(ExpressApplication_1.ExpressApplication, app_1);
        /* istanbul ignore else */
        if (!InjectorService_1.InjectorService.has(ServerSettingsService_1.ServerSettingsService)) {
            var settingsProvider = new ServerSettingsProvider_1.ServerSettingsProvider();
            settingsProvider.env = interfaces_1.EnvTypes.TEST;
            InjectorService_1.InjectorService.set(ServerSettingsService_1.ServerSettingsService, settingsProvider.$get());
        }
    }
    InjectorService_1.InjectorService.load();
}
exports.loadInjector = loadInjector;
//# sourceMappingURL=loadInjector.js.map