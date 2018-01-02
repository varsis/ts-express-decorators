<header class="symbol-info-header">    <h1 id="routeservice">RouteService</h1>    <label class="symbol-info-type-label service">Service</label>      </header>
<section class="symbol-info">      <table class="is-full-width">        <tbody>        <tr>          <th>Module</th>          <td>            <div class="lang-typescript">                <span class="token keyword">import</span> { RouteService }                 <span class="token keyword">from</span>                 <span class="token string">"ts-express-decorators"</span>                            </div>          </td>        </tr>        <tr>          <th>Source</th>          <td>            <a href="https://romakita.github.io/ts-express-decorators/#//blob/v3.0.0/src/mvc/services/RouteService.ts#L0-L0">                mvc/services/RouteService.ts            </a>        </td>        </tr>                </tbody>      </table>    </section>

### Overview

<pre><code class="typescript-lang"><span class="token keyword">class</span> RouteService <span class="token punctuation">{</span>
    <span class="token keyword">constructor</span><span class="token punctuation">(</span>controllerService<span class="token punctuation">:</span> <a href="#api/common/mvc/controllerservice"><span class="token">ControllerService</span></a><span class="token punctuation">)</span><span class="token punctuation">;</span>
    $<span class="token function">afterRoutesInit</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token keyword">void</span><span class="token punctuation">;</span>
    <span class="token function">getRoutes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span> <a href="#api/common/mvc/icontrollerroute"><span class="token">IControllerRoute</span></a><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token function">printRoutes</span><span class="token punctuation">(</span>logger?<span class="token punctuation">:</span> <span class="token punctuation">{</span>
        info<span class="token punctuation">:</span> <span class="token punctuation">(</span>s<span class="token punctuation">:</span> <span class="token keyword">any</span><span class="token punctuation">)</span> => <span class="token keyword">void</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token keyword">void</span><span class="token punctuation">;</span>
    <span class="token function">getAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span> <a href="#api/common/mvc/icontrollerroute"><span class="token">IControllerRoute</span></a><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span></code></pre>

### Description

`RouteService` is used to provide all routes collected by annotation `@ControllerProvider`.

### Members

<div class="method-overview"><pre><code class="typescript-lang">$<span class="token function">afterRoutesInit</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token keyword">void</span></code></pre></div>
<hr />
<div class="method-overview"><pre><code class="typescript-lang"><span class="token function">getRoutes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span> <a href="#api/common/mvc/icontrollerroute"><span class="token">IControllerRoute</span></a><span class="token punctuation">[</span><span class="token punctuation">]</span></code></pre></div>
Get all routes builded by TsExpressDecorators and mounted on Express application.
<hr />
<div class="method-overview"><pre><code class="typescript-lang"><span class="token function">printRoutes</span><span class="token punctuation">(</span>logger?<span class="token punctuation">:</span> <span class="token punctuation">{</span>
     info<span class="token punctuation">:</span> <span class="token punctuation">(</span>s<span class="token punctuation">:</span> <span class="token keyword">any</span><span class="token punctuation">)</span> => <span class="token keyword">void</span><span class="token punctuation">;</span>
 <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token keyword">void</span><span class="token punctuation">;</span></code></pre></div>
Print all route mounted in express via Annotation.
<hr />
<div class="method-overview"><pre><code class="typescript-lang"><span class="token function">getAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span> <a href="#api/common/mvc/icontrollerroute"><span class="token">IControllerRoute</span></a><span class="token punctuation">[</span><span class="token punctuation">]</span></code></pre></div>
Return all Routes stored in ControllerProvider manager.
