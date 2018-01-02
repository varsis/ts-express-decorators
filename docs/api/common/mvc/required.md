<header class="symbol-info-header">    <h1 id="required">Required</h1>    <label class="symbol-info-type-label decorator">Decorator</label>      </header>
<section class="symbol-info">      <table class="is-full-width">        <tbody>        <tr>          <th>Module</th>          <td>            <div class="lang-typescript">                <span class="token keyword">import</span> { Required }                 <span class="token keyword">from</span>                 <span class="token string">"ts-express-decorators"</span>                            </div>          </td>        </tr>        <tr>          <th>Source</th>          <td>            <a href="https://romakita.github.io/ts-express-decorators/#//blob/v3.0.0/src/mvc/decorators/required.ts#L0-L0">                mvc/decorators/required.ts            </a>        </td>        </tr>                </tbody>      </table>    </section>

### Overview

<pre><code class="typescript-lang">function <span class="token function">Required</span><span class="token punctuation">(</span>...allowedRequiredValues<span class="token punctuation">:</span> <span class="token keyword">any</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">:</span> <span class="token keyword">any</span><span class="token punctuation">;</span></code></pre>

### Description

Add required annotation for a function argument.

The @Required decorator can be used on two cases.

To decorate a parameters:

```typescript
@Post("/")
async method(@Required() @BodyParams("field") field: string) {}
```

To decorate a model:

```typescript
class Model {
  @JsonProperty()
  @Required()
  field: string;
}
```

> Required will throw a BadRequest when the given value is `null`, an empty string or `undefined`.

### Allow a values

In some case, you didn't want trigger a BadRequest when the value is an empty string for example.
The decorator `@Allow()`, allow you to configure a value list for which there will be no exception.

```typescript
class Model {
  @JsonProperty()
  @Required()
  @Allow("")
  field: string;
}
```
