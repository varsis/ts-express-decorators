import { Type } from "../../core/interfaces";
import { ISwaggerResponses } from "../interfaces/ISwaggerResponses";
/**
 * Add responses documentation for a specific status code.
 *
 * ## Examples
 * ## With status code
 *
 * ```typescript
 *  @ReturnsArray(200, {description: "OK", type: Model})
 *  async myMethod(): Promise<Model>  {
 *
 *  }
 * ```
 *
 * This example will produce this documentation in swagger:
 *
 * ```json
 * {
 *   "responses": {
 *     "2OO": {
 *       "description": "Description",
 *       "schema": {"type": "array"}
 *     }
 *   }
 * }
 * ```
 *
 * ### Without status code
 *
 * ReturnsArray can be use without status code. In this case, the response will be added to the default status code
 * (200 or the status code seated with `@Status`).
 *
 * ```typescript
 *  @ReturnsArray({description: "Description"})
 *  async myMethod(): Promise<Model>  {
 *
 *  }
 * ```
 *
 * This example will produce this documentation in swagger:
 *
 * ```json
 * {
 *   "responses": {
 *     "200": {
 *       "description": "Description",
 *       "schema": {"type": "array"}
 *     }
 *   }
 * }
 * ```
 *
 * ### With type schema
 *
 * ReturnsArray accept another signature with a type.
 *
 * ```typescript
 *  @ReturnsArray(Model, {description: "Description"}) //OR
 *  @ReturnsArray(Model)
 *  async myMethod(): Promise<Model>  {
 *
 *  }
 * ```
 *
 * This example will produce this documentation in swagger:
 *
 * ```json
 * {
 *   "responses": {
 *     "200": {
 *       "description": "Description",
 *       "schema": {
 *         "type": "array",
 *         "items": {
 *           $ref: "Model"
 *         }
 *       }
 *     }
 *   }
 * }
 * ```
 *
 * @returns {Function}
 * @decorator
 * @param statusCode Code status
 * @param options Swagger responses documentations
 */
export declare function ReturnsArray(statusCode: number, options: ISwaggerResponses): any;
export declare function ReturnsArray(options: ISwaggerResponses): any;
export declare function ReturnsArray(model: Type<any>): any;
export declare function ReturnsArray(model: Type<any>, options: ISwaggerResponses): any;
