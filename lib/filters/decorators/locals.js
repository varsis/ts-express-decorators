"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ParamRegistry_1 = require("../../mvc/registries/ParamRegistry");
var LocalsFilter_1 = require("../components/LocalsFilter");
/**
 * Locals return the value from [response.locals](http://expressjs.com/en/4x/api.html#res.locals) object.
 *
 * #### Example
 *
 * ```typescript
 * @Controller('/')
 * class MyCtrl {
 *    @Get('/')
 *    get(@Locals() locals: any) {
 *       console.log('Entire locals', locals);
 *    }
 *
 *    @Get('/')
 *    get(@Locals('user') user: any) {
 *       console.log('user', user);
 *    }
 * }
 * ```
 * > For more information on deserialization see [converters](docs/converters.md) page.
 *
 * @param expression The path of the property to get.
 * @decorator
 * @returns {Function}
 */
function Locals(expression) {
    return function (target, propertyKey, parameterIndex) {
        if (typeof parameterIndex === "number") {
            ParamRegistry_1.ParamRegistry.useFilter(LocalsFilter_1.LocalsFilter, {
                target: target,
                propertyKey: propertyKey,
                parameterIndex: parameterIndex,
                expression: expression,
                useConverter: false
            });
        }
    };
}
exports.Locals = Locals;
//# sourceMappingURL=locals.js.map