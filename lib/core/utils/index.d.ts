/**
 * @module common/core
 */
/** */
import { DecoratorParameters } from "../interfaces";
/**
 * Get the provide constructor.
 * @param targetClass
 */
export declare const getContructor: (targetClass: any) => Function;
/**
 * Get the provide constructor if target is an instance.
 * @param target
 * @returns {*}
 */
export declare function getClass(target: any): any;
/**
 *
 * @param target
 * @returns {symbol}
 */
export declare function getClassOrSymbol(target: any): any;
/**
 * Return true if the given obj is a primitive.
 * @param target
 * @returns {boolean}
 */
export declare function isPrimitiveOrPrimitiveClass(target: any): boolean;
/**
 * Return true if the clazz is an array.
 * @param target
 * @returns {boolean}
 */
export declare function isArrayOrArrayClass(target: any): boolean;
/**
 * Return true if the target.
 * @param target
 * @returns {boolean}
 */
export declare function isCollection(target: any): boolean;
/**
 * Return true if the value is an empty string, null or undefined.
 * @param value
 * @returns {boolean}
 */
export declare function isEmpty(value: any): boolean;
/**
 * Get object name
 */
export declare const nameOf: (obj: any) => string;
/**
 * Get the provide name.
 * @param targetClass
 */
export declare const nameOfClass: (targetClass: any) => any;
/**
 * Get symbol name.
 * @param sym
 */
export declare const nameOfSymbol: (sym: symbol) => string;
export declare function deepExtends(out: any, obj: any, reducers?: {
    [key: string]: (collection: any[], value: any) => any;
}): any;
export declare function isPromise(target: any): boolean;
export declare function getInheritedClass(target: any): any;
export declare function getDecoratorType(args: any[]): "parameter" | "property" | "method" | "class";
export declare function descriptorOf(target: any, propertyKey: string): PropertyDescriptor;
export declare function decoratorArgs(target: any, propertyKey: string): DecoratorParameters;
export declare function applyBefore(target: any, name: string, callback: Function): void;
