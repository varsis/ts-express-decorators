/**
 * Add deprecated metadata on the decorated element.
 *
 * ## Examples
 * ### On method
 *
 * ```typescript
 * class Model {
 *    @Deprecated()
 *    id: string;
 * }
 * ```
 *
 * @returns {Function}
 * @constructor
 */
export declare function Deprecated(): (...args: any[]) => any;
