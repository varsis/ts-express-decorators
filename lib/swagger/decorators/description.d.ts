/**
 * Add a description metadata on the decorated element.
 *
 * ## Examples
 * ### On class
 *
 * ```typescript
 * @Description("description")
 * class Model {
 *
 * }
 * ```
 *
 * ### On method
 *
 * ```typescript
 * @Controller("/")
 * class ModelCtrl {
 *    @Description("description")
 *    async method() {}
 * }
 * ```
 *
 * ### On parameter
 *
 * ```typescript
 * @Controller("/")
 * class ModelCtrl {
 *    async method(@Description("description") @PathParam("id") id: string) {}
 * }
 * ```
 *
 * ### On property
 *
 * ```typescript
 * class Model {
 *    @Description("description")
 *    id: string;
 * }
 * ```
 *
 * @param {string} description
 * @returns {Function}
 * @decorator
 */
export declare function Description(description: string): (...args: any[]) => any;
