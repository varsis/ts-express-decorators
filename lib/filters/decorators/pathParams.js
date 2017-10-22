"use strict";
/**
 * @module common/filters
 */ /** */
Object.defineProperty(exports, "__esModule", { value: true });
var ParamRegistry_1 = require("../../mvc/registries/ParamRegistry");
var PathParamsFilter_1 = require("../components/PathParamsFilter");
/**
 * PathParams return the value from [request.params](http://expressjs.com/en/4x/api.html#req.params) object.
 *
 * #### Example
 *
 * ```typescript
 * @Controller('/')
 * class MyCtrl {
 *    @Get('/')
 *    get(@PathParams() params: any) {
 *       console.log('Entire params', params);
 *    }
 *
 *    @Get('/')
 *    get(@PathParams('id') id: string) {
 *       console.log('ID', id);
 *    }
 * }
 * ```
 * > For more information on deserialization see [converters](docs/converters.md) page.
 *
 * @param expression The path of the property to get.
 * @param useType The type of the class that to be used to deserialize the data.
 * @decorator
 * @returns {Function}
 */
function PathParams(expression, useType) {
    return function (target, propertyKey, parameterIndex) {
        if (typeof parameterIndex === "number") {
            ParamRegistry_1.ParamRegistry.useFilter(PathParamsFilter_1.PathParamsFilter, {
                target: target,
                propertyKey: propertyKey,
                parameterIndex: parameterIndex,
                expression: expression,
                useType: useType
            });
        }
    };
}
exports.PathParams = PathParams;
//# sourceMappingURL=pathParams.js.map