"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Store_1 = require("../../../core/class/Store");
var AcceptMimesMiddleware_1 = require("../../components/AcceptMimesMiddleware");
/**
 * @module common/mvc
 */
/** */
var useBefore_1 = require("./useBefore");
/**
 * Set a mime list as acceptable for a request on a specific endpoint.
 *
 * ```typescript
 *  @ControllerProvider('/mypath')
 *  provide MyCtrl {
 *
 *    @Get('/')
 *    @AcceptMime('application/json')
 *    public getResource(){}
 *  }
 * ```
 *
 * @param mimes
 * @returns {Function}
 * @decorator
 */
function AcceptMime() {
    var mimes = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        mimes[_i] = arguments[_i];
    }
    return Store_1.Store.decorate(function (store, parameters) {
        store.set(AcceptMimesMiddleware_1.AcceptMimesMiddleware, mimes);
        return useBefore_1.UseBefore(AcceptMimesMiddleware_1.AcceptMimesMiddleware);
    });
}
exports.AcceptMime = AcceptMime;
//# sourceMappingURL=acceptMime.js.map