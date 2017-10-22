"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../../../core/utils/index");
/**
 * @module common/mvc
 */
/** */
var ControllerRegistry_1 = require("../../registries/ControllerRegistry");
/**
 * Declare a new controller with his Rest path. His methods annotated will be collected to build the routing list.
 * This routing listing will be built with the `express.Router` object.
 *
 * ```typescript
 *  @Controller("/calendars")
 *  export provide CalendarCtrl {
 *
 *    @Get("/:id")
 *    public get(
 *      @Request() request: Express.Request,
 *      @Response() response: Express.Response,
 *      @Next() next: Express.NextFunction
 *    ): void {
 *
 *    }
 *  }
 * ```
 *
 * @param path
 * @param dependencies
 * @returns {Function}
 * @decorator
 */
function Controller(path) {
    var dependencies = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        dependencies[_i - 1] = arguments[_i];
    }
    return function (target) {
        if (typeof path === "string" || path instanceof RegExp || index_1.isArrayOrArrayClass(path)) {
            ControllerRegistry_1.ControllerRegistry.merge(target, { path: path, dependencies: dependencies });
        }
        else {
            ControllerRegistry_1.ControllerRegistry.merge(target, path);
        }
    };
}
exports.Controller = Controller;
//# sourceMappingURL=controller.js.map