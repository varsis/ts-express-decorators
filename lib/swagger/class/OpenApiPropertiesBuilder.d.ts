/**
 * @module swagger
 */
/** */
import { Schema, Response } from "swagger-schema-official";
import { Storable } from "../../core/class/Storable";
import { Type } from "../../core/interfaces";
/**
 * Builder a Schema from a target.
 */
export declare class OpenApiPropertiesBuilder {
    private target;
    protected _definitions: {
        [definitionsName: string]: Schema;
    };
    protected _responses: {
        [responseName: string]: Response;
    };
    protected _schema: Schema;
    constructor(target: Type<any>);
    /**
     *
     * @returns {OpenApiSchemaBuilder}
     */
    build(): this;
    protected createSchema(model: Storable): Schema;
    readonly schema: Schema;
    readonly definitions: {
        [p: string]: Schema;
    };
    readonly responses: {
        [responseName: string]: Response;
    };
}
