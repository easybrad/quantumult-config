# quantumult-config

Quantumult X 完整配置：国内直连、广告拦截、国外统一代理。保留“代理出口 / 自动选择 / 手动选择”三个策略组。

## 配置下载

[QuantumultX.conf 原始配置链接](https://raw.githubusercontent.com/easybrad/quantumult-config/main/QuantumultX.conf)

```text
https://raw.githubusercontent.com/easybrad/quantumult-config/main/QuantumultX.conf
```

这是完整配置，请通过 Quantumult X 的“配置文件 → 下载”入口使用，不要添加到“资源－分流”。

## 首次使用

1. 备份当前配置和个人节点订阅地址。
2. 在 Quantumult X 设置的“配置文件 → 下载”中粘贴上面的原始配置链接，下载并应用。界面名称可能随版本变化。
3. 此公开模板不含节点，请在设备上添加自己的节点订阅并更新。若覆盖旧配置，原有个人设置可能需要恢复。
4. 更新全部远程分流资源，确认各资源已启用并成功加载。
5. 使用规则分流模式，“代理出口”选择“自动选择”。也可选“手动选择”并指定可用节点。
6. 通过请求记录检查实际命中的规则、策略和节点。

导入或重新下载完整模板可能覆盖设备上的个人节点、手动规则和其他配置；每次应用前先备份。不要将个人订阅密钥或 MITM 证书私钥提交到公开仓库。

## 分流组合

本地手动规则用于个人例外。远程资源按配置中的顺序排列：

| 顺序 | 规则资源 | 出口 |
| --- | --- | --- |
| 1 | Lan | direct |
| 2 | OpenAI | 代理出口 |
| 3 | Direct（去广告放行） | direct |
| 4 | Advertising | reject |
| 5 | GlobalMedia | 代理出口 |
| 6 | Apple | direct |
| 7 | Global | 代理出口 |
| 8 | ChinaMax | direct |
| 最终兜底 | FINAL | 代理出口 |

ChinaMax 已包含 China、ChinaIPs、ChinaMedia 等；Global 已包含 Proxy；Advertising 已包含 Privacy、Hijacking 等。同一出口通常无需再重复引用这些子列表。

Direct 按上游说明置于广告列表之前。Apple 直连是本模板的默认选择，部分需要代理的媒体例外由前面的 GlobalMedia 处理；如有特定服务需求，可添加更具体的个人规则。

规则分类不等于服务的实际地理位置，也不保证全部网站都被收录。大合集可能误判，需结合请求记录修正。

## 自动更新

- 8 个远程规则资源均设置 `update-interval=86400`，即 24 小时更新间隔；实际更新依赖 Quantumult X 的运行调度及资源地址可达。
- 节点订阅更新由用户在设备上自行配置。
- “自动选择”在活跃时按 600 秒间隔执行延迟测试，容差 50 毫秒；测试网址延迟不等于下载速度或流媒体解锁能力。
- 整份配置的策略组、DNS 和资源组合不会因为规则更新而自动改变。要应用本仓库后续对模板结构的修改，需重新下载并应用配置。

仓库无需定时复制上游规则；Quantumult X 直接从上游订阅地址拉取规则内容。

## 验证范围

已检查配置结构、策略引用和公开文件中的个人凭据清理。未在用户设备上验证实际连接、节点质量、地区解锁或所有网站的分流结果。

## 来源

- [blackmatrix7 / ios_rule_script](https://github.com/blackmatrix7/ios_rule_script)：分流资源。
- [Quantumult X 官方配置示例](https://github.com/crossutility/Quantumult-X/blob/master/sample.conf)：配置格式。
- [Direct 规则说明](https://github.com/blackmatrix7/ios_rule_script/blob/master/rule/QuantumultX/Direct/README.md)：广告放行顺序。
- [ChinaMax 规则说明](https://github.com/blackmatrix7/ios_rule_script/blob/master/rule/QuantumultX/ChinaMax/README.md)：合集范围。
- [KOP-XIAO / QuantumultX](https://github.com/KOP-XIAO/QuantumultX)：资源解析器及交互脚本。
- [Koolson / Qure](https://github.com/Koolson/Qure)：图标。
- 模板基于用户提供的 Centralmatrix3 配置整理，保留了部分网络参数和脚本引用；各上游资源遵循其各自许可及使用说明。
