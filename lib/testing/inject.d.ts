/**
 * The inject function is one of the TsExpressDecorator testing utilities.
 * It injects services into the test function where you can alter, spy on, and manipulate them.
 *
 * The inject function has two parameters
 *
 * * an array of Service dependency injection tokens,
 * * a test function whose parameters correspond exactly to each item in the injection token array.
 *
 * @param targets
 * @param func
 * @returns {any}
 */
export declare function inject(targets: any[], func: Function): (done: Function) => void;
