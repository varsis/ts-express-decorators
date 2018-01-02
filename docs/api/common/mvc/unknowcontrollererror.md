<header class="symbol-info-header">    <h1 id="unknowcontrollererror">UnknowControllerError</h1>    <label class="symbol-info-type-label class">Class</label>    <label class="api-type-label private">private</label>  </header>
<section class="symbol-info">      <table class="is-full-width">        <tbody>        <tr>          <th>Module</th>          <td>            <div class="lang-typescript">                <span class="token keyword">import</span> { UnknowControllerError }                 <span class="token keyword">from</span>                 <span class="token string">"ts-express-decorators/lib/mvc/errors/UnknowControllerError"</span>                            </div>          </td>        </tr>        <tr>          <th>Source</th>          <td>            <a href="https://romakita.github.io/ts-express-decorators/#//blob/v3.0.0/src/mvc/errors/UnknowControllerError.ts#L0-L0">                mvc/errors/UnknowControllerError.ts            </a>        </td>        </tr>                </tbody>      </table>    </section>

### Overview

<pre><code class="typescript-lang"><span class="token keyword">class</span> UnknowControllerError <span class="token keyword">extends</span> InternalServerError <span class="token punctuation">{</span>
    name<span class="token punctuation">:</span> "UNKNOW_CONTROLLER_ERROR"<span class="token punctuation">;</span>
    <span class="token keyword">constructor</span><span class="token punctuation">(</span>target<span class="token punctuation">:</span> <a href="#api/common/core/type"><span class="token">Type</span></a><<span class="token keyword">any</span>> | <span class="token keyword">string</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">static</span> <span class="token function">buildMessage</span><span class="token punctuation">(</span>target<span class="token punctuation">:</span> <a href="#api/common/core/type"><span class="token">Type</span></a><<span class="token keyword">any</span>> | <span class="token keyword">string</span><span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token keyword">string</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span></code></pre>

### Members

<div class="method-overview"><pre><code class="typescript-lang">name<span class="token punctuation">:</span> "UNKNOW_CONTROLLER_ERROR"</code></pre></div>
<hr />
<div class="method-overview"><pre><code class="typescript-lang"><span class="token keyword">static</span> <span class="token function">buildMessage</span><span class="token punctuation">(</span>target<span class="token punctuation">:</span> <a href="#api/common/core/type"><span class="token">Type</span></a><<span class="token keyword">any</span>> | <span class="token keyword">string</span><span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token keyword">string</span></code></pre></div>
