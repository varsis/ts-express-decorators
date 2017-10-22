"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @module common/mvc
 */
/** */
var use_1 = require("./use");
/**
 * This method is just like the `router.METHOD()` methods, except that it matches all HTTP methods (verbs).
 *
 * This method is extremely useful for mapping “global” logic for specific path prefixes or arbitrary matches.
 * For example, if you placed the following route at the top of all other route definitions, it would require that
 * all routes from that point on would require authentication, and automatically load a user.
 * Keep in mind that these callbacks do not have to act as end points; loadUser can perform a task, then call next()
 * to continue matching subsequent routes.
 * @param path
 * @param args
 * @returns {Function}
 * @decorator
 */
function All(path) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return use_1.Use.apply(void 0, ["all", path].concat(args));
}
exports.All = All;
/**
 * This method is just like the `router.METHOD()` methods, except that it matches all HTTP methods (verbs).
 *
 * This method is extremely useful for mapping “global” logic for specific path prefixes or arbitrary matches.
 * For example, if you placed the following route at the top of all other route definitions, it would require that
 * all routes from that point on would require authentication, and automatically load a user.
 * Keep in mind that these callbacks do not have to act as end points; loadUser can perform a task, then call next()
 * to continue matching subsequent routes.
 * @param path
 * @param args
 * @returns {Function}
 * @decorator
 */
function Get(path) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return use_1.Use.apply(void 0, ["get", path].concat(args));
}
exports.Get = Get;
/**
 * This method is just like the `router.METHOD()` methods, except that it matches all HTTP methods (verbs).
 *
 * This method is extremely useful for mapping “global” logic for specific path prefixes or arbitrary matches.
 * For example, if you placed the following route at the top of all other route definitions, it would require that
 * all routes from that point on would require authentication, and automatically load a user.
 * Keep in mind that these callbacks do not have to act as end points; loadUser can perform a task, then call next()
 * to continue matching subsequent routes.
 * @param path
 * @param args
 * @returns {Function}
 * @decorator
 */
function Post(path) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return use_1.Use.apply(void 0, ["post", path].concat(args));
}
exports.Post = Post;
/**
 * This method is just like the `router.METHOD()` methods, except that it matches all HTTP methods (verbs).
 *
 * This method is extremely useful for mapping “global” logic for specific path prefixes or arbitrary matches.
 * For example, if you placed the following route at the top of all other route definitions, it would require that
 * all routes from that point on would require authentication, and automatically load a user.
 * Keep in mind that these callbacks do not have to act as end points; loadUser can perform a task, then call next()
 * to continue matching subsequent routes.
 * @param path
 * @param args
 * @returns {Function}
 * @decorator
 */
function Put(path) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return use_1.Use.apply(void 0, ["put", path].concat(args));
}
exports.Put = Put;
/**
 * This method is just like the `router.METHOD()` methods, except that it matches all HTTP methods (verbs).
 *
 * This method is extremely useful for mapping “global” logic for specific path prefixes or arbitrary matches.
 * For example, if you placed the following route at the top of all other route definitions, it would require that
 * all routes from that point on would require authentication, and automatically load a user.
 * Keep in mind that these callbacks do not have to act as end points; loadUser can perform a task, then call next()
 * to continue matching subsequent routes.
 * @param path
 * @param args
 * @returns {Function}
 * @decorator
 */
function Delete(path) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return use_1.Use.apply(void 0, ["delete", path].concat(args));
}
exports.Delete = Delete;
/**
 * This method is just like the `router.METHOD()` methods, except that it matches all HTTP methods (verbs).
 *
 * This method is extremely useful for mapping “global” logic for specific path prefixes or arbitrary matches.
 * For example, if you placed the following route at the top of all other route definitions, it would require that
 * all routes from that point on would require authentication, and automatically load a user.
 * Keep in mind that these callbacks do not have to act as end points; loadUser can perform a task, then call next()
 * to continue matching subsequent routes.
 * @param path
 * @param args
 * @returns {Function}
 * @decorator
 */
function Head(path) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return use_1.Use.apply(void 0, ["head", path].concat(args));
}
exports.Head = Head;
/**
 * This method is just like the `router.METHOD()` methods, except that it matches all HTTP methods (verbs).
 *
 * This method is extremely useful for mapping “global” logic for specific path prefixes or arbitrary matches.
 * For example, if you placed the following route at the top of all other route definitions, it would require that
 * all routes from that point on would require authentication, and automatically load a user.
 * Keep in mind that these callbacks do not have to act as end points; loadUser can perform a task, then call next()
 * to continue matching subsequent routes.
 * @param path
 * @param args
 * @returns {Function}
 * @decorator
 */
function Patch(path) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return use_1.Use.apply(void 0, ["patch", path].concat(args));
}
exports.Patch = Patch;
//# sourceMappingURL=route.js.map