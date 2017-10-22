"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @module common/mvc
 */
/** */
var routerSettings_1 = require("./routerSettings");
/**
 *
 * @param strict
 * @returns {Function}
 * @decorator
 */
function Strict(strict) {
    return routerSettings_1.RouterSettings({ strict: strict });
}
exports.Strict = Strict;
//# sourceMappingURL=strict.js.map