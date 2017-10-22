import { IControllerRoute } from "../interfaces";
import { ControllerService } from "./ControllerService";
/**
 * `RouteService` is used to provide all routes collected by annotation `@ControllerProvider`.
 */
export declare class RouteService {
    private controllerService;
    constructor(controllerService: ControllerService);
    $afterRoutesInit(): void;
    /**
     * Get all routes builded by TsExpressDecorators and mounted on Express application.
     * @returns {IControllerRoute[]}
     */
    getRoutes(): IControllerRoute[];
    /**
     * Sort controllers infos.
     * @param routeA
     * @param routeB
     * @returns {number}
     */
    private sort;
    /**
     *
     * @param routes
     * @param ctrl
     * @param endpointUrl
     */
    private buildRoutes;
    /**
     * Print all route mounted in express via Annotation.
     */
    printRoutes(logger?: {
        info: (s: any) => void;
    }): void;
    /**
     * Return all Routes stored in ControllerProvider manager.
     * @returns {IControllerRoute[]}
     */
    getAll(): IControllerRoute[];
}
