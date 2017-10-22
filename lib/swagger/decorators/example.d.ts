/**
 * Add a example metadata on the decorated element.
 *
 * @param {string} name
 * @param {string} description
 * @returns {(...args: any[]) => any}
 * @decorator
 */
export declare function Example(name: string, description?: string): (...args: any[]) => any;
