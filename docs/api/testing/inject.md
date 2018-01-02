<header class="symbol-info-header">    <h1 id="inject">inject</h1>    <label class="symbol-info-type-label function">Function</label>      </header>
<section class="symbol-info">      <table class="is-full-width">        <tbody>        <tr>          <th>Module</th>          <td>            <div class="lang-typescript">                <span class="token keyword">import</span> { inject }                 <span class="token keyword">from</span>                 <span class="token string">"ts-express-decorators/testing"</span>                            </div>          </td>        </tr>        <tr>          <th>Source</th>          <td>            <a href="https://romakita.github.io/ts-express-decorators/#//blob/v3.0.0/src/testing/inject.ts#L0-L0">                testing/inject.ts            </a>        </td>        </tr>                </tbody>      </table>    </section>

### Overview

<pre><code class="typescript-lang">function <span class="token function">inject</span><span class="token punctuation">(</span>targets<span class="token punctuation">:</span> <span class="token keyword">any</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> func<span class="token punctuation">:</span> Function<span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token punctuation">(</span>done<span class="token punctuation">:</span> Function<span class="token punctuation">)</span> => <span class="token keyword">void</span><span class="token punctuation">;</span></code></pre>

### Description

The inject function is one of the TsExpressDecorator testing utilities.
It injects services into the test function where you can alter, spy on, and manipulate them.

The inject function has two parameters

* an array of Service dependency injection tokens,
* a test function whose parameters correspond exactly to each item in the injection token array.
