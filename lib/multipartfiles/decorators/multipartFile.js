"use strict";
/**
 * @module multiparfiles
 */
/** */
Object.defineProperty(exports, "__esModule", { value: true });
var Metadata_1 = require("../../core/class/Metadata");
var Store_1 = require("../../core/class/Store");
var utils_1 = require("../../core/utils");
var useBefore_1 = require("../../mvc/decorators/method/useBefore");
var ParamRegistry_1 = require("../../mvc/registries/ParamRegistry");
var MultipartFileFilter_1 = require("../filters/MultipartFileFilter");
var MultipartFilesFilter_1 = require("../filters/MultipartFilesFilter");
var MultipartFileMiddleware_1 = require("../middlewares/MultipartFileMiddleware");
/**
 *
 * @param options
 * @returns {(target:Type<T>, propertyKey:string, parameterIndex:number)=>void}
 * @decorator
 */
function MultipartFile(options) {
    return function (target, propertyKey, parameterIndex) {
        if (typeof parameterIndex === "number") {
            // create endpoint metadata
            Store_1.Store
                .fromMethod(target, propertyKey)
                .set(MultipartFileMiddleware_1.MultipartFileMiddleware, options);
            useBefore_1.UseBefore(MultipartFileMiddleware_1.MultipartFileMiddleware)(target, propertyKey, utils_1.descriptorOf(target, propertyKey));
            // add filter
            var filter = Metadata_1.Metadata.getParamTypes(target, propertyKey)[parameterIndex] === Array
                ? MultipartFilesFilter_1.MultipartFilesFilter : MultipartFileFilter_1.MultipartFileFilter;
            ParamRegistry_1.ParamRegistry.useFilter(filter, {
                propertyKey: propertyKey,
                parameterIndex: parameterIndex,
                target: target,
                useConverter: false
            });
        }
    };
}
exports.MultipartFile = MultipartFile;
//# sourceMappingURL=multipartFile.js.map