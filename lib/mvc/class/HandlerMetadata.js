"use strict";
/**
 * @module common/mvc
 */
/** */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var decorators_1 = require("../../core/decorators");
var interfaces_1 = require("../interfaces");
var ControllerRegistry_1 = require("../registries/ControllerRegistry");
var MiddlewareRegistry_1 = require("../registries/MiddlewareRegistry");
var ParamRegistry_1 = require("../registries/ParamRegistry");
var HandlerMetadata = /** @class */ (function () {
    function HandlerMetadata(_target, _methodClassName) {
        this._target = _target;
        this._methodClassName = _methodClassName;
        /**
         *
         */
        this._type = "function";
        /**
         *
         * @type {boolean}
         * @private
         */
        this._errorParam = false;
        /**
         *
         */
        this._injectable = false;
        this.resolve();
    }
    /**
     *
     */
    HandlerMetadata.prototype.resolve = function () {
        var handler = this._target;
        var target = this._target;
        if (MiddlewareRegistry_1.MiddlewareRegistry.has(this._target)) {
            var middleware = MiddlewareRegistry_1.MiddlewareRegistry.get(this._target);
            this._type = "middleware";
            this._errorParam = middleware.type === interfaces_1.MiddlewareType.ERROR;
            this._methodClassName = "use";
            target = middleware.useClass;
        }
        else if (ControllerRegistry_1.ControllerRegistry.has(this._target)) {
            this._type = "controller";
        }
        if (this._methodClassName) {
            this._injectable = ParamRegistry_1.ParamRegistry.isInjectable(target, this._methodClassName);
            this._nextFunction = ParamRegistry_1.ParamRegistry.hasNextFunction(target, this._methodClassName);
            handler = target.prototype[this._methodClassName];
        }
        if (!this._injectable) {
            this._errorParam = handler.length === 4;
            this._nextFunction = handler.length >= 3;
        }
    };
    Object.defineProperty(HandlerMetadata.prototype, "type", {
        get: function () {
            return this._type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HandlerMetadata.prototype, "errorParam", {
        get: function () {
            return this._errorParam;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HandlerMetadata.prototype, "injectable", {
        get: function () {
            return this._injectable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HandlerMetadata.prototype, "nextFunction", {
        get: function () {
            return this._nextFunction;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HandlerMetadata.prototype, "methodClassName", {
        get: function () {
            return this._methodClassName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HandlerMetadata.prototype, "target", {
        get: function () {
            return this._target;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HandlerMetadata.prototype, "services", {
        get: function () {
            return ParamRegistry_1.ParamRegistry.getParams(this.target, this.methodClassName);
        },
        enumerable: true,
        configurable: true
    });
    tslib_1.__decorate([
        decorators_1.NotEnumerable(),
        tslib_1.__metadata("design:type", String)
    ], HandlerMetadata.prototype, "_type", void 0);
    tslib_1.__decorate([
        decorators_1.NotEnumerable(),
        tslib_1.__metadata("design:type", Boolean)
    ], HandlerMetadata.prototype, "_errorParam", void 0);
    tslib_1.__decorate([
        decorators_1.NotEnumerable(),
        tslib_1.__metadata("design:type", Boolean)
    ], HandlerMetadata.prototype, "_injectable", void 0);
    tslib_1.__decorate([
        decorators_1.NotEnumerable(),
        tslib_1.__metadata("design:type", Boolean)
    ], HandlerMetadata.prototype, "_nextFunction", void 0);
    return HandlerMetadata;
}());
exports.HandlerMetadata = HandlerMetadata;
//# sourceMappingURL=HandlerMetadata.js.map