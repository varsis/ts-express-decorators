<header class="symbol-info-header">    <h1 id="use">Use</h1>    <label class="symbol-info-type-label decorator">Decorator</label>      </header>
<section class="symbol-info">      <table class="is-full-width">        <tbody>        <tr>          <th>Module</th>          <td>            <div class="lang-typescript">                <span class="token keyword">import</span> { Use }                 <span class="token keyword">from</span>                 <span class="token string">"ts-express-decorators"</span>                            </div>          </td>        </tr>        <tr>          <th>Source</th>          <td>            <a href="https://romakita.github.io/ts-express-decorators/#//blob/v3.0.0/src/mvc/decorators/method/use.ts#L0-L0">                mvc/decorators/method/use.ts            </a>        </td>        </tr>                </tbody>      </table>    </section>

### Overview

<pre><code class="typescript-lang">function <span class="token function">Use</span><span class="token punctuation">(</span>...args<span class="token punctuation">:</span> <span class="token keyword">any</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">:</span> Function<span class="token punctuation">;</span></code></pre>

### Description

Mounts the specified middleware function or functions at the specified path: the middleware function is executed when
the base of the requested path matches `path.

```typescript
@Controller('/')
@Use(Middleware1)
export class Ctrl {

   @Get('/')
   @Use(Middleware2)
   get() { }
}

```
