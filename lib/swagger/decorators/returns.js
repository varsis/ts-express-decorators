"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Store_1 = require("../../core/class/Store");
var mapReturnedResponse_1 = require("../../mvc/utils/mapReturnedResponse");
function Returns() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var configuration = {};
    args.forEach(function (value) {
        configuration[typeof value] = value;
    });
    var code = configuration.number, _a = configuration.object, options = _a === void 0 ? {} : _a, type = configuration["function"];
    if (type) {
        options.type = type;
    }
    return Store_1.Store.decorate(function (store) {
        var response = mapReturnedResponse_1.mapReturnedResponse(options);
        if (code !== undefined) {
            store.merge("responses", (_a = {},
                _a[code] = response,
                _a));
        }
        else {
            store.merge("response", response);
        }
        var _a;
    });
}
exports.Returns = Returns;
//# sourceMappingURL=returns.js.map