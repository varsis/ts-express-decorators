"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * `ServerSettingsService` contains all information about [ServerLoader](api/common/server/serverloader.md) configuration.
 */
var ServerSettingsService = /** @class */ (function () {
    function ServerSettingsService(settings) {
        var _this = this;
        /**
         *
         * @type {Map<string, any>}
         */
        this.map = new Map();
        if (settings) {
            this.map.set("rootDir", settings.get("rootDir"));
            settings.forEach(function (value, key) {
                _this.map.set(key, _this.resolve(value));
            });
        }
    }
    ServerSettingsService.prototype.resolve = function (value) {
        var _this = this;
        if (typeof value === "object") {
            Object.keys(value).forEach(function (k, i, m) {
                value[k] = _this.resolve(value[k]);
            });
            return value;
        }
        if (typeof value === "string") {
            return value.replace(/\${rootDir}/, this.rootDir);
        }
        return value;
    };
    Object.defineProperty(ServerSettingsService.prototype, "rootDir", {
        get: function () {
            return this.map.get("rootDir");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServerSettingsService.prototype, "version", {
        get: function () {
            return this.map.get("version");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServerSettingsService.prototype, "endpoint", {
        /**
         *
         * @returns {string}
         */
        get: function () {
            return this.map.get("endpointUrl");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServerSettingsService.prototype, "endpointUrl", {
        /**
         *
         * @returns {string}
         */
        get: function () {
            return this.map.get("endpointUrl");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServerSettingsService.prototype, "env", {
        /**
         *
         * @returns {Env}
         */
        get: function () {
            return this.map.get("env");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServerSettingsService.prototype, "httpsOptions", {
        /**
         *
         * @param value
         */
        get: function () {
            return this.map.get("httpsOptions");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServerSettingsService.prototype, "httpPort", {
        /**
         *
         * @returns {undefined|any}
         */
        get: function () {
            return this.map.get("httpPort");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServerSettingsService.prototype, "httpsPort", {
        /**
         *
         * @returns {undefined|any}
         */
        get: function () {
            return this.map.get("httpsPort");
        },
        enumerable: true,
        configurable: true
    });
    /**
     *
     * @returns {string|number}
     */
    ServerSettingsService.prototype.getHttpPort = function () {
        return ServerSettingsService.buildAddressAndPort(this.map.get("httpPort"));
    };
    /**
     *
     * @returns {string|number}
     */
    ServerSettingsService.prototype.getHttpsPort = function () {
        return ServerSettingsService.buildAddressAndPort(this.map.get("httpsPort"));
    };
    Object.defineProperty(ServerSettingsService.prototype, "uploadDir", {
        /**
         *
         * @returns {string}
         */
        get: function () {
            return this.map.get("uploadDir");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServerSettingsService.prototype, "mount", {
        /**
         *
         * @returns {undefined|any}
         */
        get: function () {
            return this.map.get("mount") || {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServerSettingsService.prototype, "componentsScan", {
        /**
         *
         * @returns {undefined|any}
         */
        get: function () {
            return this.map.get("componentsScan") || [];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServerSettingsService.prototype, "serveStatic", {
        /**
         *
         * @returns {undefined|any}
         */
        get: function () {
            return this.map.get("serveStatic") || {};
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServerSettingsService.prototype, "acceptMimes", {
        /**
         *
         * @returns {undefined|any}
         */
        get: function () {
            return this.map.get("acceptMimes") || ["application/json"];
        },
        enumerable: true,
        configurable: true
    });
    /**
     *
     * @param propertyKey
     * @returns {undefined|any}
     */
    ServerSettingsService.prototype.get = function (propertyKey) {
        return this.map.get(propertyKey);
    };
    Object.defineProperty(ServerSettingsService.prototype, "authentification", {
        /**
         *
         * @returns {Function}
         */
        get: function () {
            return this.map.get("authentification");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServerSettingsService.prototype, "debug", {
        get: function () {
            return !!this.map.get("debug");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServerSettingsService.prototype, "routers", {
        get: function () {
            return this.map.get("routers") || {};
        },
        enumerable: true,
        configurable: true
    });
    /**
     *
     * @param callbackfn
     * @param thisArg
     */
    ServerSettingsService.prototype.forEach = function (callbackfn, thisArg) {
        return this.map.forEach(callbackfn);
    };
    /**
     *
     * @param addressPort
     * @returns {{address: string, port: number}}
     */
    ServerSettingsService.buildAddressAndPort = function (addressPort) {
        var address = "0.0.0.0";
        var port = addressPort;
        if (typeof addressPort === "string" && addressPort.indexOf(":") > -1) {
            _a = addressPort.split(":"), address = _a[0], port = _a[1];
            port = +port;
        }
        return { address: address, port: port };
        var _a;
    };
    return ServerSettingsService;
}());
exports.ServerSettingsService = ServerSettingsService;
//# sourceMappingURL=ServerSettingsService.js.map