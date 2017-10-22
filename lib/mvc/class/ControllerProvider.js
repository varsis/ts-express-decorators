"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
/**
 * @module common/mvc
 */
/** */
var Express = require("express");
var decorators_1 = require("../../core/decorators");
var utils_1 = require("../../core/utils");
var Provider_1 = require("../../di/class/Provider");
var EndpointRegistry_1 = require("../registries/EndpointRegistry");
/**
 *
 */
var ControllerProvider = /** @class */ (function (_super) {
    tslib_1.__extends(ControllerProvider, _super);
    function ControllerProvider(provide) {
        var _this = _super.call(this, provide) || this;
        /**
         * The path for the RouterController when the controller will be mounted to the Express Application.
         */
        _this._routerPaths = [];
        /**
         * Controllers that depend to this controller.
         * @type {Array}
         * @private
         */
        _this._dependencies = [];
        _this._middlewares = {
            useBefore: [],
            use: [],
            useAfter: []
        };
        /**
         * Resolve final endpoint url.
         */
        _this.getEndpointUrl = function (routerPath) {
            return (routerPath === _this.path ? _this.path : (routerPath || "") + _this.path).replace(/\/\//gi, "/");
        };
        _this.type = "controller";
        return _this;
    }
    Object.defineProperty(ControllerProvider.prototype, "path", {
        /**
         *
         * @returns {string}
         */
        get: function () {
            return this._path;
        },
        /**
         * set path
         * @param value
         */
        set: function (value) {
            this._path = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ControllerProvider.prototype, "routerPaths", {
        get: function () {
            return this._routerPaths;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ControllerProvider.prototype, "endpoints", {
        /**
         *
         * @returns {Endpoint[]}
         */
        get: function () {
            return EndpointRegistry_1.EndpointRegistry.getEndpoints(utils_1.getClass(this.provide));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ControllerProvider.prototype, "dependencies", {
        /**
         *
         * @returns {Type<any>[]}
         */
        get: function () {
            return this._dependencies;
        },
        /**
         *
         * @param dependencies
         */
        set: function (dependencies) {
            var _this = this;
            this._dependencies = dependencies;
            this._dependencies.forEach(function (d) { return d.$parentCtrl = _this; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ControllerProvider.prototype, "scope", {
        /**
         * Create a new controler for each per incoming request.
         * @returns {boolean}
         */
        get: function () {
            return this._scope;
        },
        /**
         *
         * @param scope
         */
        set: function (scope) {
            this._scope = scope;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ControllerProvider.prototype, "routerOptions", {
        /**
         *
         * @returns {IRouterOptions}
         */
        get: function () {
            return this._routerOptions;
        },
        /**
         *
         * @param value
         */
        set: function (value) {
            this._routerOptions = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ControllerProvider.prototype, "parent", {
        /**
         *
         * @returns {ControllerProvider}
         */
        get: function () {
            return this.provide.$parentCtrl;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ControllerProvider.prototype, "middlewares", {
        /**
         *
         * @returns {any[]}
         */
        get: function () {
            return this._middlewares;
        },
        /**
         *
         * @param middlewares
         */
        set: function (middlewares) {
            var _this = this;
            var concat = function (key, a, b) { return a[key] = a[key].concat(b[key]); };
            Object.keys(middlewares).forEach(function (key) {
                concat(key, _this._middlewares, middlewares);
            });
        },
        enumerable: true,
        configurable: true
    });
    /**
     *
     * @param {string} path
     */
    ControllerProvider.prototype.pushRouterPath = function (path) {
        this._routerPaths.push(path);
    };
    /**
     *
     */
    ControllerProvider.prototype.hasEndpointUrl = function () {
        return !!this.path;
    };
    /**
     *
     * @returns {boolean}
     */
    ControllerProvider.prototype.hasDependencies = function () {
        return !!this.dependencies.length;
    };
    /**
     *
     * @returns {boolean}
     */
    ControllerProvider.prototype.hasParent = function () {
        return !!this.provide.$parentCtrl;
    };
    tslib_1.__decorate([
        decorators_1.NotEnumerable(),
        tslib_1.__metadata("design:type", String)
    ], ControllerProvider.prototype, "_path", void 0);
    tslib_1.__decorate([
        decorators_1.NotEnumerable(),
        tslib_1.__metadata("design:type", Object)
    ], ControllerProvider.prototype, "_routerOptions", void 0);
    tslib_1.__decorate([
        decorators_1.NotEnumerable(),
        tslib_1.__metadata("design:type", Array)
    ], ControllerProvider.prototype, "_routerPaths", void 0);
    tslib_1.__decorate([
        decorators_1.NotEnumerable(),
        tslib_1.__metadata("design:type", Array)
    ], ControllerProvider.prototype, "_dependencies", void 0);
    tslib_1.__decorate([
        decorators_1.NotEnumerable(),
        tslib_1.__metadata("design:type", Object)
    ], ControllerProvider.prototype, "_scope", void 0);
    tslib_1.__decorate([
        decorators_1.NotEnumerable(),
        tslib_1.__metadata("design:type", Function)
    ], ControllerProvider.prototype, "router", void 0);
    tslib_1.__decorate([
        decorators_1.NotEnumerable(),
        tslib_1.__metadata("design:type", Object)
    ], ControllerProvider.prototype, "_middlewares", void 0);
    return ControllerProvider;
}(Provider_1.Provider));
exports.ControllerProvider = ControllerProvider;
//# sourceMappingURL=ControllerProvider.js.map