<header class="symbol-info-header">    <h1 id="cookies">Cookies</h1>    <label class="symbol-info-type-label decorator">Decorator</label>    <label class="api-type-label aliasof">CookiesParams</label>  </header>
<section class="symbol-info">      <table class="is-full-width">        <tbody>        <tr>          <th>Module</th>          <td>            <div class="lang-typescript">                <span class="token keyword">import</span> { Cookies }                 <span class="token keyword">from</span>                 <span class="token string">"ts-express-decorators"</span>                            </div>          </td>        </tr>        <tr>          <th>Source</th>          <td>            <a href="https://romakita.github.io/ts-express-decorators/#//blob/v3.0.0/src/filters/decorators/cookies.ts#L0-L0">                filters/decorators/cookies.ts            </a>        </td>        </tr>                </tbody>      </table>    </section>

### Overview

<pre><code class="typescript-lang">function <span class="token function">Cookies</span><span class="token punctuation">(</span>expression?<span class="token punctuation">:</span> <span class="token keyword">string</span> | <span class="token keyword">any</span><span class="token punctuation">,</span> useType?<span class="token punctuation">:</span> <span class="token keyword">any</span><span class="token punctuation">)</span><span class="token punctuation">:</span> Function<span class="token punctuation">;</span></code></pre>

Param | Type | Description
---|---|---
expression| <code>string &#124; any</code> |Optional. The path of the property to get.
useType| <code>any</code> |Optional. The type of the class that to be used to deserialize the data.


### Description

Cookies o CookiesParams return the value from [request.cookies](http://expressjs.com/en/4x/api.html#req.cookies) object.

#### Example

```typescript
@Controller('/')
class MyCtrl {
   @Post('/')
   create(@Cookies() body: any) {
      console.log('Entire body', body);
   }

   @Post('/')
   create(@Cookies('id') id: string) {
      console.log('ID', id);
   }

   @Post('/')
   create(@Cookies('user') user: User) { // with deserialization
      console.log('user', user);
   }

   @Post('/')
   create(@Cookies('users', User) users: User[]) { // with deserialization
      console.log('users', users);
   }
}
```
> For more information on deserialization see [converters](docs/converters.md) page.
