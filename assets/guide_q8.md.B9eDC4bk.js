import{_ as e,c as a,o as d,a4 as o}from"./chunks/framework.BmdFiWrL.js";const g=JSON.parse('{"title":"使用 Cloudflare Access 作为 OAuth2 提供方","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"guide/q8.md","filePath":"guide/q8.md","lastUpdated":1720901424000}'),c={name:"guide/q8.md"},s=o(`<h1 id="使用-cloudflare-access-作为-oauth2-提供方" tabindex="-1">使用 Cloudflare Access 作为 OAuth2 提供方 <a class="header-anchor" href="#使用-cloudflare-access-作为-oauth2-提供方" aria-label="Permalink to &quot;使用 Cloudflare Access 作为 OAuth2 提供方&quot;">​</a></h1><p>相较于 Github，Cloudflare Access 对于中国大陆用户更加友好。如您当前使用 Github、Gitlab、Gitee 作为管理员账户登录时遇到问题，您可以考虑切换 Cloudflare Access 作为 OAuth2 提供方</p><h2 id="示例配置" tabindex="-1">示例配置： <a class="header-anchor" href="#示例配置" aria-label="Permalink to &quot;示例配置：&quot;">​</a></h2><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">Oauth2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  Admin</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">701b9ea6-9f56-48cd-af3e-cbb4bfc1475c</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  ClientID</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">3516291f53eca9b4901a01337e41be7dc52f565c8657d08a3fddb2178d13c5bf</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  ClientSecret</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">0568b67c7b6d0ed51c663e2fe935683007c28f947a27b7bd47a5ad3d8b56fb67</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  Endpoint</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;https://xxxxx.cloudflareaccess.com&quot;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  Type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">cloudflare</span></span></code></pre></div><h2 id="配置说明" tabindex="-1">配置说明： <a class="header-anchor" href="#配置说明" aria-label="Permalink to &quot;配置说明：&quot;">​</a></h2><table tabindex="0"><thead><tr><th>参数</th><th>获取方式</th></tr></thead><tbody><tr><td>Admin</td><td><code>My Team</code> -&gt; <code>Users</code> -&gt; <code>&lt;具体用户&gt;</code> -&gt; <code>User ID</code></td></tr><tr><td>ClientID/ClientSecret</td><td><code>Access</code> -&gt; <code>Application</code> -&gt; <code>Add an Application</code> <br> -&gt; <code>SaaS</code> -&gt; <code>OIDC</code></td></tr><tr><td>Endpoint</td><td><code>Access</code> -&gt; <code>Application</code> -&gt; <code>Application URL</code> -&gt; <code>只保留协议+域名的部分，路径不需要</code></td></tr></tbody></table><h3 id="新建-saas-oidc-应用流程" tabindex="-1">新建 SaaS-OIDC 应用流程 <a class="header-anchor" href="#新建-saas-oidc-应用流程" aria-label="Permalink to &quot;新建 SaaS-OIDC 应用流程&quot;">​</a></h3><p>前往 Zero Trust Dashboard：<a href="https://one.dash.cloudflare.com/" target="_blank" rel="noreferrer">https://one.dash.cloudflare.com/</a>，选择或新建一个账户（Account），然后按照以下步骤操作：</p><ol><li><code>My Team</code> -&gt; <code>Users</code> -&gt; 点击<code>&lt;具体用户&gt;</code> -&gt; 获取 <code>User ID</code> 并保存 <em>（如果是第一次使用 Zero Trust，Users 列表会为空，可暂时跳过这一步；你需要完成一次验证后，用户才会出现在 Users 列表中）</em>；</li><li><code>Access</code> -&gt; <code>Applications</code> -&gt; <code>Add an Application</code>;</li><li>选择 <code>SaaS</code>，在 <code>Application</code> 字段中输入自定义的应用名称（例如 <code>nezha</code>），选择 <code>OIDC</code> 后点击 <code>Add application</code>;</li><li><code>Scopes</code> 选择 <code>openid</code>, <code>email</code>, <code>profile</code>, <code>groups</code>;</li><li>在 <code>Redirect URLs</code> 中填写你的 Dashboard Callback 地址，例如 <code>https://dashboard.example.com/oauth2/callback</code>;</li><li>分别记录 <code>Client ID</code>、<code>Client Secret</code> 和 <code>Issuer</code> 地址中的协议与域名部分，例如 <code>https://xxxxx.cloudflareaccess.com</code>;</li><li>编辑 Dashboard 配置文件（通常位于 <code>/opt/nezha/dashboard/data/config.yaml</code>），参照示例配置修改 <code>OAuth2</code> 设置，并重启 Dashboard 服务。</li></ol><h3 id="身份验证策略配置" tabindex="-1">身份验证策略配置 <a class="header-anchor" href="#身份验证策略配置" aria-label="Permalink to &quot;身份验证策略配置&quot;">​</a></h3><p>在完成 Dashboard 设置后，您还需要在 Zero Trust Dashboard 中配置身份验证策略，路径为：<code>Access</code> -&gt; <code>Applications</code> -&gt; <code>&lt;应用名&gt;</code> -&gt; <code>Policies</code>。您可以选择多种 SSO 验证方式，包括邮件 OTP 验证、硬件密钥验证等，详细配置请参考 <a href="https://developers.cloudflare.com/cloudflare-one/" target="_blank" rel="noreferrer">Cloudflare Zero Trust 文档</a>。</p><h3 id="策略配置示例-one-time-pin" tabindex="-1">策略配置示例（One-time PIN） <a class="header-anchor" href="#策略配置示例-one-time-pin" aria-label="Permalink to &quot;策略配置示例（One-time PIN）&quot;">​</a></h3><p>默认使用邮件 OTP 验证方式：</p><ol><li><code>Access</code> -&gt; <code>Applications</code> -&gt; <code>&lt;应用名&gt;</code> -&gt; <code>Policies</code> -&gt; <code>Add a policy</code>;</li><li>设置一个 <code>Policy Name</code>，例如 <code>OTP</code>，<code>Action</code> 设置为 <code>Allow</code>;</li><li>在 <code>Configure rules</code> 下新增一条 <code>Include</code> 规则，<code>Selector</code> 选择 <code>Emails</code>，在文本框中输入你的邮箱地址；</li><li>点击 <code>Save policy</code> 保存策略。</li></ol><h3 id="测试策略" tabindex="-1">测试策略 <a class="header-anchor" href="#测试策略" aria-label="Permalink to &quot;测试策略&quot;">​</a></h3><ol><li>在配置正确的情况下，访问 Dashboard 登录界面，会显示为 <code>使用 Cloudflare 账号登录</code>，点击登录会跳转到 Cloudflare Access 登录页面；</li><li>输入前面配置的 Email 地址，点击 <code>Send me a code</code>，输入收到的验证码，即可登录 Dashboard；</li><li>如果在之前的步骤中，未在 <code>Admin</code> 中未填写 <code>User ID</code>，登录后会提示错误信息：“该用户不是本站点管理员，无法登录”。此时需要在 <code>My Team</code> -&gt; <code>Users</code> 中找到对应的用户，点击用户名获取 <code>User ID</code> 并填写到 Dashboard 配置文件里的 <code>Admin</code> 部分，重启 Dashboard 服务后再次尝试登录。</li></ol>`,16),t=[s];function i(l,r,n,h,p,u){return d(),a("div",null,t)}const b=e(c,[["render",i]]);export{g as __pageData,b as default};