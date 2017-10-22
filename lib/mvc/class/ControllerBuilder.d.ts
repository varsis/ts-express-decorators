import { IRouterOptions } from "../interfaces";
import { ControllerProvider } from "./ControllerProvider";
export declare class ControllerBuilder {
    private provider;
    private defaultRoutersOptions;
    constructor(provider: ControllerProvider, defaultRoutersOptions?: IRouterOptions);
    /**
     *
     * @returns {any}
     */
    build(): this;
    private buildMiddlewares(middlewares);
}
