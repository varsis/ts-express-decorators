"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function mapReturnedResponse(options) {
    return {
        description: options.description,
        type: options.type || options.use,
        collectionType: options.collectionType || options.collection,
        headers: options.headers
    };
}
exports.mapReturnedResponse = mapReturnedResponse;
//# sourceMappingURL=mapReturnedResponse.js.map