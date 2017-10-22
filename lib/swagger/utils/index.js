"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../../core/utils");
/** */
function toSwaggerPath(expressPath) {
    if (typeof expressPath === "string") {
        var params = expressPath.match(/:[\w]+/g);
        var openAPIPath = expressPath;
        if (params) {
            var swagerParams_1 = params.map(function (x) {
                return "{" + x.replace(":", "") + "}";
            });
            openAPIPath = params.reduce(function (acc, el, ix) {
                return acc.replace(el, swagerParams_1[ix]);
            }, expressPath);
        }
        return openAPIPath;
    }
    else {
        return expressPath;
    }
}
exports.toSwaggerPath = toSwaggerPath;
function isBasicType(type) {
    return ["Array", "Boolean", "Object", "Number", "String"].indexOf(utils_1.nameOf(type)) > -1;
}
exports.isBasicType = isBasicType;
function swaggerType(type) {
    if (this.isBasicType(type)) {
        return utils_1.nameOf(type).toLowerCase();
    }
    if (type instanceof Date || type === Date) {
        return "string";
    }
    // in type case the type is complexe
    return utils_1.nameOf(type);
}
exports.swaggerType = swaggerType;
function getReducers() {
    var defaultReducer = function (collection, value) {
        if (collection.indexOf(value) === -1) {
            collection.push(value);
        }
        return collection;
    };
    return {
        "default": defaultReducer,
        "security": function (collection, value) {
            var current = collection.find(function (current) {
                return Object.keys(value).find(function (key) { return !!current[key]; });
            });
            if (current) {
                utils_1.deepExtends(current, value, { "default": defaultReducer });
            }
            else {
                collection.push(value);
            }
            return collection;
        },
        "parameters": function (collection, value) {
            var current = collection.find(function (current) {
                return current.in === value.in && current.name === value.name;
            });
            if (current) {
                utils_1.deepExtends(current, value);
            }
            else {
                collection.push(value);
            }
            return collection;
        }
    };
}
exports.getReducers = getReducers;
//# sourceMappingURL=index.js.map