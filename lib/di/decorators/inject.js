"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Metadata_1 = require("../../core/class/Metadata");
var InjectorService_1 = require("../services/InjectorService");
function Inject(symbol) {
    return function (target, targetKey, descriptor) {
        if (typeof descriptor === "number") {
            if (symbol) {
                var paramTypes = Metadata_1.Metadata.getParamTypes(target, targetKey);
                paramTypes[descriptor] = symbol;
                Metadata_1.Metadata.setParamTypes(target, targetKey, paramTypes);
            }
        }
        else {
            // save a reference to the original method this way we keep the values currently in the
            // descriptor and don't overwrite what another decorator might have done to the descriptor.
            /* istanbul ignore next */
            if (descriptor === undefined) {
                descriptor = Object.getOwnPropertyDescriptor(target, targetKey);
            }
            var originalMethod_1 = descriptor.value;
            descriptor.value = function (locals) {
                if (locals === void 0) { locals = new Map(); }
                /* istanbul ignore next */
                if (locals instanceof Map === false) {
                    locals = new Map();
                }
                return InjectorService_1.InjectorService.invokeMethod(originalMethod_1.bind(this), {
                    target: target,
                    methodName: targetKey,
                    locals: locals
                });
            };
            descriptor.value.$injected = true;
            return descriptor;
        }
    };
}
exports.Inject = Inject;
//# sourceMappingURL=inject.js.map