"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ParamRegistry_1 = require("../../mvc/registries/ParamRegistry");
/**
 * @module common/filters
 */
/** */
var BodyParamsFilter_1 = require("../components/BodyParamsFilter");
/**
 * BodyParams return the value from [request.body](http://expressjs.com/en/4x/api.html#req.body) object.
 *
 * #### Example
 *
 * ```typescript
 * @Controller('/')
 * class MyCtrl {
 *    @Post('/')
 *    create(@BodyParams() body: any) {
 *       console.log('Entire body', body);
 *    }
 *
 *    @Post('/')
 *    create(@BodyParams('id') id: string) {
 *       console.log('ID', id);
 *    }
 *
 *    @Post('/')
 *    create(@BodyParams('user') user: User) { // with deserialization
 *       console.log('user', user);
 *    }
 *
 *    @Post('/')
 *    create(@BodyParams('users', User) users: User[]) { // with deserialization
 *       console.log('users', users);
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
function BodyParams(expression, useType) {
    return function (target, propertyKey, parameterIndex) {
        if (typeof parameterIndex === "number") {
            ParamRegistry_1.ParamRegistry.useFilter(BodyParamsFilter_1.BodyParamsFilter, {
                target: target,
                propertyKey: propertyKey,
                parameterIndex: parameterIndex,
                expression: expression,
                useType: useType
            });
        }
    };
}
exports.BodyParams = BodyParams;
//# sourceMappingURL=bodyParams.js.map