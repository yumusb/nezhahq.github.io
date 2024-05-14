import{_ as s,o as a,c as e,R as n}from"./chunks/framework.44fd0451.js";const C=JSON.parse('{"title":"","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"guide/dashboardq.md","filePath":"guide/dashboardq.md","lastUpdated":1715651890000}'),o={name:"guide/dashboardq.md"},l=n(`<h2 id="为什么管理面板中显示的-ip-和-agent-实际-ip-不一致" tabindex="-1">为什么管理面板中显示的 IP 和 Agent 实际 IP 不一致？ <a class="header-anchor" href="#为什么管理面板中显示的-ip-和-agent-实际-ip-不一致" aria-label="Permalink to &quot;为什么管理面板中显示的 IP 和 Agent 实际 IP 不一致？&quot;">​</a></h2><p>首先解释管理面板中显示的IP是怎么得到的：Agent 会每隔一段时间请求一遍 IP-API，获取到 IP 信息后上报到 Dashboard，目前使用的 IP-API 可在此查看：<a href="https://github.com/nezhahq/agent/blob/main/pkg/monitor/myip.go" target="_blank" rel="noreferrer">myip.go</a>。<br> 如您发现管理面板中显示的 IP 和服务商提供给您的 IP 不一致，最大的可能是服务商给您的是<strong>入口 IP</strong>，但 Agent 测试的是您的<strong>出口 IP</strong>。这个问题也可能会出现在多线服务器和 IPLC 专线中。</p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>举个简单也十分常见的例子，服务商给您提供的是一台高防服务器，为了同时满足高防和低网络中断率的目标，提供给您的 IP 可能是经过映射后的高防 IP 而并非您服务器的真实出口 IP。</p></div><p>您也可以在 Agent 服务器中运行以下命令测试出口 IP:</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">curl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">https://ipapi.co/ip/</span></span>
<span class="line"><span style="color:#FFCB6B;">curl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">ip.sb</span></span>
<span class="line"><span style="color:#FFCB6B;">curl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">ip-api.com</span></span></code></pre></div><h2 id="忘记查看密码-删除查看密码" tabindex="-1">忘记查看密码\\删除查看密码 <a class="header-anchor" href="#忘记查看密码-删除查看密码" aria-label="Permalink to &quot;忘记查看密码\\删除查看密码&quot;">​</a></h2><p>请查看或编辑 <code>/opt/nezha/dashboard/data/config.yaml</code> 文件。<br> 密码位于 <code>site-viewpassword</code> 项中。</p><h2 id="面板安装-重启-更新失败-iptables" tabindex="-1">面板安装/重启/更新失败: iptables ...... <a class="header-anchor" href="#面板安装-重启-更新失败-iptables" aria-label="Permalink to &quot;面板安装/重启/更新失败: iptables ......&quot;">​</a></h2><p>首先尝试重启 Docker 再操作：</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">systemctl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">status</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">docker</span></span>
<span class="line"><span style="color:#FFCB6B;">systemctl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">restart</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">docker</span></span>
<span class="line"><span style="color:#FFCB6B;">systemctl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">status</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">docker</span></span></code></pre></div><p>重启后尝试重新安装面板。<br> 若依然出现 iptables... 等错误，则考虑直接关闭 iptables 甚至移除 iptables。<br> 这个问题也可能与内核有关，也可以尝试更换官方内核。</p><h2 id="面板重启失败-invalid-hostport-nz-site-port-等" tabindex="-1">面板重启失败：Invalid hostPort: nz_site_port 等 <a class="header-anchor" href="#面板重启失败-invalid-hostport-nz-site-port-等" aria-label="Permalink to &quot;面板重启失败：Invalid hostPort: nz_site_port 等&quot;">​</a></h2><p>如出现此问题，可以通过安装脚本修改配置，或者直接修改 <code>/opt/nezha/dashboard/docker-compose.yaml</code> 文件。</p><h2 id="面板布局错误、css-资源无法被加载" tabindex="-1">面板布局错误、CSS 资源无法被加载 <a class="header-anchor" href="#面板布局错误、css-资源无法被加载" aria-label="Permalink to &quot;面板布局错误、CSS 资源无法被加载&quot;">​</a></h2><p>如果出现 Dashboard 页面布局错误，通常是 CSS 文件丢失或无法被加载。<br> 出现此类错误，可以先尝试 <code>重启并更新面板</code>。<br> 如果更新面板后问题没有得到解决，那么可能是你的 vhost 配置文件内有不适用的配置，你可以编辑 Nginx 的 vhost 文件或在宝塔面板内：</p><ol><li><p>在 <code>网站</code> 中找到安装 Dashboard 时配置的站点，点击右侧 <code>设置</code>。</p></li><li><p>选择 <code>配置文件</code>，删除配置文件中的：</p><div class="language-nginx"><button title="Copy Code" class="copy"></button><span class="lang">nginx</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">location</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">~</span><span style="color:#A6ACCD;"> .*\\.(js|css)?$</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">{</span></span>
<span class="line"><span style="color:#F07178;">       </span><span style="color:#89DDFF;"> expires </span><span style="color:#F07178;">     </span><span style="color:#F78C6C;">12h</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">       </span><span style="color:#89DDFF;"> error_log </span><span style="color:#F07178;">/dev/null</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">       </span><span style="color:#89DDFF;"> access_log </span><span style="color:#F07178;">/dev/null</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    }</span></span></code></pre></div></li><li><p>保存配置，并清空浏览器、Nginx、CDN 中的缓存，此时刷新页面应恢复正常。</p></li></ol><h2 id="面板无法启动-panic-无法找到配置的-ddns-提供者" tabindex="-1">面板无法启动：panic: 无法找到配置的 DDNS 提供者... <a class="header-anchor" href="#面板无法启动-panic-无法找到配置的-ddns-提供者" aria-label="Permalink to &quot;面板无法启动：panic: 无法找到配置的 DDNS 提供者...&quot;">​</a></h2><p>填入的 DDNS provider 的值有误，目前仅支持 <code>webhook</code>、<code>cloudflare</code>、<code>tencentcloud</code> 和 <code>dummy</code>。</p><h2 id="面板更新-ddns-崩溃-panic-interface-conversion-interface-is-nil-not-interface" tabindex="-1">面板更新 DDNS 崩溃：panic: interface conversion: interface {} is nil, not []interface {} <a class="header-anchor" href="#面板更新-ddns-崩溃-panic-interface-conversion-interface-is-nil-not-interface" aria-label="Permalink to &quot;面板更新 DDNS 崩溃：panic: interface conversion: interface {} is nil, not []interface {}&quot;">​</a></h2><p>填入的 DDNS <code>AccessID</code> 或 <code>AccessSecret</code> 有误。</p><h2 id="打开网络监控页显示-server-monitor-history-not-found" tabindex="-1">打开网络监控页显示：server monitor history not found <a class="header-anchor" href="#打开网络监控页显示-server-monitor-history-not-found" aria-label="Permalink to &quot;打开网络监控页显示：server monitor history not found&quot;">​</a></h2><p>出现此错误说明没有在服务页中设置 TCP-Ping 和 ICMP-Ping 类型的监控或者监控数据还未生成。<br> 如已经设置完毕，可以等待一段时间后再查看。</p>`,22),t=[l];function p(r,c,i,d,h,y){return a(),e("div",null,t)}const b=s(o,[["render",p]]);export{C as __pageData,b as default};