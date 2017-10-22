"use strict";
/**
 * @module common/filters
 */ /** */
Object.defineProperty(exports, "__esModule", { value: true });
var FilterRegistry_1 = require("../registries/FilterRegistry");
/**
 * Filter decorator declare a class as new Filter component.
 *
 * See [filters](docs/filters.md) section for more information.
 * @returns {(target:any)=>undefined}
 * @decorator
 */
function Filter() {
    return function (target) {
        FilterRegistry_1.FilterRegistry.merge(target, { provide: target, useClass: target });
    };
}
exports.Filter = Filter;
//# sourceMappingURL=filter.js.map