/**
 * Response service.
 * @returns {function(Function, (string|symbol), number): void}
 * @decorator
 */
export declare function Response(): Function;
/**
 * Request service.
 * @returns {function(Function, (string|symbol), number): void}
 * @decorator
 * @alias Request
 */
export declare function Res(): (target: any, propertyKey: string | symbol, parameterIndex: number) => void;
