<header class="symbol-info-header">    <h1 id="summary">Summary</h1>    <label class="symbol-info-type-label decorator">Decorator</label>      </header>
<section class="symbol-info">      <table class="is-full-width">        <tbody>        <tr>          <th>Module</th>          <td>            <div class="lang-typescript">                <span class="token keyword">import</span> { Summary }                 <span class="token keyword">from</span>                 <span class="token string">"ts-express-decorators/swagger"</span>                            </div>          </td>        </tr>        <tr>          <th>Source</th>          <td>            <a href="https://romakita.github.io/ts-express-decorators/#//blob/v3.0.0/src/swagger/decorators/summary.ts#L0-L0">                swagger/decorators/summary.ts            </a>        </td>        </tr>                </tbody>      </table>    </section>

### Overview

<pre><code class="typescript-lang">function <span class="token function">Summary</span><span class="token punctuation">(</span>summary<span class="token punctuation">:</span> <span class="token keyword">string</span><span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token punctuation">(</span>...args<span class="token punctuation">:</span> <span class="token keyword">any</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> => <span class="token keyword">any</span><span class="token punctuation">;</span></code></pre>

### Description

Add summary metadata on the decorated element.

## Examples
### On method

```typescript
class Model {
   @Summary("summary")
   id: string;
}
```
