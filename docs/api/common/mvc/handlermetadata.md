<header class="symbol-info-header">    <h1 id="handlermetadata">HandlerMetadata</h1>    <label class="symbol-info-type-label class">Class</label>      </header>
<section class="symbol-info">      <table class="is-full-width">        <tbody>        <tr>          <th>Module</th>          <td>            <div class="lang-typescript">                <span class="token keyword">import</span> { HandlerMetadata }                 <span class="token keyword">from</span>                 <span class="token string">"ts-express-decorators"</span>                            </div>          </td>        </tr>        <tr>          <th>Source</th>          <td>            <a href="https://romakita.github.io/ts-express-decorators/#//blob/v3.0.0/src/mvc/class/HandlerMetadata.ts#L0-L0">                mvc/class/HandlerMetadata.ts            </a>        </td>        </tr>                </tbody>      </table>    </section>

### Overview

<pre><code class="typescript-lang"><span class="token keyword">class</span> HandlerMetadata <span class="token punctuation">{</span>
    <span class="token keyword">constructor</span><span class="token punctuation">(</span>_target<span class="token punctuation">:</span> <span class="token keyword">any</span><span class="token punctuation">,</span> _methodClassName?<span class="token punctuation">:</span> <span class="token keyword">string</span> | undefined<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">readonly</span> type<span class="token punctuation">:</span> "function" | "controller" | "middleware"<span class="token punctuation">;</span>
    <span class="token keyword">readonly</span> errorParam<span class="token punctuation">:</span> <span class="token keyword">boolean</span><span class="token punctuation">;</span>
    <span class="token keyword">readonly</span> injectable<span class="token punctuation">:</span> <span class="token keyword">boolean</span><span class="token punctuation">;</span>
    <span class="token keyword">readonly</span> nextFunction<span class="token punctuation">:</span> <span class="token keyword">boolean</span><span class="token punctuation">;</span>
    <span class="token keyword">readonly</span> methodClassName<span class="token punctuation">:</span> <span class="token keyword">string</span> | undefined<span class="token punctuation">;</span>
    <span class="token keyword">readonly</span> target<span class="token punctuation">:</span> <span class="token keyword">any</span><span class="token punctuation">;</span>
    <span class="token keyword">readonly</span> services<span class="token punctuation">:</span> <a href="#api/common/filters/parammetadata"><span class="token">ParamMetadata</span></a><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span></code></pre>

### Members

<div class="method-overview"><pre><code class="typescript-lang"><span class="token keyword">readonly</span> type<span class="token punctuation">:</span> "function" | "controller" | "middleware"</code></pre></div>
<hr />
<div class="method-overview"><pre><code class="typescript-lang"><span class="token keyword">readonly</span> errorParam<span class="token punctuation">:</span> <span class="token keyword">boolean</span></code></pre></div>
<hr />
<div class="method-overview"><pre><code class="typescript-lang"><span class="token keyword">readonly</span> injectable<span class="token punctuation">:</span> <span class="token keyword">boolean</span></code></pre></div>
<hr />
<div class="method-overview"><pre><code class="typescript-lang"><span class="token keyword">readonly</span> nextFunction<span class="token punctuation">:</span> <span class="token keyword">boolean</span></code></pre></div>
<hr />
<div class="method-overview"><pre><code class="typescript-lang"><span class="token keyword">readonly</span> methodClassName<span class="token punctuation">:</span> <span class="token keyword">string</span> | undefined</code></pre></div>
<hr />
<div class="method-overview"><pre><code class="typescript-lang"><span class="token keyword">readonly</span> target<span class="token punctuation">:</span> <span class="token keyword">any</span></code></pre></div>
<hr />
<div class="method-overview"><pre><code class="typescript-lang"><span class="token keyword">readonly</span> services<span class="token punctuation">:</span> <a href="#api/common/filters/parammetadata"><span class="token">ParamMetadata</span></a><span class="token punctuation">[</span><span class="token punctuation">]</span></code></pre></div>
