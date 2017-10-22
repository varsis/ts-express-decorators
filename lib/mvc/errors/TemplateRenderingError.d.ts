/**
 * @module common/mvc
 */ /** */
import { InternalServerError } from "ts-httpexceptions";
import { Type } from "../../core/interfaces/Type";
/**
 * @private
 */
export declare class TemplateRenderingError extends InternalServerError {
    name: "TEMPLATING_RENDER_ERROR";
    constructor(target: Type<any> | string, method: string, err: Error);
    /**
     *
     * @returns {string}
     */
    static buildMessage(target: Type<any> | string, method: string, err: Error): string;
}
