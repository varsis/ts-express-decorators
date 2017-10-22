import { EndpointMetadata } from "../class/EndpointMetadata";
import { IMiddleware } from "../interfaces";
/**
 * @private
 * @middleware
 */
export declare class AcceptMimesMiddleware implements IMiddleware {
    use(endpoint: EndpointMetadata, request: any): void;
}
