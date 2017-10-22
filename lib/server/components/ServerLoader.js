"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
/**
 * @module common/server
 */
/** */
var Express = require("express");
var Http = require("http");
var Https = require("https");
var Path = require("path");
var ts_log_debug_1 = require("ts-log-debug");
var core_1 = require("../../core");
var HttpServer_1 = require("../../core/services/HttpServer");
var HttpsServer_1 = require("../../core/services/HttpsServer");
var di_1 = require("../../di");
var mvc_1 = require("../../mvc");
var HandlerBuilder_1 = require("../../mvc/class/HandlerBuilder");
var LogIncomingRequestMiddleware_1 = require("../../mvc/components/LogIncomingRequestMiddleware");
var ServerSettingsProvider_1 = require("../class/ServerSettingsProvider");
var ServerSettingsService_1 = require("../services/ServerSettingsService");
/**
 * ServerLoader provider all method to instantiate an ExpressServer.
 *
 * It provide some features :
 *
 * * [Lifecycle hooks](docs/server-loader/lifecycle-hooks.md),
 * * [Versioning Api](docs/server-loader/versioning.md),
 * * [Authentication strategy](docs/server-loader/authentication.md).
 * * [Global errors handler](docs/server-loader/global-error-handler.md),
 * * Middleware importation,
 * * Scan directory. You can specify controllers and services directory in your project,
 *
 * ```typescript
 * // In server.ts
 * import {ServerLoader, ServerSettings} from "ts-express-decorators";
 * import Path = require("path");
 * @ServerSettings({
 *    rootDir: Path.resolve(__dirname),
 *    port: 8000,
 *    httpsPort: 8080,
 *    mount: {
 *      "/rest": "${rootDir}/controllers/**\/*.js"
 *    }
 * })
 * export class Server extends ServerLoader {
 *
 *     $onReady(){
 *         console.log('Server started...');
 *     }
 *
 *     $onServerInitError(err){
 *         console.error(err);
 *     }
 * }
 *
 * // In app.ts
 * import Server from "./server";
 * new Server()
 *     .start()
 *     .then(() => console.log('started'))
 *     .catch(er => console.error(er));
 *
 * ```
 *
 */
