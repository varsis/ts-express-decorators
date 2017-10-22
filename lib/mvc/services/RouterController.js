"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * RouteController give the express Router use by the decorated controller.
 */
var RouterController = /** @class */ (function () {
    function RouterController(router) {
        this.router = router;
    }
    /**
     * Return the Express.Router.
     * @returns {Express.Router}
     */
    RouterController.prototype.getRouter = function () {
        return this.router;
    };
    return RouterController;
}());
exports.RouterController = RouterController;
//# sourceMappingURL=RouterController.js.map