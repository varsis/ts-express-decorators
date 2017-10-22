"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
/**
 * @module common/core
 */
/** */
var decorators_1 = require("../decorators");
var EntityDescription_1 = require("./EntityDescription");
var Store_1 = require("./Store");
/**
 *
 */
var Storable = /** @class */ (function (_super) {
    tslib_1.__extends(Storable, _super);
    function Storable(_target, _propertyKey, _index) {
        var _this = _super.call(this, _target, _propertyKey, _index) || this;
        _this._store = Store_1.Store.from(_target, _propertyKey, _index);
        return _this;
    }
    Object.defineProperty(Storable.prototype, "store", {
        /**
         *
         * @returns {Store}
         */
        get: function () {
            return this._store;
        },
        enumerable: true,
        configurable: true
    });
    tslib_1.__decorate([
        decorators_1.NotEnumerable(),
        tslib_1.__metadata("design:type", Store_1.Store)
    ], Storable.prototype, "_store", void 0);
    return Storable;
}(EntityDescription_1.EntityDescription));
exports.Storable = Storable;
//# sourceMappingURL=Storable.js.map