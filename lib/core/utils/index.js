"use strict";
/**
 * @module common/core
 */
/** */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Get the provide constructor.
 * @param targetClass
 */
exports.getContructor = function (targetClass) {
    return typeof targetClass === "function"
        ? targetClass
        : targetClass.constructor;
};
/**
 * Get the provide constructor if target is an instance.
 * @param target
 * @returns {*}
 */
function getClass(target) {
    return target.prototype ? target : target.constructor;
}
exports.getClass = getClass;
/**
 *
 * @param target
 * @returns {symbol}
 */
function getClassOrSymbol(target) {
    return typeof target === "symbol" ? target : getClass(target);
}
exports.getClassOrSymbol = getClassOrSymbol;
/**
 * Return true if the given obj is a primitive.
 * @param target
 * @returns {boolean}
 */
function isPrimitiveOrPrimitiveClass(target) {
    var isPrimitive = ["string", "boolean", "number"].indexOf(typeof target);
    if (isPrimitive > -1) {
        return true;
    }
    return target instanceof String
        || target === String
        || target instanceof Number
        || target === Number
        || target instanceof Boolean
        || target === Boolean;
}
exports.isPrimitiveOrPrimitiveClass = isPrimitiveOrPrimitiveClass;
/**
 * Return true if the clazz is an array.
 * @param target
 * @returns {boolean}
 */
function isArrayOrArrayClass(target) {
    if (target === Array) {
        return true;
    }
    return Object.prototype.toString.call(target) === "[object Array]";
}
exports.isArrayOrArrayClass = isArrayOrArrayClass;
/**
 * Return true if the target.
 * @param target
 * @returns {boolean}
 */
function isCollection(target) {
    return isArrayOrArrayClass(target)
        || target === Map
        || target instanceof Map
        || target === Set
        || target instanceof Set
        || target === WeakMap
        || target instanceof WeakMap
        || target === WeakSet
        || target instanceof WeakSet;
}
exports.isCollection = isCollection;
/**
 * Return true if the value is an empty string, null or undefined.
 * @param value
 * @returns {boolean}
 */
function isEmpty(value) {
    return value === "" || value === null || value === undefined;
}
exports.isEmpty = isEmpty;
/**
 * Get object name
 */
exports.nameOf = function (obj) {
    switch (typeof obj) {
        default:
            return "" + obj;
        case "symbol":
            return exports.nameOfSymbol(obj);
        case "function":
            return exports.nameOfClass(obj);
    }
};
/**
 * Get the provide name.
 * @param targetClass
 */
exports.nameOfClass = function (targetClass) {
    return typeof targetClass === "function"
        ? targetClass.name
        : targetClass.constructor.name;
};
/**
 * Get symbol name.
 * @param sym
 */
exports.nameOfSymbol = function (sym) {
    return sym.toString().replace("Symbol(", "").replace(")", "");
};
function deepExtends(out, obj, reducers) {
    if (reducers === void 0) { reducers = {}; }
    if (obj === undefined || obj === null) {
        return obj;
    }
    if (isPrimitiveOrPrimitiveClass(obj) || typeof obj === "function") {
        return obj;
    }
    if (isArrayOrArrayClass(obj)) {
        out = out || [];
    }
    else {
        out = out || {};
    }
    var defaultReducer = reducers["default"] ? reducers["default"] : function (collection, value) {
        collection.push(value);
        return collection;
    };
    var set = function (key, value) {
        if (isArrayOrArrayClass(obj)) {
            out.push(value);
        }
        else {
            out[key] = value;
        }
    };
    Object.keys(obj).forEach(function (key) {
        var value = obj[key];
        if (value === undefined || value === null) {
            return;
        }
        if (value === "" && out[key] !== "") {
            return;
        }
        if (isPrimitiveOrPrimitiveClass(value) || typeof value === "function") {
            set(key, value);
            return;
        }
        if (isArrayOrArrayClass(value)) {
            value = value.map(function (value) { return deepExtends(undefined, value); });
            set(key, []
                .concat(out[key] || [], value)
                .reduce(function (collection, value) {
                return reducers[key] ? reducers[key](collection, value) : defaultReducer(collection, value);
            }, []));
            return;
        }
        // Object
        if (isArrayOrArrayClass(obj)) {
            set(key, deepExtends(undefined, value, reducers));
        }
        else {
            set(key, deepExtends(out[key], value, reducers));
        }
    });
    if (isArrayOrArrayClass(out)) {
        out.reduce(function (collection, value) { return defaultReducer(collection, value); }, []);
    }
    return out;
}
exports.deepExtends = deepExtends;
function isPromise(target) {
    return target === Promise || target instanceof Promise;
}
exports.isPromise = isPromise;
function getInheritedClass(target) {
    return Object.getPrototypeOf(target);
}
exports.getInheritedClass = getInheritedClass;
function getDecoratorType(args) {
    var propertyKey = args[1], descriptor = args[2];
    if (typeof descriptor === "number") {
        return "parameter";
    }
    if (propertyKey && descriptor === undefined || descriptor && (descriptor.get || descriptor.set)) {
        return "property";
    }
    return (descriptor && descriptor.value) ? "method" : "class";
}
exports.getDecoratorType = getDecoratorType;
function descriptorOf(target, propertyKey) {
    return Object.getOwnPropertyDescriptor(target && target.prototype || target, propertyKey);
}
exports.descriptorOf = descriptorOf;
function decoratorArgs(target, propertyKey) {
    return [
        target,
        propertyKey,
        descriptorOf(target, propertyKey)
    ];
}
exports.decoratorArgs = decoratorArgs;
function applyBefore(target, name, callback) {
    var original = target[name];
    target[name] = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        callback.apply(void 0, args);
        return original.apply(this, args);
    };
}
exports.applyBefore = applyBefore;
//# sourceMappingURL=index.js.map