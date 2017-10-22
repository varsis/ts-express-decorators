"use strict";
/**
 * @module common/converters
 */
/** */
Object.defineProperty(exports, "__esModule", { value: true });
var Metadata_1 = require("../../core/class/Metadata");
var index_1 = require("../constants/index");
/**
 * `@Converter(...targetTypes)` let you to define some converters for a certain type/Class.
 * It usefull for a generic conversion.
 *
 * @param classes
 * @returns {(customConverter?:any)=>undefined}
 * @decorator
 */
function Converter() {
    var classes = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        classes[_i] = arguments[_i];
    }
    return function (target) {
        classes.forEach(function (clazz) {
            return Metadata_1.Metadata.set(index_1.CONVERTER, target, clazz);
        });
    };
}
exports.Converter = Converter;
//# sourceMappingURL=converter.js.map