"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
/**
 * @module servestatic
 */
/** */
var ExpressApplication_1 = require("../../core/services/ExpressApplication");
var inject_1 = require("../../di/decorators/inject");
var service_1 = require("../../di/decorators/service");
var ServerSettingsService_1 = require("../../server/services/ServerSettingsService");
var ServeStaticService = /** @class */ (function () {
    function ServeStaticService(expressApp, serverSettingsService) {
        this.expressApp = expressApp;
        this.serverSettingsService = serverSettingsService;
    }
    ServeStaticService.prototype.$afterRoutesInit = function () {
        var _this = this;
        /* istanbul ignore else */
        if (require.resolve("serve-static")) {
            Object
                .keys(this.serverSettingsService.serveStatic)
                .forEach(function (path) {
                []
                    .concat(_this.serverSettingsService.serveStatic[path])
                    .forEach(function (directory) { return _this.mount(path, directory); });
            });
        }
    };
    ServeStaticService.prototype.mount = function (path, directory) {
        var serveStatic = require("serve-static");
        var middleware = serveStatic(directory);
        this.expressApp.use(path, function (request, response, next) {
            if (!response.headersSent) {
                middleware(request, response, next);
            }
            else {
                next();
            }
        });
    };
    ServeStaticService = tslib_1.__decorate([
        service_1.Service(),
        tslib_1.__param(0, inject_1.Inject(ExpressApplication_1.ExpressApplication)),
        tslib_1.__metadata("design:paramtypes", [Function, ServerSettingsService_1.ServerSettingsService])
    ], ServeStaticService);
    return ServeStaticService;
}());
exports.ServeStaticService = ServeStaticService;
//# sourceMappingURL=ServeStaticService.js.map