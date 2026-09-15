# Clash Verge Rev 覆写

适用于使用 Mihomo 内核的 Clash Verge Rev。保留现有机场节点订阅，通过 JavaScript 扩展替换规则和策略组。

## 安装

1. 保留并启用当前机场订阅，先备份已有扩展脚本。
2. 打开 [override.js 原始内容](https://raw.githubusercontent.com/easybrad/quantumult-config/main/clash/override.js)，复制全部 JavaScript。
3. 在 Clash Verge Rev 的订阅页打开“全局扩展脚本”编辑器，将内容替换为上述脚本并保存。不同版本入口名称可能不同；这是 JavaScript 脚本，不是 YAML 合并配置，也不是机场订阅链接。
4. 重新应用当前订阅，确认没有脚本或内核配置错误。全局脚本会作用于其他订阅；不要再叠加修改相同策略组和规则的旧脚本。
5. 在“代理出口”中手动选定具体节点，运行模式使用“规则”。首次安装没有已保存选择时会使用候选节点，不会自动测速择优；应明确选一次。节点失效需手动换节点。
6. 在规则集合页面刷新并确认全部 10 个集合成功加载。下载规则使用“代理出口”，若下载失败先检查手选节点是否可用。

不需要重新导入机场节点，不需要证书。停用本扩展（或恢复原脚本）并重新应用订阅可回到原有分流；必要时恢复客户端此前的模式选择。

## 策略

| 策略组 | 用途 |
| --- | --- |
| 代理出口 | 只允许手动选择订阅节点，无 url-test、fallback 或 load-balance 组 |
| 苹果服务 | 默认 DIRECT，可手动切到代理出口 |
| 广告拦截 | 默认 REJECT，可手动切 DIRECT 放行 |

规则顺序：自定义阻断、自定义直连、Lan、OpenAI、Direct 广告放行例外、Advertising、GlobalMedia、Apple、Global、ChinaMax，最后 MATCH,DIRECT。

农行 msmp.abchina.com.cn 精确阻断；同花顺 123ths.com、10jqka.com.cn、hexin.cn 直连。OpenAI 及依赖统一走代理出口。苹果组只控制命中 Apple 集合的请求，更靠前的规则仍有优先权。

脚本保留输入配置的节点、节点提供者、DNS、端口、TUN、控制接口等设置；保留 DNS 意味着原订阅的 DNS 仍然生效，本次没有单独重做 DNS。它替换原策略组、规则和规则提供者，保存手动选择，并设置规则模式。依赖原策略组的 dialer-proxy 节点会报错，需单独适配；本脚本针对普通节点订阅。

## 更新

- 8 个上游集合每 24 小时更新；Advertising、GlobalMedia、Apple、Global、ChinaMax 使用完整 `_Classical.yaml`，Lan、OpenAI、Direct 使用未拆分的普通 `.yaml`。部分同名普通 `.yaml` 已拆分，不能当作完整集合单独使用。
- 自定义直连与阻断各自每 1 小时更新，分别来自本目录 custom-direct.yaml、custom-reject.yaml。它们与 Quan 根目录 custom.list 对应，目前需同步维护两种格式，不会自动互相转换。
- 机场更新节点后，扩展再次处理新的节点列表；不把节点凭据写入本仓库。
- 粘贴进客户端的脚本是本地副本：GitHub 修改 override.js 后，需要重新复制一次。规则内容自动更新，不代表脚本本身自动更新。扩展脚本运行环境不提供网络 IO，不能在脚本内 fetch 自身。
- 更新需要客户端运行且下载地址可达。首次规则未下载完整时不要仅凭 MATCH,DIRECT 判断代理规则已生效。

## 验证

发布前使用上传配置验证节点保留、规则引用、手动策略和直连兜底，并检查上游文件内容。尚未在用户 Mac 上应用，最终以客户端内核校验、集合加载状态和连接记录为准。

来源：[Clash Verge Rev 扩展脚本](https://www.clashverge.dev/guide/script.html)、[Mihomo 规则集合](https://wiki.metacubex.one/config/rule-providers/)。
