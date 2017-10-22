/// <reference types="express" />
/// <reference types="node" />
/**
 * @module common/server
 */
/** */
import * as Express from "express";
import * as Http from "http";
import * as Https from "https";
import { InjectorService } from "../../di";
import { ServerSettingsProvider } from "../class/ServerSettingsProvider";
import { IHTTPSServerOptions, IServerLifecycle, IServerSettings } from "../interfaces";
import { ServerSettingsService } from "../services/ServerSettingsService";
export declare abstract class ServerLoader implements IServerLifecycle {
    version: string;
    private _expressApp;
    private _settings;
    private _settingsService;
    private _components;
    private _httpServer;
    private _httpsServer;
    private _injectorService;
    /**
     *
     */
    constructor();
    /**
     * Create a new HTTP server with the provided `port`.
     * @returns {ServerLoader}
     */
    createHttpServer(port: string | number): ServerLoader;
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
    createHttpsServer(options: IHTTPSServerOptions): ServerLoader;
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
    use(...args: any[]): ServerLoader;
    /**
     * Proxy to express set
     * @param setting
     * @param val
     * @returns {ServerLoader}
     */
    set(setting: string, val: any): ServerLoader;
    /**
     * Proxy to express engine
     * @param ext
     * @param fn
     * @returns {ServerLoader}
     */
    engine(ext: string, fn: Function): ServerLoader;
    /**
     *
     * @returns {Promise<void>}
     */
    protected loadSettingsAndInjector(): Promise<any>;
    private callHook;
    /**
     *
     */
    protected getSettingsService(): ServerSettingsService;
    /**
     *
     * @param key
     */
    private hasHook;
    /**
     * Start the express server.
     * @returns {Promise<any>|Promise}
     */
    start(): Promise<any>;
    /**
     * Create a new server from settings parameters.
     * @param http
     * @param settings
     * @returns {Promise<TResult2|TResult1>}
     */
    protected startServer(http: any, settings: {
        https: boolean;
        address: string | number;
        port: number;
    }): Promise<void>;
    /**
     * Initiliaze all servers.
     * @returns {Bluebird<U>}
     */
    private startServers();
    /**
     * Set the port for http server.
     * @deprected
     * @param port
     * @returns {ServerLoader}
     */
    setHttpPort(port: number | string): ServerLoader;
    /**
     * Set the port for https server.
     * @deprecated
     * @param port
     * @returns {ServerLoader}
     */
    setHttpsPort(port: number | string): ServerLoader;
    /**
     * Change the global endpoint path.
     * @deprecated
     * @param endpoint
     * @returns {ServerLoader}
     */
    setEndpoint(endpoint: string): ServerLoader;
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
    scan(path: string, endpoint?: string): ServerLoader;
    /**
     * ServerLoader.onError() is deprecated. Use your own middleware instead of.
     * @deprecated
     */
    onError(): void;
    /**
     * Mount all controllers files that match with `globPattern` ([Glob Pattern](https://www.npmjs.com/package/glob))
     * under the endpoint. See [Versioning Rest API](docs/server-loader/versioning.md) for more informations.
     * @param endpoint
     * @param path
     * @returns {ServerLoader}
     */
    mount(endpoint: string, path: string | string[]): ServerLoader;
    /**
     * Initialize configuration of the express app.
     */
    protected loadMiddlewares(): Promise<any>;
    /**
     *
     */
    protected setSettings(settings: IServerSettings): void;
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
    readonly settings: ServerSettingsProvider;
    /**
     * Return Express Application instance.
     * @returns {core.Express}
     */
    readonly expressApp: Express.Application;
    /**
     * Return the injectorService initialized by the server.
     * @returns {InjectorService}
     */
    readonly injectorService: InjectorService;
    /**
     * Return Http.Server instance.
     * @returns {Http.Server}
     */
    readonly httpServer: Http.Server;
    /**
     * Return Https.Server instance.
     * @returns {Https.Server}
     */
    readonly httpsServer: Https.Server;
}
