/**
 * @module common/core
 */ /** */
/**
 * An example of a `Type` is `MyCustomComponent` filters, which in JavaScript is be represented by
 * the `MyCustomComponent` constructor function.
 */
export declare const Type: FunctionConstructor;
export interface Type<T> extends Function {
    new (...args: any[]): T;
}
