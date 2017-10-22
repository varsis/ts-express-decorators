"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @module common/mvc
 */
/** */
var routerSettings_1 = require("./routerSettings");
/**
 *
 * @param caseSensitive
 * @returns {Function}
 * @decorator
 */
function CaseSensitive(caseSensitive) {
    return routerSettings_1.RouterSettings({ caseSensitive: caseSensitive });
}
exports.CaseSensitive = CaseSensitive;
//# sourceMappingURL=caseSensitive.js.map