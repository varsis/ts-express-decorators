"use strict";
/**
 * @module common/core
 */
/** */
Object.defineProperty(exports, "__esModule", { value: true });
function Configurable(value) {
    if (value === void 0) { value = true; }
    return function (target, propertyKey, descriptor) {
        if (descriptor === void 0) { descriptor = { writable: true, enumerable: true }; }
        descriptor.configurable = value;
        return descriptor;
    };
}
exports.Configurable = Configurable;
//# sourceMappingURL=configurable.js.map