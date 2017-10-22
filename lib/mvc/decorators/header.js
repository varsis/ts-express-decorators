"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts_log_debug_1 = require("ts-log-debug");
var Store_1 = require("../../core/class/Store");
var headerParams_1 = require("../../filters/decorators/headerParams");
var mapHeaders_1 = require("../utils/mapHeaders");
var useAfter_1 = require("./method/useAfter");
/**
 * Sets the response’s HTTP header field to value. To set multiple fields at once, pass an object as the parameter.
 *
 * ```typescript
 * @Header('Content-Type', 'text/plain');
 * private myMethod() {}
 *
 * @Status(204)
 * @Header({
 *   "Content-Type": "text/plain",
 *   "Content-Length": 123,
 *   "ETag": {
 *     "value": "12345",
 *     "description": "header description"
 *   }
 * })
 * private myMethod() {}
 * ```
 *
 * This example will produce the swagger responses object:
 *
 * ```json
 * {
 *   "responses": {
 *     "204": {
 *       "description": "Description",
 *       "headers": {
 *          "Content-Type": {
 *             "type": "string"
 *          },
 *          "Content-Length": {
 *             "type": "number"
 *          },
 *          "ETag": {
 *             "type": "string",
 *             "description": "header description"
 *          }
 *       }
 *     }
 *   }
 * }
 * ```
 *
 * @param headerName
 * @param headerValue
 * @returns {Function}
 * @decorator
 */
function Header(headerName, headerValue) {
    return function (target, propertyKey, descriptor) {
        if (typeof descriptor === "number") {
            ts_log_debug_1.$log.warn("@Header() decorator use on parameter is deprecated. Use HeaderParams instead of");
            return headerParams_1.HeaderParams(headerName)(target, propertyKey, descriptor);
        }
        if (headerValue !== undefined) {
            headerName = (_a = {}, _a[headerName] = headerValue, _a);
        }
        // metadata
        var store = Store_1.Store.from(target, propertyKey, descriptor);
        var headers = mapHeaders_1.mapHeaders(headerName);
        store.merge("response", { headers: headers });
        return useAfter_1.UseAfter(function (request, response, next) {
            Object.keys(headers).forEach(function (key) {
                response.set(key, headers[key].value);
            });
            next();
        })(target, propertyKey, descriptor);
        var _a;
    };
}
exports.Header = Header;
//# sourceMappingURL=header.js.map