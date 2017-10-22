"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Storable_1 = require("../../core/class/Storable");
var decorators_1 = require("../../core/decorators");
var utils_1 = require("../../core/utils");
var ParamMetadata = /** @class */ (function (_super) {
    tslib_1.__extends(ParamMetadata, _super);
    function ParamMetadata() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         *
         * @type {boolean}
         */
        _this._useConverter = true;
        return _this;
    }
    Object.defineProperty(ParamMetadata.prototype, "expression", {
        /**
         *
         * @returns {string|RegExp}
         */
        get: function () {
            return this._expression;
        },
        /**
         *
         * @param value
         */
        set: function (value) {
            this._expression = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ParamMetadata.prototype, "service", {
        /**
         *
         * @returns {symbol}
         */
        get: function () {
            return this._service;
        },
        /**
         *
         * @param value
         */
        set: function (value) {
            this._service = value;
            this.name = utils_1.nameOf(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ParamMetadata.prototype, "useConverter", {
        /**
         *
         * @returns {boolean}
         */
        get: function () {
            return this._useConverter;
        },
        /**
         *
         * @param value
         */
        set: function (value) {
            this._useConverter = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     *
     * @returns {{service: (string|symbol), name: string, expression: string, required: boolean, use: undefined, baseType: undefined}}
     */
    ParamMetadata.prototype.toJSON = function () {
        return {
            service: utils_1.nameOf(this._service),
            name: this.name,
            expression: this._expression,
            required: this._required,
            use: this.typeName,
            baseType: this.collectionName
        };
    };
    tslib_1.__decorate([
        decorators_1.NotEnumerable(),
        tslib_1.__metadata("design:type", Object)
    ], ParamMetadata.prototype, "_expression", void 0);
    tslib_1.__decorate([
        decorators_1.NotEnumerable(),
        tslib_1.__metadata("design:type", Boolean)
    ], ParamMetadata.prototype, "_useConverter", void 0);
    tslib_1.__decorate([
        decorators_1.NotEnumerable(),
        tslib_1.__metadata("design:type", Object)
    ], ParamMetadata.prototype, "_service", void 0);
    return ParamMetadata;
}(Storable_1.Storable));
exports.ParamMetadata = ParamMetadata;
//# sourceMappingURL=ParamMetadata.js.map