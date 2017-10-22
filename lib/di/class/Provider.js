"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var decorators_1 = require("../../core/decorators");
var interfaces_1 = require("../../core/interfaces");
var utils_1 = require("../../core/utils");
var Provider = /** @class */ (function () {
    function Provider(_provide) {
        this._provide = _provide;
        this._provide = utils_1.getClass(this._provide);
        this._useClass = utils_1.getClass(this._provide);
    }
    Object.defineProperty(Provider.prototype, "provide", {
        /**
         *
         * @returns {any}
         */
        get: function () {
            return this._provide;
        },
        /**
         *
         * @param value
         */
        set: function (value) {
            this._provide = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Provider.prototype, "useClass", {
        /**
         *
         * @returns {Type<T>}
         */
        get: function () {
            return this._useClass || this._provide;
        },
        /**
         *
         * @param value
         */
        set: function (value) {
            this._useClass = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Provider.prototype, "instance", {
        /**
         *
         * @returns {T}
         */
        get: function () {
            return this._instance;
        },
        /**
         *
         * @param value
         */
        set: function (value) {
            this._instance = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Provider.prototype, "type", {
        /**
         *
         * @returns {any}
         */
        get: function () {
            return this._type;
        },
        /**
         *
         * @param value
         */
        set: function (value) {
            this._type = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Provider.prototype, "className", {
        get: function () {
            return utils_1.nameOf(this.provide);
        },
        enumerable: true,
        configurable: true
    });
    tslib_1.__decorate([
        decorators_1.NotEnumerable(),
        tslib_1.__metadata("design:type", interfaces_1.Type)
    ], Provider.prototype, "_useClass", void 0);
    tslib_1.__decorate([
        decorators_1.NotEnumerable(),
        tslib_1.__metadata("design:type", Object)
    ], Provider.prototype, "_instance", void 0);
    tslib_1.__decorate([
        decorators_1.NotEnumerable(),
        tslib_1.__metadata("design:type", Object)
    ], Provider.prototype, "_type", void 0);
    return Provider;
}());
exports.Provider = Provider;
//# sourceMappingURL=Provider.js.map