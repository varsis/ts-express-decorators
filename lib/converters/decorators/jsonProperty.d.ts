import { IPropertyOptions } from "../interfaces/IPropertyOptions";
/**
 * `@JsonProperty()` let you decorate an attribut that can be serialized or deserialized. By default, no parameters are required to use it.
 * But in some cases, we need to configure explicitly the JSON attribut name mapped to the provide attribut.
 * Here an example of different use cases with `@JsonProperty()`:
 *
 * ```typescript
 * provide EventModel {
 *
 *    \@JsonProperty()
 *    name: string;
 *
 *    \@JsonProperty('startDate')
 *    startDate: Date;
 *
 *    \@JsonProperty({name: 'end-date'})
 *    endDate: Date;
 *
 *    \@JsonProperty({use: Task})
 *    tasks: TaskModel[];
 * }
 *
 * provide TaskModel {
 *     subject: string;
 *     rate: number;
 * }
 *
 * > Theses ES6 collections can be used : Map and Set. Map will be serialized as an object and Set as an array.
 * By default Date, Array, Map and Set have a default custom Converter allready embded. But you can override theses (see next part).
 *
 * For the Array, you must add the `{use: type}` option to the decorators.
 * `TypeClass` will be used to deserialize each item in the collection stored on the attribut source.
 *
 * @returns {Function}
 * @decorator
 * @param options
 */
export declare function JsonProperty<T>(options?: IPropertyOptions | string): Function;
