/**
 * @module servestatic
 */
/** */
import { ExpressApplication } from "../../core/services/ExpressApplication";
import { ServerSettingsService } from "../../server/services/ServerSettingsService";
export declare class ServeStaticService {
    private expressApp;
    private serverSettingsService;
    constructor(expressApp: ExpressApplication, serverSettingsService: ServerSettingsService);
    $afterRoutesInit(): void;
    mount(path: string, directory: string): void;
}
