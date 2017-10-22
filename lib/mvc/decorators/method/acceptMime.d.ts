/**
 * Set a mime list as acceptable for a request on a specific endpoint.
 *
 * ```typescript
 *  @ControllerProvider('/mypath')
 *  provide MyCtrl {
 *
 *    @Get('/')
 *    @AcceptMime('application/json')
 *    public getResource(){}
 *  }
 * ```
 *
 * @param mimes
 * @returns {Function}
 * @decorator
 */
export declare function AcceptMime(...mimes: string[]): Function;
