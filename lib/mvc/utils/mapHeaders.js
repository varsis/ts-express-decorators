"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function mapHeaders(headers) {
    return Object
        .keys(headers)
        .reduce(function (newHeaders, key, index, array) {
        var value = headers[key];
        var type = typeof value;
        var options = { value: value };
        if (type === "object") {
            options = value;
            type = typeof options.value;
        }
        options.type = options.type || type;
        newHeaders[key] = options;
        return newHeaders;
    }, {});
}
exports.mapHeaders = mapHeaders;
//# sourceMappingURL=mapHeaders.js.map