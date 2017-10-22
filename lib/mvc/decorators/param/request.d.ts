/**
 * Request service.
 * @returns {function(Function, (string|symbol), number): void}
 * @decorator
 */
export declare function Request(): Function;
/**
 * Request service.
 * @returns {function(Function, (string|symbol), number): void}
 * @decorator
 * @alias Request
 */
export declare function Req(): (target: any, propertyKey: string | symbol, parameterIndex: number) => void;
