"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
/**
 * @module common/mvc
 */
/** */
var ts_log_debug_1 = require("ts-log-debug");
var ConverterService_1 = require("../../converters/services/ConverterService");
var CastError_1 = require("../../core/errors/CastError");
var utils_1 = require("../../core/utils");
var InjectorService_1 = require("../../di/services/InjectorService");
var FilterService_1 = require("../../filters/services/FilterService");
var constants_1 = require("../constants");
var ParseExpressionError_1 = require("../errors/ParseExpressionError");
var RequiredParamError_1 = require("../errors/RequiredParamError");
var ControllerRegistry_1 = require("../registries/ControllerRegistry");
var MiddlewareRegistry_1 = require("../registries/MiddlewareRegistry");
var RouterController_1 = require("../services/RouterController");
var EndpointMetadata_1 = require("./EndpointMetadata");
var HandlerMetadata_1 = require("./HandlerMetadata");
/**
 * @stable
 */
var HandlerBuilder = /** @class */ (function () {
    function HandlerBuilder(handlerMetadata) {
        var _this = this;
        this.handlerMetadata = handlerMetadata;
        /**
         *
         * @param locals
         * @returns {any}
         */
        this.endpointHandler = function (locals) {
            if (locals === void 0) { locals = new Map(); }
            var provider = ControllerRegistry_1.ControllerRegistry.get(_this.handlerMetadata.target);
            /* istanbul ignore next */
            if (!provider) {
                throw new Error("Controller component not found in the ControllerRegistry");
            }
            var target = provider.useClass;
            if (provider.scope || provider.instance === undefined) {
                if (!locals.has(RouterController_1.RouterController)) {
                    locals.set(RouterController_1.RouterController, new RouterController_1.RouterController(provider.router));
                }
                provider.instance = InjectorService_1.InjectorService.invoke(target, locals);
            }
            return provider.instance[_this.handlerMetadata.methodClassName].bind(provider.instance);
        };
        /**
         *
         * @param localScope
         * @returns {[(any|EndpointMetadata|any|any),(any|EndpointMetadata|any|any),(any|EndpointMetadata|any|any),(any|EndpointMetadata|any|any),(any|EndpointMetadata|any|any)]}
         */
        this.getInjectableParameters = function (localScope) {
            if (localScope === void 0) { localScope = {}; }
            var converterService = InjectorService_1.InjectorService.get(ConverterService_1.ConverterService);
            var filterService = InjectorService_1.InjectorService.get(FilterService_1.FilterService);
            return _this.handlerMetadata
                .services
                .map(function (param, index) {
                var paramValue;
                if (param.name in localScope) {
                    return localScope[param.name];
                }
                if (param.service === constants_1.ENDPOINT_INFO) {
                    return localScope["request"].getEndpoint();
                }
                if (param.service === constants_1.RESPONSE_DATA) {
                    return localScope["request"].getStoredData();
                }
                if (filterService.has(param.service)) {
                    paramValue = filterService.invokeMethod(param.service, param.expression, localScope.request, localScope.response);
                }
                if (!param.isValidValue(paramValue)) {
                    throw new RequiredParamError_1.RequiredParamError(param.name, param.expression);
                }
                try {
                    if (param.useConverter) {
                        var type = param.type || param.collectionType;
                        paramValue = converterService.deserialize(paramValue, type, param.collectionType);
                    }
                }
                catch (err) {
                    /* istanbul ignore next */
                    if (err.name === "BAD_REQUEST") {
                        throw new ParseExpressionError_1.ParseExpressionError(param.name, param.expression, err.message);
                    }
                    else {
                        /* istanbul ignore next */
                        throw new CastError_1.CastError(err);
                    }
                }
                return paramValue;
            });
        };
    }
    /**
     *
     * @param obj
     * @returns {HandlerBuilder}
     */
    HandlerBuilder.from = function (obj) {
        if (obj instanceof EndpointMetadata_1.EndpointMetadata) {
            return new HandlerBuilder(new HandlerMetadata_1.HandlerMetadata(obj.target, obj.methodClassName));
        }
        // Middleware
        return new HandlerBuilder(new HandlerMetadata_1.HandlerMetadata(obj));
    };
    /**
     *
     * @returns {any}
     */
    HandlerBuilder.prototype.build = function () {
        var _this = this;
        if (this.handlerMetadata.errorParam) {
            return function (err, request, response, next) {
                return _this.invoke({ err: err, request: request, response: response, next: next });
            };
        }
        else {
            return function (request, response, next) {
                return _this.invoke({ request: request, response: response, next: next });
            };
        }
    };
    /**
     *
     * @returns {any}
     */
    HandlerBuilder.prototype.middlewareHandler = function () {
        var provider = MiddlewareRegistry_1.MiddlewareRegistry.get(this.handlerMetadata.target);
        /* istanbul ignore next */
        if (!provider) {
            throw new Error("Middleware component not found in the MiddlewareRegistry");
        }
        return provider.instance.use.bind(provider.instance);
    };
    Object.defineProperty(HandlerBuilder.prototype, "handler", {
        /**
         *
         * @returns {any}
         */
        get: function () {
            switch (this.handlerMetadata.type) {
                default:
                case "function":
                    return this.handlerMetadata.target;
                case "middleware":
                    return this.middlewareHandler();
                case "controller":
                    return this.endpointHandler();
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     *
     * @param locals
     * @returns {Promise<TResult2|TResult1>}
     */
    HandlerBuilder.prototype.invoke = function (locals) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            var next, request, response, nextCalled, target, injectable, methodName, info, parameters, result, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        next = locals.next, request = locals.request, response = locals.response;
                        nextCalled = false;
                        target = this.handlerMetadata.target;
                        injectable = this.handlerMetadata.injectable;
                        methodName = this.handlerMetadata.methodClassName;
                        info = function (o) {
                            if (o === void 0) { o = {}; }
                            return JSON.stringify(tslib_1.__assign({ type: _this.handlerMetadata.type, target: (target ? utils_1.nameOf(target) : target.name) || "anonymous", methodName: methodName,
                                injectable: injectable, data: locals.request && locals.request.getStoredData ? locals.request.getStoredData() : undefined }, o));
                        };
                        locals.next = function (error) {
                            try {
                                nextCalled = true;
                                if (response.headersSent) {
                                    // $log.debug(request.tagId, "[INVOKE][END  ]", info());
                                    return;
                                }
                                /* istanbul ignore else */
                                ts_log_debug_1.$log.debug(request.tagId, "[INVOKE][END  ]", info({ error: error }));
                                return next(error);
                            }
                            catch (er) {
                                er.originalError = error;
                                return next(er);
                            }
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        if (request.tagId) {
                            ts_log_debug_1.$log.debug(request.tagId, "[INVOKE][START]", info());
                        }
                        parameters = this.localsToParams(locals);
                        return [4 /*yield*/, this.handler.apply(this, parameters)];
                    case 2:
                        result = _a.sent();
                        if (!nextCalled) {
                            if (this.handlerMetadata.type !== "function" && result !== undefined) {
                                locals.request.storeData(result);
                            }
                            if (!this.handlerMetadata.nextFunction) {
                                locals.next();
                            }
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        locals.next(err_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     *
     * @param locals
     */
    HandlerBuilder.prototype.localsToParams = function (locals) {
        if (this.handlerMetadata.injectable) {
            return this.getInjectableParameters(locals);
        }
        var parameters = [locals.request, locals.response];
        if (this.handlerMetadata.errorParam) {
            parameters.unshift(locals.err);
        }
        if (this.handlerMetadata.nextFunction) {
            parameters.push(locals.next);
        }
        return parameters;
    };
    return HandlerBuilder;
}());
exports.HandlerBuilder = HandlerBuilder;
//# sourceMappingURL=HandlerBuilder.js.map