/**
 * Add security metadata on the decorated method.
 *
 * ## Examples
 * ### On method
 *
 * ```typescript
 * @Controller("/")
 * class ModelCtrl {
 *    @Security("write:calendars")
 *    async method() {}
 * }
 * ```
 *
 * @param {string} securityDefinitionName
 * @param {string} scopes
 * @returns {(...args: any[]) => any}
 * @constructor
 */
export declare function Security(securityDefinitionName: string, ...scopes: string[]): (...args: any[]) => any;
