"use strict";
/**
 * @module common/mvc
 */
/** */
Object.defineProperty(exports, "__esModule", { value: true });
var routerSettings_1 = require("./routerSettings");
/**
 *
 * @param mergeParams
 * @returns {Function}
 * @decorator
 */
function MergeParams(mergeParams) {
    if (mergeParams === void 0) { mergeParams = true; }
    return routerSettings_1.RouterSettings({ mergeParams: mergeParams });
}
exports.MergeParams = MergeParams;
//# sourceMappingURL=mergeParams.js.map