import { EndpointMetadata } from "./EndpointMetadata";
/**
 *
 */
export declare class EndpointBuilder {
    private endpoint;
    private router;
    constructor(endpoint: EndpointMetadata, router: any);
    /**
     *
     */
    private onRequest;
    /**
     *
     * @param middlewares
     */
    private routeMiddlewares(middlewares);
    /**
     *
     * @returns {any[]}
     * @param invokable
     */
    build(): any;
}
