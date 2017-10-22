"use strict";
/**
 * @module common/core
 */
/** */
Object.defineProperty(exports, "__esModule", { value: true });
function Writable(value) {
    if (value === void 0) { value = true; }
    return function (target, propertyKey, descriptor) {
        if (descriptor === void 0) { descriptor = {
            enumerable: true,
            configurable: true
        }; }
        descriptor.writable = value;
        return descriptor;
    };
}
exports.Writable = Writable;
//# sourceMappingURL=writable.js.map