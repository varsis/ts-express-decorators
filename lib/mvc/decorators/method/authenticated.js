"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Store_1 = require("../../../core/class/Store");
var AuthenticatedMiddleware_1 = require("../../components/AuthenticatedMiddleware");
/**
 * @module common/mvc
 */
/** */
var useBefore_1 = require("./useBefore");
/**
 * Set authentification strategy on your endpoint.
 *
 * ```typescript
 * @ControllerProvider('/mypath')
 * provide MyCtrl {
 *
 *   @Get('/')
 *   @Authenticated({role: 'admin'})
 *   public getResource(){}
 * }
 * ```
 *
 * @param options
 * @returns {Function}
 * @decorator
 */
function Authenticated(options) {
    return Store_1.Store.decorate(function (store) {
        store
            .set(AuthenticatedMiddleware_1.AuthenticatedMiddleware, options)
            .merge("responses", { "403": { description: "Forbidden" } });
        return useBefore_1.UseBefore(AuthenticatedMiddleware_1.AuthenticatedMiddleware);
    });
}
exports.Authenticated = Authenticated;
//# sourceMappingURL=authenticated.js.map