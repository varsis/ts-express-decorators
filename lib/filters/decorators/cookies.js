"use strict";
/**
 * @module common/filters
 */ /** */
Object.defineProperty(exports, "__esModule", { value: true });
var ParamRegistry_1 = require("../../mvc/registries/ParamRegistry");
var CookiesFilter_1 = require("../components/CookiesFilter");
/**
 * Cookies o CookiesParams return the value from [request.cookies](http://expressjs.com/en/4x/api.html#req.cookies) object.
 *
 * #### Example
 *
 * ```typescript
 * @Controller('/')
 * class MyCtrl {
 *    @Post('/')
 *    create(@Cookies() cookies: any) {
 *       console.log('Entire cookies', cookies);
 *    }
 *
 *    @Post('/')
 *    create(@Cookies('id') id: string) {
 *       console.log('ID', id);
 *    }
 *
 *    @Post('/')
 *    create(@Cookies('user') user: User) { // with deserialization
 *       console.log('user', user);
 *    }
 *
 *    @Post('/')
 *    create(@Cookies('users', User) users: User[]) { // with deserialization
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
function CookiesParams(expression, useType) {
    return function (target, propertyKey, parameterIndex) {
        if (typeof parameterIndex === "number") {
            ParamRegistry_1.ParamRegistry.useFilter(CookiesFilter_1.CookiesFilter, {
                target: target,
                propertyKey: propertyKey,
                parameterIndex: parameterIndex,
                expression: expression,
                useType: useType
            });
        }
    };
}
exports.CookiesParams = CookiesParams;
/**
 * Cookies o CookiesParams return the value from [request.cookies](http://expressjs.com/en/4x/api.html#req.cookies) object.
 *
 * #### Example
 *
 * ```typescript
 * @Controller('/')
 * class MyCtrl {
 *    @Post('/')
 *    create(@Cookies() body: any) {
 *       console.log('Entire body', body);
 *    }
 *
 *    @Post('/')
 *    create(@Cookies('id') id: string) {
 *       console.log('ID', id);
 *    }
 *
 *    @Post('/')
 *    create(@Cookies('user') user: User) { // with deserialization
 *       console.log('user', user);
 *    }
 *
 *    @Post('/')
 *    create(@Cookies('users', User) users: User[]) { // with deserialization
 *       console.log('users', users);
 *    }
 * }
 * ```
 * > For more information on deserialization see [converters](docs/converters.md) page.
 *
 * @param expression The path of the property to get.
 * @param useType The type of the class that to be used to deserialize the data.
 * @decorator
 * @aliasof CookiesParams
 * @returns {Function}
 */
function Cookies(expression, useType) {
    return CookiesParams(expression, useType);
}
exports.Cookies = Cookies;
//# sourceMappingURL=cookies.js.map