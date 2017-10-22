"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var decorators_1 = require("../decorators");
var interfaces_1 = require("../interfaces");
/**
 * @module common/core
 */
/** */
var utils_1 = require("../utils");
var Metadata_1 = require("./Metadata");
/**
 * EntityDescription store all information collected by a decorator (class, property key and in option the index of the parameters).
 */
var EntityDescription = /** @class */ (function () {
    function EntityDescription(_target, _propertyKey, index) {
        this._target = _target;
        this._propertyKey = _propertyKey;
        /**
         * Required entity.
         */
        this._required = false;
        /**
         * Allowed value when the entity is required.
         * @type {Array}
         */
        this._allowedValues = [];
        if (typeof index === "number") {
            this._index = index;
        }
        this.target = _target;
    }
    Object.defineProperty(EntityDescription.prototype, "index", {
        /**
         * Return the index of the parameters.
         * @returns {any}
         */
        get: function () {
            return this._index;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityDescription.prototype, "target", {
        /**
         * Class of the entity.
         * @returns {Type<any>}
         */
        get: function () {
            return utils_1.getClass(this._target);
        },
        /**
         *
         * @param {Type<any>} target
         */
        set: function (target) {
            this._target = target;
            var type;
            if (typeof this._index === "number") {
                type = Metadata_1.Metadata.getParamTypes(this._target, this._propertyKey)[this._index];
            }
            else {
                type = Metadata_1.Metadata.getType(this._target, this._propertyKey);
            }
            if (utils_1.isCollection(type)) {
                this._collectionType = type;
                this._type = Object;
            }
            else {
                this._type = type;
            }
            this._name = utils_1.nameOf(this._propertyKey);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityDescription.prototype, "targetName", {
        /**
         * Return the class name of the entity.
         * @returns {string}
         */
        get: function () {
            return utils_1.nameOf(this.target);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityDescription.prototype, "propertyKey", {
        /**
         * Name of the method or attribute related to the class.
         * @returns {string|symbol}
         */
        get: function () {
            return this._propertyKey;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityDescription.prototype, "type", {
        /**
         *
         * @returns {Type<any>}
         */
        get: function () {
            return this._type;
        },
        /**
         *
         * @param value
         */
        set: function (value) {
            this._type = value || Object;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityDescription.prototype, "typeName", {
        /**
         *
         * @returns {string}
         */
        get: function () {
            return utils_1.nameOf(this._type);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityDescription.prototype, "collectionType", {
        /**
         *
         * @returns {any}
         */
        get: function () {
            return this._collectionType;
        },
        /**
         *
         * @param {Type<any>} collectionType
         */
        set: function (collectionType) {
            this._collectionType = collectionType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityDescription.prototype, "collectionName", {
        /**
         *
         * @returns {string}
         */
        get: function () {
            return this._collectionType ? utils_1.nameOf(this._collectionType) : "";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityDescription.prototype, "isCollection", {
        /**
         *
         * @returns {boolean}
         */
        get: function () {
            return !!this._collectionType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityDescription.prototype, "isArray", {
        /**
         *
         * @returns {boolean}
         */
        get: function () {
            return utils_1.isArrayOrArrayClass(this._collectionType);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityDescription.prototype, "isPrimitive", {
        /**
         *
         * @returns {boolean}
         */
        get: function () {
            return utils_1.isPrimitiveOrPrimitiveClass(this._type);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityDescription.prototype, "isDate", {
        /**
         *
         * @returns {boolean}
         */
        get: function () {
            return this._type === Date || this._type instanceof Date;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityDescription.prototype, "isObject", {
        /**
         *
         * @returns {boolean}
         */
        get: function () {
            return this.type === Object;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityDescription.prototype, "isClass", {
        /**
         *
         * @returns {boolean}
         */
        get: function () {
            return !this.isPrimitive && !this.isObject && !this.isDate && this.type !== undefined && !utils_1.isPromise(this.type);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityDescription.prototype, "name", {
        /**
         *
         * @returns {string}
         */
        get: function () {
            return this._name;
        },
        /**
         *
         * @param {string} value
         */
        set: function (value) {
            this._name = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityDescription.prototype, "required", {
        /**
         * Return the required state.
         * @returns {boolean}
         */
        get: function () {
            return this._required;
        },
        /**
         * Change the state of the required data.
         * @param value
         */
        set: function (value) {
            this._required = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityDescription.prototype, "allowedValues", {
        /**
         * Return the allowed values.
         * @returns {any[]}
         */
        get: function () {
            return this._allowedValues;
        },
        /**
         * Set the allowed values when the value is required.
         * @param {any[]} value
         */
        set: function (value) {
            this._allowedValues = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * This method use `EntityDescription.required` and `allowedValues` to validate the value.
     * @param value
     * @returns {boolean}
     */
    EntityDescription.prototype.isValidValue = function (value) {
        if (this.required) {
            if (value === undefined || value === null || value === "") {
                if (this.allowedValues.indexOf(value) === -1) {
                    return false;
                }
            }
        }
        return true;
    };
    tslib_1.__decorate([
        decorators_1.NotEnumerable(),
        tslib_1.__metadata("design:type", interfaces_1.Type)
    ], EntityDescription.prototype, "_collectionType", void 0);
    tslib_1.__decorate([
        decorators_1.NotEnumerable(),
        tslib_1.__metadata("design:type", String)
    ], EntityDescription.prototype, "_name", void 0);
    tslib_1.__decorate([
        decorators_1.NotEnumerable(),
        tslib_1.__metadata("design:type", interfaces_1.Type)
    ], EntityDescription.prototype, "_type", void 0);
    tslib_1.__decorate([
        decorators_1.NotEnumerable(),
        tslib_1.__metadata("design:type", Number)
    ], EntityDescription.prototype, "_index", void 0);
    tslib_1.__decorate([
        decorators_1.NotEnumerable(),
        tslib_1.__metadata("design:type", Boolean)
    ], EntityDescription.prototype, "_required", void 0);
    tslib_1.__decorate([
        decorators_1.NotEnumerable(),
        tslib_1.__metadata("design:type", Array)
    ], EntityDescription.prototype, "_allowedValues", void 0);
    return EntityDescription;
}());
exports.EntityDescription = EntityDescription;
//# sourceMappingURL=EntityDescription.js.map