ts_log_debug_1.$log.name = "TSED";
ts_log_debug_1.$log.level = "info";
var ServerLoader = /** @class */ (function () {
    /**
     *
     */
    function ServerLoader() {
        var _this = this;
        this.version = require("../../../package.json").version;
        this._expressApp = Express();
        this._components = [];
        this.callHook = function (key, elseFn) {
            if (elseFn === void 0) { elseFn = new Function; }
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            var self = _this;
            if (key in _this) {
                ts_log_debug_1.$log.debug("Call hook " + key + "()");
                return self[key].apply(self, args);
            }
            return elseFn();
        };
        /**
         *
         * @param key
         */
        this.hasHook = function (key) { return !!_this[key]; };
        // Configure the ExpressApplication factory.
        di_1.InjectorService.factory(core_1.ExpressApplication, this.expressApp);
        di_1.InjectorService.factory(HttpServer_1.HttpServer, { get: function () { return _this.httpServer; } });
        di_1.InjectorService.factory(HttpsServer_1.HttpsServer, { get: function () { return _this.httpsServer; } });
        this._settings = new ServerSettingsProvider_1.ServerSettingsProvider();
        this._settings.authentification = this.$onAuth || this._settings.authentification;
        var settings = ServerSettingsProvider_1.ServerSettingsProvider.getMetadata(this);
        if (settings) {
            ts_log_debug_1.$log.debug("Autoload configuration from metadata");
            this.setSettings(settings);
        }
    }
    /**
     * Create a new HTTP server with the provided `port`.
     * @returns {ServerLoader}
     */
    ServerLoader.prototype.createHttpServer = function (port) {
        this._httpServer = Http.createServer(this._expressApp);
        this._settings.httpPort = port;
        return this;
    };
    /**
     * Create a new HTTPs server.
     *
     * `options` <IHTTPSServerOptions>:
     *
     * - `port` &lt;number&gt;: Port number,
     * - `key` &lt;string&gt; | &lt;string[]&gt; | [&lt;Buffer&gt;](https://nodejs.org/api/buffer.html#buffer_class_buffer) | &lt;Object[]&gt;: The private key of the server in PEM format. To support multiple keys using different algorithms an array can be provided either as a plain array of key strings or an array of objects in the format `{pem: key, passphrase: passphrase}`. This option is required for ciphers that make use of private keys.
     * - `passphrase` &lt;string&gt; A string containing the passphrase for the private key or pfx.
     * - `cert` &lt;string&gt; | &lt;string[]&gt; | [&lt;Buffer&gt;](https://nodejs.org/api/buffer.html#buffer_class_buffer) | [&lt;Buffer[]&gt;](https://nodejs.org/api/buffer.html#buffer_class_buffer): A string, Buffer, array of strings, or array of Buffers containing the certificate key of the server in PEM format. (Required)
     * - `ca` &lt;string&gt; | &lt;string[]&gt; | [&lt;Buffer&gt;](https://nodejs.org/api/buffer.html#buffer_class_buffer) | [&lt;Buffer[]&gt;](https://nodejs.org/api/buffer.html#buffer_class_buffer): A string, Buffer, array of strings, or array of Buffers of trusted certificates in PEM format. If this is omitted several well known "root" CAs (like VeriSign) will be used. These are used to authorize connections.
     *
     * See more info on [httpsOptions](https://nodejs.org/api/tls.html#tls_tls_createserver_options_secureconnectionlistener).
     *
     * @param options Options to create new HTTPS server.
     * @returns {ServerLoader}
     */
    ServerLoader.prototype.createHttpsServer = function (options) {
        this._httpsServer = Https.createServer(options, this._expressApp);
        this._settings.httpsPort = options.port;
        return this;
    };
    /**
     * This method let you to add a express middleware or a Ts.ED middleware like GlobalAcceptMimes.
     *
     * ```typescript
     * @ServerSettings({
     *    rootDir,
     *    acceptMimes: ['application/json'] // optional
     * })
     * export class Server extends ServerLoader {
     *     $onMountingMiddlewares(): void|Promise<any> {
     *         const methodOverride = require('method-override');
     *
     *         this.use(GlobalAcceptMimesMiddleware)
     *             .use(methodOverride());
     *
     *         // similar to
     *         this.expressApp.use(methodOverride());
     *
     *         // but not similar to
     *         this.expressApp.use(GlobalAcceptMimesMiddleware); // in this case, this middleware will not be added correctly to express.
     *
     *         return null;
     *     }
     * }
     * ```
     * @param args
     * @returns {ServerLoader}
     */
    ServerLoader.prototype.use = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        args = args.map(function (arg) {
            if (typeof arg === "function") {
                arg = HandlerBuilder_1.HandlerBuilder.from(arg).build();
            }
            return arg;
        });
        (_a = this.expressApp).use.apply(_a, args);
        return this;
        var _a;
    };
    /**
     * Proxy to express set
     * @param setting
     * @param val
     * @returns {ServerLoader}
     */
    ServerLoader.prototype.set = function (setting, val) {
        this.expressApp.set(setting, val);
        return this;
    };
    /**
     * Proxy to express engine
     * @param ext
     * @param fn
     * @returns {ServerLoader}
     */
    ServerLoader.prototype.engine = function (ext, fn) {
        this.expressApp.engine(ext, fn);
        return this;
    };
    /**
     *
     * @returns {Promise<void>}
     */
    ServerLoader.prototype.loadSettingsAndInjector = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                ts_log_debug_1.$log.debug("Initialize settings");
                this._settingsService = this.getSettingsService();
                this._settingsService
                    .forEach(function (value, key) {
                    ts_log_debug_1.$log.info("settings." + key + " =>", value);
                });
                ts_log_debug_1.$log.info("Build services");
                this._injectorService = di_1.InjectorService.get(di_1.InjectorService);
                return [2 /*return*/, this.injectorService.load()];
            });
        });
    };
    /**
     *
     */
    ServerLoader.prototype.getSettingsService = function () {
        di_1.InjectorService.factory(ServerSettingsService_1.ServerSettingsService, this.settings.$get());
        return di_1.InjectorService.get(ServerSettingsService_1.ServerSettingsService);
    };
    /**
     * Start the express server.
     * @returns {Promise<any>|Promise}
     */
    ServerLoader.prototype.start = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var start, debug, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        start = new Date();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 8, , 9]);
                        debug = this.settings.get("debug");
                        /* istanbul ignore next */
                        if (debug && this.settings.env !== "test") {
                            ts_log_debug_1.$log.level = "debug";
                        }
                        return [4 /*yield*/, this.callHook("$onInit")];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.loadSettingsAndInjector()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.loadMiddlewares()];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.startServers()];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, this.callHook("$onReady")];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, this.injectorService.emit("$onServerReady")];
                    case 7:
                        _a.sent();
                        ts_log_debug_1.$log.info("Started in " + (new Date().getTime() - start.getTime()) + " ms");
                        return [3 /*break*/, 9];
                    case 8:
                        err_1 = _a.sent();
                        this.callHook("$onServerInitError", function () {
                            ts_log_debug_1.$log.error("HTTP Server error", err_1);
                        }, err_1);
                        return [2 /*return*/, Promise.reject(err_1)];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Create a new server from settings parameters.
     * @param http
     * @param settings
     * @returns {Promise<TResult2|TResult1>}
     */
    ServerLoader.prototype.startServer = function (http, settings) {
        var address = settings.address, port = settings.port, https = settings.https;
        ts_log_debug_1.$log.debug("Start server on " + (https ? "https" : "http") + "://" + settings.address + ":" + settings.port);
        var promise = new Promise(function (resolve, reject) {
            http
                .on("listening", resolve)
                .on("error", reject);
        })
            .then(function () {
            ts_log_debug_1.$log.info("HTTP Server listen on " + (https ? "https" : "http") + "://" + settings.address + ":" + settings.port);
        });
        http.listen(port, address);
        return promise;
    };
    /**
     * Initiliaze all servers.
     * @returns {Bluebird<U>}
     */
    ServerLoader.prototype.startServers = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var promises, settings, settings;
            return tslib_1.__generator(this, function (_a) {
                promises = [];
                /* istanbul ignore else */
                if (this.settings.httpPort) {
                    settings = this._settingsService.getHttpPort();
                    promises.push(this.startServer(this.httpServer, tslib_1.__assign({ https: false }, settings)));
                }
                /* istanbul ignore else */
                if (this.settings.httpsPort) {
                    settings = this._settingsService.getHttpsPort();
                    promises.push(this.startServer(this.httpsServer, tslib_1.__assign({ https: true }, settings)));
                }
                return [2 /*return*/, Promise.all(promises)];
            });
        });
    };
    /**
     * Set the port for http server.
     * @deprected
     * @param port
     * @returns {ServerLoader}
     */
    ServerLoader.prototype.setHttpPort = function (port) {
        this._settings.httpPort = port;
        return this;
    };
    /**
     * Set the port for https server.
     * @deprecated
     * @param port
     * @returns {ServerLoader}
     */
    ServerLoader.prototype.setHttpsPort = function (port) {
        this._settings.httpsPort = port;
        return this;
    };
    /**
     * Change the global endpoint path.
     * @deprecated
     * @param endpoint
     * @returns {ServerLoader}
     */
    ServerLoader.prototype.setEndpoint = function (endpoint) {
        this._settings.endpoint = endpoint;
        return this;
    };
    /**
     * Scan and imports all files matching the pattern. See the document on the [Glob](https://www.npmjs.com/package/glob)
     * pattern for more information.
     *
     * #### Example
     *
     * ```typescript
     * import {ServerLoader} from "ts-express-decorators";
     * import Path = require("path");
     *
     * export class Server extends ServerLoader {
     *
     *    constructor() {
     *        super();
     *
     *        let appPath = Path.resolve(__dirname);
     *
     *        this.scan(appPath + "/controllers/**\/**.js")
     *   }
     * }
     * ```
     *
     * Theses pattern scan all files in the directories controllers, services recursively.
     *
     * !> On windows on can have an issue with the Glob pattern and the /. To solve it, build your path pattern with the module Path.
     *
     * ```typescript
     * const controllerPattern = Path.join(rootDir, 'controllers','**','*.js');
     * ```
     *
     * @param path
     * @param endpoint
     * @returns {ServerLoader}
     */
    ServerLoader.prototype.scan = function (path, endpoint) {
        if (endpoint === void 0) { endpoint = this._settings.endpoint; }
        path = Path.resolve(path);
        var files = require("glob").sync(path);
        var nbFiles = 0;
        ts_log_debug_1.$log.info("Scan files : " + path);
        this._components = (this._components || [])
            .concat(files
            .map(function (file) {
            nbFiles++;
            ts_log_debug_1.$log.debug("Import file " + endpoint + ":", file);
            var classes = require(file);
            return { file: file, endpoint: endpoint, classes: classes };
        }))
            .filter(function (o) { return !!o; });
        return this;
    };
    /**
     * ServerLoader.onError() is deprecated. Use your own middleware instead of.
     * @deprecated
     */
    ServerLoader.prototype.onError = function () {
    };
    /**
     * Mount all controllers files that match with `globPattern` ([Glob Pattern](https://www.npmjs.com/package/glob))
     * under the endpoint. See [Versioning Rest API](docs/server-loader/versioning.md) for more informations.
     * @param endpoint
     * @param path
     * @returns {ServerLoader}
     */
    ServerLoader.prototype.mount = function (endpoint, path) {
        var _this = this;
        [].concat(path).forEach(function (path) {
            _this.scan(path, endpoint);
        });
        return this;
    };
    /**
     * Initialize configuration of the express app.
     */
    ServerLoader.prototype.loadMiddlewares = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ts_log_debug_1.$log.debug("Mount middlewares");
                        this.use(LogIncomingRequestMiddleware_1.LogIncomingRequestMiddleware);
                        return [4 /*yield*/, this.callHook("$onMountingMiddlewares", undefined, this.expressApp)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.injectorService.emit("$beforeRoutesInit")];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.injectorService.emit("$onRoutesInit", this._components)];
                    case 3:
                        _a.sent();
                        delete this._components; // free memory
                        return [4 /*yield*/, this.injectorService.emit("$afterRoutesInit")];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.callHook("$afterRoutesInit", undefined, this.expressApp)];
                    case 5:
                        _a.sent();
                        // Import the globalErrorHandler
                        /* istanbul ignore next */
                        if (this.hasHook("$onError")) {
                            this.use(this["$onError"].bind(this));
                        }
                        this.use(mvc_1.GlobalErrorHandlerMiddleware);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     *
     */
    ServerLoader.prototype.setSettings = function (settings) {
        var _this = this;
        this._settings.set(settings);
        if (this.settings.env === "test") {
            ts_log_debug_1.$log.stop();
        }
        var settingsService = this.getSettingsService();
        var bind = function (property, value, map) {
            switch (property) {
                case "mount":
                    Object.keys(settingsService.mount).forEach(function (key) { return _this.mount(key, value[key]); });
                    break;
                case "componentsScan":
                    settingsService.componentsScan.forEach(function (componentDir) { return _this.scan(componentDir); });
                    break;
                case "httpPort":
                    /* istanbul ignore else */
                    if (value && _this._httpServer === undefined) {
                        _this.createHttpServer(value);
                    }
                    break;
                case "httpsPort":
                    /* istanbul ignore else */
                    if (value && _this._httpsServer === undefined) {
                        _this.createHttpsServer(Object.assign(map.get("httpsOptions") || {}, { port: value }));
                    }
                    break;
            }
        };
        settingsService
            .forEach(function (value, key, map) {
            /* istanbul ignore else */
            if (value) {
                bind(key, value, map);
            }
        });
    };
    Object.defineProperty(ServerLoader.prototype, "settings", {
        /**
         * Return the settings configured by the decorator [@ServerSettings](api/common/server/decorators/serversettings.md).
         *
         * @ServerSettings({
         *    rootDir: Path.resolve(__dirname),
         *    port: 8000,
         *    httpsPort: 8080,
         *    mount: {
         *      "/rest": "${rootDir}/controllers/**\/*.js"
         * }
         * })
         * export class Server extends ServerLoader {
         *     $onInit(){
         *         console.log(this.settings); // {rootDir, port, httpsPort,...}
         *     }
         * }
         * ```
         *
         * @returns {ServerSettingsProvider}
         */
        get: function () {
            return this._settings;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServerLoader.prototype, "expressApp", {
        /**
         * Return Express Application instance.
         * @returns {core.Express}
         */
        get: function () {
            return this._expressApp;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServerLoader.prototype, "injectorService", {
        /**
         * Return the injectorService initialized by the server.
         * @returns {InjectorService}
         */
        get: function () {
            return this._injectorService;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServerLoader.prototype, "httpServer", {
        /**
         * Return Http.Server instance.
         * @returns {Http.Server}
         */
        get: function () {
            return this._httpServer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ServerLoader.prototype, "httpsServer", {
        /**
         * Return Https.Server instance.
         * @returns {Https.Server}
         */
        get: function () {
            return this._httpsServer;
        },
        enumerable: true,
        configurable: true
    });
    tslib_1.__decorate([
        core_1.Deprecated("ServerLoader.setHttpPort() is deprecated. Use ServerLoader.settings.port instead of.")
        /* istanbul ignore next */
        ,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", ServerLoader)
    ], ServerLoader.prototype, "setHttpPort", null);
    tslib_1.__decorate([
        core_1.Deprecated("ServerLoader.setHttpsPort() is deprecated. Use ServerLoader.settings.httpsPort instead of.")
        /* istanbul ignore next */
        ,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", ServerLoader)
    ], ServerLoader.prototype, "setHttpsPort", null);
    tslib_1.__decorate([
        core_1.Deprecated("ServerLoader.setEndpoint() is deprecated. Use ServerLoader.mount() instead of.")
        /* istanbul ignore next */
        ,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [String]),
        tslib_1.__metadata("design:returntype", ServerLoader)
    ], ServerLoader.prototype, "setEndpoint", null);
    tslib_1.__decorate([
        core_1.Deprecated("ServerLoader.onError() is deprecated. Use your own middleware instead of.")
        /* istanbul ignore next */
        ,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", []),
        tslib_1.__metadata("design:returntype", void 0)
    ], ServerLoader.prototype, "onError", null);
    return ServerLoader;
}());
exports.ServerLoader = ServerLoader;
//# sourceMappingURL=ServerLoader.js.map