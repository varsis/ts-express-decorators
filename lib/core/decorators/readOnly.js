"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @module common/core
 */
var writable_1 = require("./writable");
/** */
function Readonly() {
    return writable_1.Writable(false);
}
exports.Readonly = Readonly;
//# sourceMappingURL=readOnly.js.map