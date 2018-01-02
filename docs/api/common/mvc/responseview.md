<header class="symbol-info-header">    <h1 id="responseview">ResponseView</h1>    <label class="symbol-info-type-label decorator">Decorator</label>      </header>
<section class="symbol-info">      <table class="is-full-width">        <tbody>        <tr>          <th>Module</th>          <td>            <div class="lang-typescript">                <span class="token keyword">import</span> { ResponseView }                 <span class="token keyword">from</span>                 <span class="token string">"ts-express-decorators"</span>                            </div>          </td>        </tr>        <tr>          <th>Source</th>          <td>            <a href="https://romakita.github.io/ts-express-decorators/#//blob/v3.0.0/src/mvc/decorators/method/responseView.ts#L0-L0">                mvc/decorators/method/responseView.ts            </a>        </td>        </tr>                </tbody>      </table>    </section>

### Overview

<pre><code class="typescript-lang">function <span class="token function">ResponseView</span><span class="token punctuation">(</span>viewPath<span class="token punctuation">:</span> <span class="token keyword">string</span><span class="token punctuation">,</span> viewOptions?<span class="token punctuation">:</span> Object<span class="token punctuation">)</span><span class="token punctuation">:</span> Function<span class="token punctuation">;</span></code></pre>

### Description

Renders a view and sends the rendered HTML string to the client. Optional parameter:

* viewOptions, an object whose properties define local variables for the view.

The view argument is a string that is the file path of the view file to render.
This can be an absolute path, or a path relative to the views setting.
If the path does not contain a file extension, then the view engine setting determines the file extension.
If the path does contain a file extension, then Express will load the module for the specified template engine (via require())
and render it using the loaded module’s __express function.

For more information, see [Using template engines with Express](http://expressjs.com/guide/using-template-engines.html).

> NOTE: The view argument performs file system operations like reading a file from disk and evaluating Node.js modules,
and as so for security reasons should not contain input from the end-user.
