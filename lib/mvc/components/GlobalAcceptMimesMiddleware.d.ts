import { ServerSettingsService } from "../../server/services/ServerSettingsService";
import { IMiddleware } from "../interfaces/index";
/**
 * @middleware
 */
export declare class GlobalAcceptMimesMiddleware implements IMiddleware {
    private serverSettingsService;
    constructor(serverSettingsService: ServerSettingsService);
    use(request: any): void;
}
