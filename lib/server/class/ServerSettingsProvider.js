"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Metadata_1 = require("../../core/class/Metadata");
var interfaces_1 = require("../../core/interfaces");
var constants_1 = require("../constants");
var ServerSettingsService_1 = require("../services/ServerSettingsService");
var rootDir = process.cwd();
var ServerSettingsProvider = /** @class */ (function () {
    function ServerSettingsProvider() {
        var _this = this;
        this.map = new Map();
        /**
         *
         * @returns {ServerSettingsService}
         */
        this.$get = function () {
            return new ServerSettingsService_1.ServerSettingsService(_this.map);
        };
        this.rootDir = rootDir;
        this.env = process.env.NODE_ENV || interfaces_1.EnvTypes.DEV;
        this.port = 8080;
        this.httpsPort = 8000;
        this.endpointUrl = "/rest";
        this.version = "1.0.0";
        this.uploadDir = "${rootDir}/uploads";
        this.debug = false;
        /* istanbul ignore next */
        this.authentification = function () { return (true); };
        this.mount = {
            "/rest": "${rootDir}/controllers/**/*.js"
        };
        this.componentsScan = [
            "${rootDir}/mvc/**/*.js",
            "${rootDir}/services/**/*.js",
            "${rootDir}/converters/**/*.js"
        ];
    }
    Object.defineProperty(ServerSettingsProvider.prototype, "version", {
        set: function (v) {
            this.map.set("version", v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServerSettingsProvider.prototype, "rootDir", {
        get: function () {
            return this.map.get("rootDir");
        },
        /**
         *
         * @param value
         */
        set: function (value) {
            this.map.set("rootDir", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServerSettingsProvider.prototype, "port", {
        /**
         *
         * @param value
         */
        set: function (value) {
            this.httpPort = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServerSettingsProvider.prototype, "httpsOptions", {
        /**
         *
         * @param value
         */
        set: function (value) {
            this.map.set("httpsOptions", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServerSettingsProvider.prototype, "httpPort", {
        /**
         *
         * @returns {undefined|any}
         */
        get: function () {
            return this.map.get("httpPort");
        },
        /**
         *
         * @param value
         */
        set: function (value) {
            this.map.set("httpPort", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServerSettingsProvider.prototype, "httpsPort", {
        /**
         *
         * @returns {undefined|any}
         */
        get: function () {
            return this.map.get("httpsPort");
        },
        /**
         *
         * @param value
         */
        set: function (value) {
            this.map.set("httpsPort", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServerSettingsProvider.prototype, "uploadDir", {
        /**
         *
         * @param value
         */
        set: function (value) {
            this.map.set("uploadDir", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServerSettingsProvider.prototype, "endpoint", {
        get: function () {
            return this.map.get("endpointUrl");
        },
        /**
         *
         * @param value
         */
        set: function (value) {
            this.map.set("endpointUrl", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServerSettingsProvider.prototype, "endpointUrl", {
        /**
         *
         * @param value
         */
        set: function (value) {
            this.map.set("endpointUrl", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServerSettingsProvider.prototype, "env", {
        /**
         *
         * @returns {Map<string, any>}
         */
        get: function () {
            return this.map.get("env");
        },
        /**
         *
         * @param value
         */
        set: function (value) {
            this.map.set("env", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServerSettingsProvider.prototype, "authentification", {
        /**
         *
         * @param callback
         */
        set: function (callback) {
            this.map.set("authentification", callback);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServerSettingsProvider.prototype, "mount", {
        /**
         *
         * @param value
         */
        set: function (value) {
            this.map.set("mount", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServerSettingsProvider.prototype, "componentsScan", {
        /**
         *
         * @param value
         */
        set: function (value) {
            this.map.set("componentsScan", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServerSettingsProvider.prototype, "serveStatic", {
        /**
         *
         * @param value
         */
        set: function (value) {
            this.map.set("serveStatic", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServerSettingsProvider.prototype, "acceptMimes", {
        /**
         *
         * @param value
         */
        set: function (value) {
            this.map.set("acceptMimes", value || []);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServerSettingsProvider.prototype, "debug", {
        get: function () {
            return !!this.map.get("debug");
        },
        set: function (debug) {
            this.map.set("debug", debug);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServerSettingsProvider.prototype, "routers", {
        set: function (options) {
            this.map.set("routers", options);
        },
        enumerable: true,
        configurable: true
    });
    /**
     *
     * @param propertyKey
     * @param value
     */
    ServerSettingsProvider.prototype.set = function (propertyKey, value) {
        var _this = this;
        if (typeof propertyKey === "string") {
            this.map.set(propertyKey, value);
        }
        else {
            var self_1 = this;
            Object.keys(propertyKey).forEach(function (key) {
                var descriptor = Object.getOwnPropertyDescriptor(ServerSettingsProvider.prototype, key);
                if (descriptor && ["set", "map"].indexOf(key) === -1) {
                    self_1[key] = propertyKey[key];
                }
                else {
                    _this.set(key, propertyKey[key]);
                }
            });
        }
        return this;
    };
    /**
     *
     * @param propertyKey
     * @returns {any<string, any>}
     */
    ServerSettingsProvider.prototype.get = function (propertyKey) {
        return this.map.get(propertyKey);
    };
    /**
     *
     * @param target
     * @returns {any}
     */
    ServerSettingsProvider.getMetadata = function (target) {
        return Metadata_1.Metadata.getOwn(constants_1.SERVER_SETTINGS, target);
    };
    return ServerSettingsProvider;
}());
exports.ServerSettingsProvider = ServerSettingsProvider;
//# sourceMappingURL=ServerSettingsProvider.js.map