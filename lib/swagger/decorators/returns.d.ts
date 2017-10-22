import { Type } from "../../core/interfaces";
import { ISwaggerResponses } from "../interfaces/ISwaggerResponses";
/**
 * Add responses documentation for a specific status code.
 *
 * ## Examples
 * ## With status code
 *
 * ```typescript
 *  @Returns(404, {description: "Not found"})
 *  @Returns(200, {description: "OK", type: Model})
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
 *     "404": {
 *       "description": "Description"
 *     },
 *     "2OO": {
 *       "description": "Description",
 *       "schema": {"schemaOfModel": "..."}
 *     }
 *   }
 * }
 * ```
 *
 * ### Without status code
 *
 * Returns can be use without status code. In this case, the response will be added to the default status code
 * (200 or the status code seated with `@Status`).
 *
 * ```typescript
 *  @Returns({description: "Description"})
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
 *       "description": "Description"
 *     }
 *   }
 * }
 * ```
 *
 * ### With type schema
 *
 * Returns accept another signature with a type.
 *
 * ```typescript
 *  @Returns(Model, {description: "Description"}) //OR
 *  @Returns(Model)
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
 *       "schema": {"schemaOfModel": "..."}
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
export declare function Returns(statusCode: number, options: ISwaggerResponses): any;
export declare function Returns(options: ISwaggerResponses): any;
export declare function Returns(model: Type<any>): any;
export declare function Returns(model: Type<any>, options: ISwaggerResponses): any;
