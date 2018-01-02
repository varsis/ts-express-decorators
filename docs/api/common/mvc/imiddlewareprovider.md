<header class="symbol-info-header">    <h1 id="imiddlewareprovider">IMiddlewareProvider</h1>    <label class="symbol-info-type-label interface">Interface</label>      </header>
<section class="symbol-info">      <table class="is-full-width">        <tbody>        <tr>          <th>Module</th>          <td>            <div class="lang-typescript">                <span class="token keyword">import</span> { IMiddlewareProvider }                 <span class="token keyword">from</span>                 <span class="token string">"ts-express-decorators"</span>                            </div>          </td>        </tr>        <tr>          <th>Source</th>          <td>            <a href="https://romakita.github.io/ts-express-decorators/#//blob/v3.0.0/src/mvc/interfaces/IMiddlewareProvider.ts#L0-L0">                mvc/interfaces/IMiddlewareProvider.ts            </a>        </td>        </tr>                </tbody>      </table>    </section>

### Overview

<pre><code class="typescript-lang"><span class="token keyword">interface</span> IMiddlewareProvider<T <span class="token keyword">extends</span> <a href="#api/common/mvc/imiddleware"><span class="token">IMiddleware</span></a>> <span class="token keyword">extends</span> <a href="#api/common/di/iprovider"><span class="token">IProvider</span></a><T> <span class="token punctuation">{</span>
    type<span class="token punctuation">:</span> <a href="#api/common/mvc/middlewaretype"><span class="token">MiddlewareType</span></a><span class="token punctuation">;</span>
<span class="token punctuation">}</span></code></pre>

### Members

<div class="method-overview"><pre><code class="typescript-lang">type<span class="token punctuation">:</span> <a href="#api/common/mvc/middlewaretype"><span class="token">MiddlewareType</span></a></code></pre></div>
