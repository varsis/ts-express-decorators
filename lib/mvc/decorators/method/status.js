"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Store_1 = require("../../../core/class/Store");
var mapReturnedResponse_1 = require("../../utils/mapReturnedResponse");
/**
 * @module common/mvc
 */
/** */
var useAfter_1 = require("./useAfter");
/**
 * Set the HTTP status for the response. It is a chainable alias of Node’s `response.statusCode`.
 *
 * ```typescript
 * @Status(204)
 * async myMethod() {}
 * ```
 *
 * With swagger description:
 *
 * ```typescript
 * @Status(204, {
 *   type: Model
 *   description: "Description"
 * })
 * @Header('Content-Type', 'application-json')
 * async myMethod() {
 * }
 * ```
 *
 * This example will produce the swagger responses object:
 *
 * ```json
 * {
 *   "responses": {
 *     "404": {
 *       "description": "Description",
 *       "headers": {
 *          "Content-Type": {
 *             "type": "string"
 *          }
 *       }
 *     }
 *   }
 * }
 * ```
 *
 * @param code
 * @param options
 * @returns {Function}
 * @decorator
 */
function Status(code, options) {
    if (options === void 0) { options = {}; }
    return Store_1.Store.decorate(function (store, parameters) {
        store.set("statusCode", code);
        var response = mapReturnedResponse_1.mapReturnedResponse(options);
        store.merge("response", response);
        store.merge("responses", (_a = {}, _a[code] = response, _a));
        return useAfter_1.UseAfter(function (request, response, next) {
            response.status(code);
            next();
        });
        var _a;
    });
}
exports.Status = Status;
//# sourceMappingURL=status.js.map