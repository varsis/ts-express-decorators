/**
 * Load the server silently without listening port and configure it on test profile.
 * @decorator
 * @param server
 * @param args
 * @returns {(done:Function)=>undefined}
 */
export declare function bootstrap(server: any, ...args: any[]): (done: Function) => void;
