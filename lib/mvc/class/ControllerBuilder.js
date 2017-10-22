"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @module common/mvc
 */
/** */
var Express = require("express");
var ControllerRegistry_1 = require("../registries/ControllerRegistry");
var EndpointRegistry_1 = require("../registries/EndpointRegistry");
var EndpointBuilder_1 = require("./EndpointBuilder");
var HandlerBuilder_1 = require("./HandlerBuilder");
var ControllerBuilder = /** @class */ (function () {
    function ControllerBuilder(provider, defaultRoutersOptions) {
        if (defaultRoutersOptions === void 0) { defaultRoutersOptions = {}; }
        this.provider = provider;
        this.defaultRoutersOptions = defaultRoutersOptions;
        this.provider.router = Express.Router(Object.assign({}, defaultRoutersOptions, this.provider.routerOptions));
    }
    /**
     *
     * @returns {any}
     */
    ControllerBuilder.prototype.build = function () {
        var _this = this;
        var ctrl = this.provider;
        EndpointRegistry_1.EndpointRegistry.inherit(this.provider.useClass);
        this.buildMiddlewares(this.provider.middlewares.useBefore);
        ctrl.endpoints.forEach(function (endpoint) {
            new EndpointBuilder_1.EndpointBuilder(endpoint, _this.provider.router).build(); // this.provider.middlewares.use
        });
        this.buildMiddlewares(this.provider.middlewares.useAfter);
        ctrl.dependencies
            .forEach(function (child) {
            var ctrlMeta = ControllerRegistry_1.ControllerRegistry.get(child);
            /* istanbul ignore next */
            if (!ctrlMeta) {
                throw new Error("Controller component not found in the ControllerRegistry");
            }
            var ctrlBuilder = new ControllerBuilder(ctrlMeta, _this.defaultRoutersOptions).build();
            _this.provider.router.use(ctrlMeta.path, ctrlBuilder.provider.router);
        });
        return this;
    };
    ControllerBuilder.prototype.buildMiddlewares = function (middlewares) {
        var _this = this;
        return middlewares
            .filter(function (o) { return typeof o === "function"; })
            .forEach(function (middleware) {
            return _this.provider.router.use(HandlerBuilder_1.HandlerBuilder.from(middleware).build());
        });
    };
    return ControllerBuilder;
}());
exports.ControllerBuilder = ControllerBuilder;
//# sourceMappingURL=ControllerBuilder.js.map