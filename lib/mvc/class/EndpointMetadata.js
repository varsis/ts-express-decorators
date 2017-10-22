"use strict";
/**
 * @module common/mvc
 */
/** */
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Metadata_1 = require("../../core/class/Metadata");
var Storable_1 = require("../../core/class/Storable");
var Store_1 = require("../../core/class/Store");
var decorators_1 = require("../../core/decorators");
var utils_1 = require("../../core/utils");
var constants_1 = require("../constants");
/**
 * EndpointMetadata contains metadata about a controller and his method.
 * Each annotation (@Get, @Body...) attached to a method are stored in a endpoint.
 * EndpointMetadata convert this metadata to an array which contain arguments to call an Express method.
 *
 * Example :
 *
 *    @Controller("/my-path")
 *    provide MyClass {
 *
 *        @Get("/")
 *        @Authenticated()
 *        public myMethod(){}
 *    }
 *
 */
var EndpointMetadata = /** @class */ (function (_super) {
    tslib_1.__extends(EndpointMetadata, _super);
    function EndpointMetadata(_provide, _methodClassName) {
        var _this = _super.call(this, _provide, _methodClassName, Object.getOwnPropertyDescriptor(_provide, _methodClassName)) || this;
        _this._methodClassName = _methodClassName;
        /**
         *
         * @type {Array}
         */
        _this._beforeMiddlewares = [];
        /**
         *
         * @type {Array}
         * @private
         */
        _this._middlewares = [];
        /**
         *
         * @type {Array}
         * @private
         */
        _this._afterMiddlewares = [];
        _this._type = Metadata_1.Metadata.getReturnType(_this._target, _this.methodClassName);
        return _this;
    }
    Object.defineProperty(EndpointMetadata.prototype, "beforeMiddlewares", {
        /**
         *
         * @returns {any[]}
         */
        get: function () {
            return this._beforeMiddlewares;
        },
        /**
         *
         * @param value
         */
        set: function (value) {
            this._beforeMiddlewares = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EndpointMetadata.prototype, "middlewares", {
        /**
         *
         * @returns {any[]}
         */
        get: function () {
            return this._middlewares;
        },
        /**
         *
         * @param value
         */
        set: function (value) {
            this._middlewares = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EndpointMetadata.prototype, "afterMiddlewares", {
        /**
         *
         * @returns {any[]}
         */
        get: function () {
            return this._afterMiddlewares;
        },
        /**
         *
         * @param value
         */
        set: function (value) {
            this._afterMiddlewares = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EndpointMetadata.prototype, "httpMethod", {
        /**
         *
         * @returns {string}
         */
        get: function () {
            return this._httpMethod;
        },
        /**
         *
         * @param value
         */
        set: function (value) {
            this._httpMethod = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EndpointMetadata.prototype, "path", {
        /**
         *
         * @returns {PathParamsType}
         */
        get: function () {
            return this._path;
        },
        /**
         *
         * @param value
         */
        set: function (value) {
            this._path = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EndpointMetadata.prototype, "inheritedEndpoint", {
        get: function () {
            return this._inheritedEndpoint;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EndpointMetadata.prototype, "type", {
        get: function () {
            return utils_1.isPromise(this._type) || utils_1.isArrayOrArrayClass(this._type) || this._type === Object ? undefined : this._type;
        },
        set: function (type) {
            this._type = type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EndpointMetadata.prototype, "methodClassName", {
        /**
         *
         */
        get: function () {
            return this._methodClassName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EndpointMetadata.prototype, "store", {
        /**
         *
         * @returns {Store}
         */
        get: function () {
            return this._inheritedEndpoint ? this._inheritedEndpoint.store : this._store;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Find the a value at the controller level. Let this value be extended or overridden by the endpoint itself.
     *
     * @param key
     * @returns {any}
     */
    EndpointMetadata.prototype.get = function (key) {
        var ctrlValue = Store_1.Store.from(this.target).get(key);
        var meta = utils_1.deepExtends(undefined, ctrlValue);
        var endpointValue = this.store.get(key);
        if (endpointValue !== undefined) {
            meta = utils_1.deepExtends(meta, endpointValue);
        }
        return meta;
    };
    /**
     *
     * @returns {boolean}
     */
    EndpointMetadata.prototype.hasHttpMethod = function () {
        return !!this._httpMethod;
    };
    /**
     * Change the type and the collection type from the status code.
     * @param {string | number} code
     */
    EndpointMetadata.prototype.statusResponse = function (code) {
        var _this = this;
        var get = function (code) { return (_this.get("responses") || {})[code] || {}; };
        var _a = get(code), description = _a.description, headers = _a.headers, examples = _a.examples;
        if (code) {
            var _b = get(code), type = _b.type, collectionType = _b.collectionType;
            this.type = type;
            this.collectionType = collectionType;
        }
        var expectedStatus = this.store.get("statusCode") || 200;
        if (+code === +expectedStatus) {
            var response = this.store.get("response");
            if (response) {
                headers = response.headers || headers;
                examples = response.examples || examples;
                description = response.description || description;
                this.type = response.type || this.type;
                this.collectionType = response.collectionType || this.collectionType;
            }
        }
        if (headers) {
            headers = utils_1.deepExtends({}, headers);
            Object.keys(headers).forEach(function (key) {
                delete headers[key].value;
            });
        }
        return {
            headers: headers,
            examples: examples,
            description: description
        };
    };
    /**
     *
     * @param args
     * @returns {EndpointMetadata}
     */
    EndpointMetadata.prototype.before = function (args) {
        this._beforeMiddlewares = this._beforeMiddlewares.concat(args);
        return this;
    };
    /**
     *
     * @param args
     * @returns {EndpointMetadata}
     */
    EndpointMetadata.prototype.after = function (args) {
        this._afterMiddlewares = this._afterMiddlewares.concat(args);
        return this;
    };
    /**
     * Store all arguments collected via Annotation.
     * @param args
     */
    EndpointMetadata.prototype.merge = function (args) {
        var _this = this;
        var filteredArg = args
            .filter(function (arg) {
            if (typeof arg === "string") {
                if (constants_1.ENDPOINT_METHODS.indexOf(arg) > -1) {
                    _this.httpMethod = arg;
                }
                else {
                    _this.path = arg;
                }
                return false;
            }
            return !!arg;
        });
        this.middlewares = this._middlewares.concat(filteredArg);
        return this;
    };
    /**
     *
     * @param {Type<any>} target
     */
    EndpointMetadata.prototype.inherit = function (target) {
        var metadata = new EndpointMetadata(target, this.methodClassName);
        metadata._inheritedEndpoint = this;
        metadata.middlewares = this.middlewares;
        metadata.afterMiddlewares = this.afterMiddlewares;
        metadata.beforeMiddlewares = this.beforeMiddlewares;
        metadata.httpMethod = this.httpMethod;
        metadata.path = this.path;
        metadata.type = this._type;
        return metadata;
    };
    /**
     * Get value for an endpoint method.
     * @param key
     */
    EndpointMetadata.prototype.getMetadata = function (key) {
        return this.get(key);
    };
    tslib_1.__decorate([
        decorators_1.NotEnumerable(),
        tslib_1.__metadata("design:type", Array)
    ], EndpointMetadata.prototype, "_beforeMiddlewares", void 0);
    tslib_1.__decorate([
        decorators_1.NotEnumerable(),
        tslib_1.__metadata("design:type", Array)
    ], EndpointMetadata.prototype, "_middlewares", void 0);
    tslib_1.__decorate([
        decorators_1.NotEnumerable(),
        tslib_1.__metadata("design:type", Array)
    ], EndpointMetadata.prototype, "_afterMiddlewares", void 0);
    tslib_1.__decorate([
        decorators_1.NotEnumerable(),
        tslib_1.__metadata("design:type", String)
    ], EndpointMetadata.prototype, "_httpMethod", void 0);
    tslib_1.__decorate([
        decorators_1.NotEnumerable(),
        tslib_1.__metadata("design:type", Object)
    ], EndpointMetadata.prototype, "_path", void 0);
    tslib_1.__decorate([
        decorators_1.NotEnumerable(),
        tslib_1.__metadata("design:type", EndpointMetadata)
    ], EndpointMetadata.prototype, "_inheritedEndpoint", void 0);
    tslib_1.__decorate([
        decorators_1.Deprecated("Use endpointMetadata.get(key) instead of"),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", Object)
    ], EndpointMetadata.prototype, "getMetadata", null);
    return EndpointMetadata;
}(Storable_1.Storable));
exports.EndpointMetadata = EndpointMetadata;
//# sourceMappingURL=EndpointMetadata.js.map