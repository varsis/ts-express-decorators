"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ParamRegistry_1 = require("../../mvc/registries/ParamRegistry");
/**
 * @module common/filters
 */
/** */
var HeaderParamsFilter_1 = require("../components/HeaderParamsFilter");
/**
 * HeaderParams return the value from [request.params](http://expressjs.com/en/4x/api.html#req.params) object.
 *
 * #### Example
 *
 * ```typescript
 * @Controller('/')
 * class MyCtrl {
 *    @Get('/')
 *    get(@Header() body: any) {
 *       console.log('Entire body', body);
 *    }
 *
 *    @Get('/')
 *    get(@Header('x-token') token: string) {
 *       console.log('token', id);
 *    }
 * }
 * ```
 * > For more information on deserialization see [converters](docs/converters.md) page.
 *
 * @param expression The path of the property to get.
 * @decorator
 * @returns {Function}
 */
function HeaderParams(expression) {
    return function (target, propertyKey, parameterIndex) {
        if (typeof parameterIndex === "number") {
            ParamRegistry_1.ParamRegistry.useFilter(HeaderParamsFilter_1.HeaderParamsFilter, {
                target: target,
                propertyKey: propertyKey,
                parameterIndex: parameterIndex,
                expression: expression
            });
        }
    };
}
exports.HeaderParams = HeaderParams;
//# sourceMappingURL=headerParams.js.map