"use strict";
/**
 * @module common/core
 */
/** */
Object.defineProperty(exports, "__esModule", { value: true });
function Enumerable(value) {
    if (value === void 0) { value = true; }
    return function (target, propertyKey, descriptor) {
        if (descriptor === void 0) { descriptor = {
            writable: true,
            configurable: true
        }; }
        descriptor.enumerable = value;
        return descriptor;
    };
}
exports.Enumerable = Enumerable;
//# sourceMappingURL=enumerable.js.map