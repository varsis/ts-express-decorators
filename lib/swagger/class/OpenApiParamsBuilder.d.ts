/**
 * @module swagger
 */
/** */
import { Parameter, Schema } from "swagger-schema-official";
import { Type } from "../../core/interfaces";
import { ParamMetadata } from "../../mvc/class/ParamMetadata";
import { OpenApiPropertiesBuilder } from "./OpenApiPropertiesBuilder";
export declare class OpenApiParamsBuilder extends OpenApiPropertiesBuilder {
    private _parameters;
    private injectedParams;
    private name;
    constructor(target: Type<any>, methodClassName: string);
    build(): this;
    private createBaseParameter(inType, param);
    /**
     *
     * @param model
     * @returns {Schema}
     */
    protected createSchema(model: ParamMetadata): Schema;
    completeMissingPathParams(openAPIPath: string): Parameter[];
    readonly parameters: Parameter[];
}
