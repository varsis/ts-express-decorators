import { EndpointMetadata } from "../../mvc/class/EndpointMetadata";
import { IMiddleware } from "../../mvc/interfaces";
import { ServerSettingsService } from "../../server/services/ServerSettingsService";
/**
 * @private
 * @middleware
 */
export declare class MultipartFileMiddleware implements IMiddleware {
    private serverSettingsService;
    private multer;
    constructor(serverSettingsService: ServerSettingsService);
    /**
     *
     * @param endpoint
     * @param request
     * @param response
     * @param next
     * @returns {any}
     */
    use(endpoint: EndpointMetadata, request: Express.Request, response: Express.Response, next: Express.NextFunction): any;
}
