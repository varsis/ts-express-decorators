/// <reference types="express" />
/**
 * @module common/mvc
 */
/** */
import * as Express from "express";
/**
 * RouteController give the express Router use by the decorated controller.
 */
export declare class RouterController {
    private router;
    constructor(router: Express.Router);
    /**
     * Return the Express.Router.
     * @returns {Express.Router}
     */
    getRouter(): Express.Router;
}
