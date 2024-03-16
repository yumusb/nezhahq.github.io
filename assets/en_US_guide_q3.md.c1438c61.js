import{_ as s,o as n,c as a,R as l}from"./chunks/framework.44fd0451.js";const A=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"en_US/guide/q3.md","filePath":"en_US/guide/q3.md","lastUpdated":1710617589000}'),o={name:"en_US/guide/q3.md"},p=l(`<h4 id="reverse-proxy-grpc-port-support-cloudflare-cdn" tabindex="-1">Reverse Proxy gRPC Port (support Cloudflare CDN) <a class="header-anchor" href="#reverse-proxy-grpc-port-support-cloudflare-cdn" aria-label="Permalink to &quot;Reverse Proxy gRPC Port (support Cloudflare CDN)&quot;">​</a></h4><p>Use Nginx or Caddy to reverse proxy gRPC</p><ul><li>Nginx configuration files</li></ul><div class="language-nginx"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">server</span><span style="color:#A6ACCD;"> {</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#89DDFF;"> listen </span><span style="color:#A6ACCD;">443 ssl http2</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#89DDFF;"> listen </span><span style="color:#A6ACCD;">[::]:443 ssl http2</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#89DDFF;"> server_name </span><span style="color:#A6ACCD;">data.example.com</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># The domain name where the Agent connects to Dashboard</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#89DDFF;"> ssl_certificate </span><span style="color:#A6ACCD;">         /data/letsencrypt/fullchain.pem</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># Your domain certificate path</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#89DDFF;"> ssl_certificate_key </span><span style="color:#A6ACCD;">     /data/letsencrypt/key.pem</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;">       </span><span style="color:#676E95;font-style:italic;"># Your domain&#39;s private key path</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#89DDFF;"> ssl_stapling </span><span style="color:#A6ACCD;">on</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#89DDFF;"> ssl_session_timeout </span><span style="color:#A6ACCD;">1d</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#89DDFF;"> ssl_session_cache </span><span style="color:#A6ACCD;">shared:SSL:10m</span><span style="color:#89DDFF;">;</span><span style="color:#A6ACCD;"> </span><span style="color:#676E95;font-style:italic;"># This line may conflict with other configuration files. If a conflict occurs, please comment out this line</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#89DDFF;"> ssl_protocols </span><span style="color:#A6ACCD;">TLSv1.1 TLSv1.2 TLSv1.3</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#89DDFF;"> underscores_in_headers </span><span style="color:#A6ACCD;">on</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#89DDFF;"> keepalive_time </span><span style="color:#A6ACCD;">24h</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#89DDFF;"> keepalive_requests </span><span style="color:#A6ACCD;">100000</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#89DDFF;"> keepalive_timeout </span><span style="color:#A6ACCD;">120s</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#C792EA;">location</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">/ </span><span style="color:#A6ACCD;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">       </span><span style="color:#89DDFF;"> grpc_read_timeout </span><span style="color:#A6ACCD;">300s</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">       </span><span style="color:#89DDFF;"> grpc_send_timeout </span><span style="color:#A6ACCD;">300s</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">       </span><span style="color:#89DDFF;"> grpc_socket_keepalive </span><span style="color:#A6ACCD;">on</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">       </span><span style="color:#89DDFF;"> grpc_pass </span><span style="color:#A6ACCD;">grpc://grpcservers</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">upstream</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">grpcservers </span><span style="color:#A6ACCD;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">server</span><span style="color:#A6ACCD;"> localhost:5555;</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span><span style="color:#89DDFF;"> keepalive </span><span style="color:#A6ACCD;">512</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><ul><li>Caddy configuration files</li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">data.example.com:443 { # The domain name where the Agent connects to Dashboard</span></span>
<span class="line"><span style="color:#A6ACCD;">    reverse_proxy {</span></span>
<span class="line"><span style="color:#A6ACCD;">        to localhost:5555</span></span>
<span class="line"><span style="color:#A6ACCD;">        transport http {</span></span>
<span class="line"><span style="color:#A6ACCD;">            versions h2c 2</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>Dashboard Configuration</p><ul><li>First login to the Dashboard and enter the admin panel, go to the settings page, fill in the <code>CDN Bypassed Domain/IP</code> with the domain name you configured in Nginx or Caddy, for example <code>data.example.com</code>, and save it.</li><li>Then open the <code>/opt/nezha/dashboard/data/config.yaml</code> file in the panel server and change <code>proxygrpcport</code> to the port that Nginx or Caddy is listening on, such as <code>443</code> as set in the previous step. Since we have SSL/TLS enabled in Nginx or Caddy, we need to set <code>tls</code> to <code>true</code>, restart the panel when you are done.</li></ul><p>Agent Configuration</p><ul><li>Log in to the admin panel, copy the one-click install command, and run the one-click install command on the corresponding server to reinstall the agent.</li></ul><p>Enable Cloudflare CDN (optional)</p><p>According to Cloudflare gRPC requirements: gRPC services must listen on port 443 and must support TLS and HTTP/2. So if you need to enable CDN, you must use port 443 when configuring Nginx or Caddy reverse proxy gRPC and configure the certificate (Caddy will automatically apply and configure the certificate).</p><ul><li>Log in to Cloudflare and select the domain you are using. Go to the <code>Network</code> page and turn on the <code>gRPC</code> switch, then go to the <code>DNS</code> page, find the resolution record of the domain with gRPC configuration, and turn on the orange cloud icon to enable CDN.</li></ul><p>After enable <code>gRPC</code> at cloudflare, it may not work immediately，so you may need to wait for a while, about 24hour or more. To be test if gRPC work, we can use <code>curl</code> and <code>nezha-agent -d</code>：</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">localhost:~/agent#</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">curl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-H</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">content-type: application/grpc+proto</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-H</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">authorization: Bearer test</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">https://xxx.xxx.ovh</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-v</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;"> processing: https://xxx.xxx.ovh</span></span>
<span class="line"><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;">   Trying </span><span style="color:#89DDFF;">[</span><span style="color:#F78C6C;">2606</span><span style="color:#A6ACCD;">:4700:3035::ac43:8bed</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;">:443...</span></span>
<span class="line"><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;"> Connected to xxx.xxx.ovh </span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">2606:4700:3035::ac43:8bed</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> port 443</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># ... SSL info</span></span>
<span class="line"><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;"> using HTTP/2</span></span>
<span class="line"><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;"> h2 </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">:method: GET</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;"> h2 </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">:scheme: https</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;"> h2 </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">:authority: xxx.xxx.ovh</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;"> h2 </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">:path: /</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;"> h2 </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">user-agent: curl/8.2.1</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;"> h2 </span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">accept: </span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;">/</span><span style="color:#89DDFF;">*]</span></span>
<span class="line"><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;"> Using Stream ID: 1</span></span>
<span class="line"><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> GET / HTTP/2</span></span>
<span class="line"><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> Host: xxx.xxx.ovh</span></span>
<span class="line"><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> User-Agent: curl/8.4.0</span></span>
<span class="line"><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> Accept: </span><span style="color:#89DDFF;">*</span><span style="color:#A6ACCD;">/</span><span style="color:#89DDFF;">*</span></span>
<span class="line"><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> content-type: application/grpc+proto</span></span>
<span class="line"><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> authorization: Bearer test</span></span>
<span class="line"><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;"> HTTP/2 405 </span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;"> date: Wed, 20 Dec 2023 08:56:27 GMT</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;"> content-type: application/grpc+proto</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;"> cf-ray: 8386ac12dabd5ddc-HKG</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;"> cf-cache-status: DYNAMIC</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;"> grpc-message: Received a HEADERS frame with :method </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">GET</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> which should be POST</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;"> grpc-status: 13</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#A6ACCD;"> report-to: </span><span style="color:#89DDFF;">{</span><span style="color:#FFCB6B;">&quot;endpoints&quot;</span><span style="color:#82AAFF;">:</span><span style="color:#A6ACCD;">[{&quot;</span><span style="color:#FFCB6B;">url</span><span style="color:#FFCB6B;">&quot;:&quot;</span><span style="color:#FFCB6B;">https:\\/\\/a.nel.cloudflare.com\\/report\\/v3?s</span><span style="color:#A6ACCD;">=%2BTjgJvXWyRF11nUOYx9Lq7UDC1xOYBLtjvWrdjVJQIqu9YqnFJeZFran2KRs6zabQc%2BLV8AubNqYRYDb7hQAZe6bglmVz0wQjrb0tNovYf%2B59SAp%2BQfZnH%2BAFDydNT95ZCmTPnKgWetcwQiUfXU%3D</span><span style="color:#FFCB6B;">&quot;}],&quot;</span><span style="color:#FFCB6B;">group</span><span style="color:#FFCB6B;">&quot;:&quot;</span><span style="color:#FFCB6B;">cf-nel</span><span style="color:#FFCB6B;">&quot;,&quot;</span><span style="color:#FFCB6B;">max_age</span><span style="color:#FFCB6B;">&quot;:604800}</span></span>
<span class="line"><span style="color:#FFCB6B;">&lt; nel: {&quot;</span><span style="color:#FFCB6B;">success_fraction</span><span style="color:#FFCB6B;">&quot;:0,&quot;</span><span style="color:#FFCB6B;">report_to</span><span style="color:#FFCB6B;">&quot;:&quot;</span><span style="color:#FFCB6B;">cf-nel</span><span style="color:#FFCB6B;">&quot;,&quot;</span><span style="color:#FFCB6B;">max_age</span><span style="color:#FFCB6B;">&quot;:604800}</span></span>
<span class="line"><span style="color:#FFCB6B;">&lt; vary: Accept-Encoding</span></span>
<span class="line"><span style="color:#FFCB6B;">&lt; server: cloudflare</span></span>
<span class="line"><span style="color:#FFCB6B;">&lt; alt-svc: h3=&quot;</span><span style="color:#FFCB6B;">:443</span><span style="color:#FFCB6B;">&quot;; ma=86400</span></span>
<span class="line"><span style="color:#FFCB6B;">&lt; </span></span>
<span class="line"><span style="color:#FFCB6B;">* Connection #0 to host xxx.xxx.ovh left intact</span></span>
<span class="line"><span style="color:#FFCB6B;">localhost:~/agent# /opt/nezha/agent/nezha-agent -s xxx.xxx.ovh:443 -p YOUR_KEY --tls -d</span></span>
<span class="line"><span style="color:#FFCB6B;">NEZHA@2023-12-20 05:14:00&gt;&gt; 检查更新： 0.15.14</span></span>
<span class="line"><span style="color:#FFCB6B;">NEZHA@2023-12-20 05:14:01&gt;&gt; 上报系统信息失败： rpc error: code = Unknown desc = EOF # Edit GRPCHost and TLS at /opt/nezha/dashboard/data/config.yaml.</span></span>
<span class="line"><span style="color:#FFCB6B;">NEZHA@2023-12-20 05:14:01&gt;&gt; Error to close connection ...</span></span></code></pre></div>`,15),e=[p];function t(c,r,D,C,y,i){return n(),a("div",null,e)}const d=s(o,[["render",t]]);export{A as __pageData,d as default};