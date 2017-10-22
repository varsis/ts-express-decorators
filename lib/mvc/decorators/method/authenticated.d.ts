/**
 * Set authentification strategy on your endpoint.
 *
 * ```typescript
 * @ControllerProvider('/mypath')
 * provide MyCtrl {
 *
 *   @Get('/')
 *   @Authenticated({role: 'admin'})
 *   public getResource(){}
 * }
 * ```
 *
 * @param options
 * @returns {Function}
 * @decorator
 */
export declare function Authenticated(options?: any): Function;
