"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
/**
 * @module common/mvc
 */
/** */
var ts_httpexceptions_1 = require("ts-httpexceptions");
var EndpointMetadata_1 = require("../class/EndpointMetadata");
var middleware_1 = require("../decorators/class/middleware");
var endpointInfo_1 = require("../decorators/param/endpointInfo");
var request_1 = require("../decorators/param/request");
/**
 * @private
 * @middleware
 */
var AcceptMimesMiddleware = /** @class */ (function () {
    function AcceptMimesMiddleware() {
    }
    AcceptMimesMiddleware_1 = AcceptMimesMiddleware;
    AcceptMimesMiddleware.prototype.use = function (endpoint, request) {
        var mimes = endpoint.get(AcceptMimesMiddleware_1) || [];
        mimes.forEach(function (mime) {
            if (!request.accepts(mime)) {
                throw new ts_httpexceptions_1.NotAcceptable(mime);
            }
        });
    };
    tslib_1.__decorate([
        tslib_1.__param(0, endpointInfo_1.EndpointInfo()),
        tslib_1.__param(1, request_1.Request()),
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [EndpointMetadata_1.EndpointMetadata, Object]),
        tslib_1.__metadata("design:returntype", void 0)
    ], AcceptMimesMiddleware.prototype, "use", null);
    AcceptMimesMiddleware = AcceptMimesMiddleware_1 = tslib_1.__decorate([
        middleware_1.Middleware()
    ], AcceptMimesMiddleware);
    return AcceptMimesMiddleware;
    var AcceptMimesMiddleware_1;
}());
exports.AcceptMimesMiddleware = AcceptMimesMiddleware;
//# sourceMappingURL=AcceptMimesMiddleware.js.map