/**
 * `@Converter(...targetTypes)` let you to define some converters for a certain type/Class.
 * It usefull for a generic conversion.
 *
 * @param classes
 * @returns {(customConverter?:any)=>undefined}
 * @decorator
 */
export declare function Converter(...classes: any[]): Function;
