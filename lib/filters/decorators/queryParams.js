"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ParamRegistry_1 = require("../../mvc/registries/ParamRegistry");
var QueryParamsFilter_1 = require("../components/QueryParamsFilter");
/**
 * QueryParams return the value from [request.query](http://expressjs.com/en/4x/api.html#req.query) object.
 *
 * #### Example
 *
 * ```typescript
 * @Controller('/')
 * class MyCtrl {
 *    @Get('/')
 *    get(@QueryParams() query: any) {
 *       console.log('Entire query', query);
 *    }
 *
 *    @Get('/')
 *    get(@QueryParams('id') id: string) {
 *       console.log('ID', id);
 *    }
 *
 *    @Get('/')
 *    get(@QueryParams('user') user: User) { // with deserialization
 *       console.log('user', user);
 *    }
 *
 *    @Get('/')
 *    get(@QueryParams('users', User) users: User[]) { // with deserialization
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
function QueryParams(expression, useType) {
    return function (target, propertyKey, parameterIndex) {
        if (typeof parameterIndex === "number") {
            ParamRegistry_1.ParamRegistry.useFilter(QueryParamsFilter_1.QueryParamsFilter, {
                target: target,
                propertyKey: propertyKey,
                parameterIndex: parameterIndex,
                expression: expression,
                useType: useType
            });
        }
    };
}
exports.QueryParams = QueryParams;
//# sourceMappingURL=queryParams.js.map