"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Store_1 = require("../../../core/class/Store");
/**
 * @module common/mvc
 */
/** */
var useAfter_1 = require("./useAfter");
/**
 * Sets the Content-Type HTTP header to the MIME type as determined by mime.lookup() for the specified type.
 * If type contains the “/” character, then it sets the `Content-Type` to type.
 *
 * ```typescript
 *  @ContentType('.html');              // => 'text/html'
 *  @ContentType('html');               // => 'text/html'
 *  @ContentType('json');               // => 'application/json'
 *  @ContentType('application/json');   // => 'application/json'
 *  @ContentType('png');                // => image/png
 *  private myMethod() {}
 * ```
 *
 * @param type
 * @returns {Function}
 * @decorator
 */
function ContentType(type) {
    return Store_1.Store.decorate(function (store) {
        store.merge("produces", type);
        return useAfter_1.UseAfter(function (request, response, next) {
            response.type(type);
            next();
        });
    });
}
exports.ContentType = ContentType;
//# sourceMappingURL=contentType.js.map