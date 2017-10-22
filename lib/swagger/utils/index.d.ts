/**
 * @module swagger
 */
/** */
import { PathParamsType } from "../../mvc/interfaces/PathParamsType";
/** */
export declare function toSwaggerPath(expressPath: PathParamsType): PathParamsType;
export declare function isBasicType(type: any): boolean;
export declare function swaggerType(type: any): string;
export declare function getReducers(): {
    [key: string]: (collection: any[], value: any) => any;
};
