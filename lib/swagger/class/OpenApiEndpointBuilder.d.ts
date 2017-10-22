import { Path } from "swagger-schema-official";
import { EndpointMetadata } from "../../mvc/class/EndpointMetadata";
import { OpenApiPropertiesBuilder } from "./OpenApiPropertiesBuilder";
export declare class OpenApiEndpointBuilder extends OpenApiPropertiesBuilder {
    private endpoint;
    private endpointUrl;
    private _paths;
    constructor(endpoint: EndpointMetadata, endpointUrl: string);
    build(): this;
    /**
     *
     * @returns {string}
     */
    private getTagName();
    /**
     *
     * @param {string | number} code
     * @param options
     * @returns {Response}
     */
    private createResponse(code, options);
    /**
     *
     * @returns {}
     */
    readonly paths: {
        [p: string]: Path;
    };
}
