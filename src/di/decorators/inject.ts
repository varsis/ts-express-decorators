import {Metadata} from "../../core/class/Metadata";
/**
 * @module common/di
 */
/** */
import {Type} from "../../core/interfaces";
import {InjectorService} from "../services/InjectorService";
import {descriptorOf} from "../../core/utils";

export function Inject(symbol?: any): Function {

    return <T>(target: Type<T>, targetKey: string, descriptor: TypedPropertyDescriptor<Function> | number): any => {

        if (typeof descriptor === "number") {
            if (symbol) {
                const paramTypes = Metadata.getParamTypes(target, targetKey);

                paramTypes[descriptor] = symbol;

                Metadata.setParamTypes(target, targetKey, paramTypes);
            }
        } else {
            // save a reference to the original method this way we keep the values currently in the
            // descriptor and don't overwrite what another decorator might have done to the descriptor.
            /* istanbul ignore next */
            if (descriptor === undefined) {
                descriptor = descriptorOf(target, targetKey);
            }

            const originalMethod = descriptor.value;

            descriptor.value = function(locals: Map<Function, string> = new Map<Function, string>()) {

                /* istanbul ignore next */
                if (locals instanceof Map === false) {
                    locals = new Map();
                }

                return InjectorService.invokeMethod(originalMethod!.bind(this), {
                    target,
                    methodName: targetKey,
                    locals
                });
            };

            (descriptor.value as any).$injected = true;

            return descriptor;
        }


    };
}
