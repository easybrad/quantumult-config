# quantumult-config

## Clash Verge Rev（Mac）

已提供[覆写脚本和安装说明](clash/README.md)：保留机场节点，手动固定代理出口，苹果服务可单独切换，默认 MATCH,DIRECT；规则集合独立更新。复制[脚本原始内容](https://raw.githubusercontent.com/easybrad/quantumult-config/main/clash/override.js)到全局扩展脚本。脚本本身是本地副本，不会随规则集合更新自动替换。

Quantumult X 完整配置：国内直连、广告拦截、明确匹配的国外规则统一代理、未匹配流量默认直连。保留“代理出口 / 自动选择”两个策略组，手动模式复用 Quan 内置的 proxy 节点选择。

## 已在使用：只更新规则，保留证书和节点

**日常增删域名规则不需要重新下载完整配置，也不需要重新生成证书。**

[一键添加自定义修正订阅](https://quantumult.app/x/open-app/add-resource?remote-resource=%7B%22filter_remote%22%3A%5B%22https%3A%2F%2Fraw.githubusercontent.com%2Feasybrad%2Fquantumult-config%2Fmain%2Fcustom.list%2C%20tag%3D%E8%87%AA%E5%AE%9A%E4%B9%89%E4%BF%AE%E6%AD%A3%2C%20inserted-resource%3Dtrue%2C%20update-interval%3D3600%2C%20opt-parser%3Dfalse%2C%20enabled%3Dtrue%22%5D%7D)

此链接使用 Quantumult X 官方 `add-resource` 接口，仅添加一个 `filter_remote` 资源，不修改设备上的 MITM 证书、节点订阅、DNS 或策略组。首次添加一次即可；不要反复点击制造重复资源。

如果点击后没有唤起 Quan，在“资源－分流”中手动添加：

| 选项 | 设置 |
| --- | --- |
| 资源标签 | 自定义修正 |
| 资源路径 | https://raw.githubusercontent.com/easybrad/quantumult-config/main/custom.list |
| 插入资源 | 开启，使修正规则优先于本地普通规则 |
| 自动更新 | 1 小时 |
| 策略偏好 | 关闭，保留每条规则自己的 direct / reject / 代理策略 |
| 资源解析器 | 关闭，文件已是 Quantumult X 格式 |

`custom.list` 当前保留原配置中的 `host, msmp.abchina.com.cn, reject`。后续此类阻断、放行、代理例外在这个列表维护。更新列表后，可以在 Quan 手动更新“自定义修正”立即拉取，或等待自动更新间隔。

原有广告、国内、国外等订阅继续独立更新。若旧配置本地还保留同一条农行阻断，暂时重复不影响这条规则的结果；自定义修正以插入资源优先应用。

完整模板仅用于首次初始化。已经安装并信任的证书可以继续用；如果此前覆盖模板丢失证书配置，可以从自己的旧备份恢复原 `[mitm]` 内容，无需为规则更新重新生成证书。证书私钥和节点订阅密钥留在设备上，不放进公开仓库。

策略组、DNS、节点及证书的结构性变更仍需单独操作；远程分流列表只负责规则，不会修改这些设置。

## 已有配置：将最终兜底改为直连

这项变更只需在手机本地修改一次；更新远程分流订阅不会替换本地 FINAL。

在当前配置的文本编辑器中找到 `[filter_local]`，把原有的 `final, 代理出口`（或 `final, proxy`）替换成：

```ini
final, direct
```

保留一个 FINAL，放在该段普通本地规则之后；保存并使用规则分流模式。无需重新导入完整配置，也无需重新生成证书。“代理出口”继续选择 `proxy`，在主界面手动固定节点。

未匹配域名将直连。如果某个国外服务无法访问，先看请求记录；确认命中 FINAL 且手动测试代理可解决后，在 `custom.list` 添加具体域名规则，例如 `host-suffix, example.com, 代理出口`（仅为格式示例）。刷新“自定义修正”即可生效，无需新增策略组。已命中国外规则的请求仍会走代理。

## 首次初始化配置下载

[QuantumultX.conf 原始配置链接](https://raw.githubusercontent.com/easybrad/quantumult-config/main/QuantumultX.conf)

```text
https://raw.githubusercontent.com/easybrad/quantumult-config/main/QuantumultX.conf
```

这是完整配置，请通过 Quantumult X 的“配置文件 → 下载”入口使用，不要添加到“资源－分流”。

## 首次初始化步骤

1. 备份当前配置和个人节点订阅地址。
2. 在 Quantumult X 设置的“配置文件 → 下载”中粘贴上面的原始配置链接，下载并应用。界面名称可能随版本变化。
3. 此公开模板不含节点，请在设备上添加自己的节点订阅并更新。若覆盖旧配置，原有个人设置可能需要恢复。
4. 更新全部远程分流资源，确认各资源已启用并成功加载。
5. 使用规则分流模式。“代理出口”选择 `proxy` 时，在主界面节点列表手动选节点；选择“自动选择”时，由测速组选择节点。
6. 通过请求记录检查实际命中的规则、策略和节点。

导入或重新下载完整模板可能覆盖设备上的个人节点、手动规则和其他配置；每次应用前先备份。不要将个人订阅密钥或 MITM 证书私钥提交到公开仓库。

## 手动与自动如何切换

明确需要代理的规则指向“代理出口”；FINAL 默认 direct。日常使用选择 proxy 并手动固定节点，自动选择仅为可选功能：

| 代理出口的选择 | 实际使用的节点 | 在哪里操作 |
| --- | --- | --- |
| proxy | Quan 主界面节点列表选中的节点 | 点击主界面节点 |
| 自动选择 | 自动测速组选中的节点 | 切到自动选择，必要时手动触发测速 |

内置 PROXY 节点列表仍会显示；自动模式下，它的手动勾选项不代表“自动选择”组的结果。国内 direct 与广告 reject 不受代理节点切换影响。

### 从旧版升级并保留已添加的节点

本次只涉及策略组，不必重新导入完整模板。在设备的配置文本编辑器中：

1. 将 `static = 代理出口, 自动选择, 手动选择` 改为 `static = 代理出口, proxy, 自动选择`。
2. 删除 `static = 手动选择, server-tag-regex=^` 那一行。
3. 保存，在“代理出口”中明确选择 `proxy`；之后主界面的手动节点选择就用于代理流量。
4. 需要自动测速选节点时，将“代理出口”切为“自动选择”。

## 分流组合

自定义例外由远程 custom.list 管理。该资源作为插入资源优先应用；其他远程资源按配置中的顺序排列：

| 顺序 | 规则资源 | 出口 |
| --- | --- | --- |
| 优先 | custom.list（自定义修正） | 按条目策略 |
| 1 | Lan | direct |
| 2 | OpenAI | 代理出口 |
| 3 | Direct（去广告放行） | direct |
| 4 | Advertising | reject |
| 5 | GlobalMedia | 代理出口 |
| 6 | Apple | direct |
| 7 | Global | 代理出口 |
| 8 | ChinaMax | direct |
| 最终兜底 | FINAL | direct |

ChinaMax 已包含 China、ChinaIPs、ChinaMedia 等；Global 已包含 Proxy；Advertising 已包含 Privacy、Hijacking 等。同一出口通常无需再重复引用这些子列表。

Direct 按上游说明置于广告列表之前。Apple 直连是本模板的默认选择，部分需要代理的媒体例外由前面的 GlobalMedia 处理；如有特定服务需求，可添加更具体的个人规则。

规则分类不等于服务的实际地理位置，也不保证全部网站都被收录。大合集可能误判，需结合请求记录修正。

## 自动更新

- 自定义修正资源设置 `update-interval=3600`，即 1 小时更新间隔。
- 其余 8 个远程规则资源均设置 `update-interval=86400`，即 24 小时更新间隔；实际更新依赖 Quantumult X 的运行调度及资源地址可达。
- 节点订阅更新由用户在设备上自行配置。
- “自动选择”在活跃时按 600 秒间隔执行延迟测试，容差 50 毫秒；测试网址延迟不等于下载速度或流媒体解锁能力。
- 整份配置的策略组、DNS 和资源组合不会因为规则更新而自动改变。确需修改这些结构时，优先只修改相关配置段以保留设备设置，避免整份覆盖。

仓库无需定时复制上游规则；Quantumult X 直接从上游订阅地址拉取规则内容。

## 验证范围

已检查配置结构、策略引用和公开文件中的个人凭据清理。未在用户设备上验证实际连接、节点质量、地区解锁或所有网站的分流结果。

## 来源

- [Quantumult X 官方 URL Scheme](https://github.com/crossutility/Quantumult-X/blob/master/url-scheme.md)：add-resource 仅添加资源。

- [blackmatrix7 / ios_rule_script](https://github.com/blackmatrix7/ios_rule_script)：分流资源。
- [Quantumult X 官方配置示例](https://github.com/crossutility/Quantumult-X/blob/master/sample.conf)：配置格式。
- [Direct 规则说明](https://github.com/blackmatrix7/ios_rule_script/blob/master/rule/QuantumultX/Direct/README.md)：广告放行顺序。
- [ChinaMax 规则说明](https://github.com/blackmatrix7/ios_rule_script/blob/master/rule/QuantumultX/ChinaMax/README.md)：合集范围。
- [KOP-XIAO / QuantumultX](https://github.com/KOP-XIAO/QuantumultX)：资源解析器及交互脚本。
- [Koolson / Qure](https://github.com/Koolson/Qure)：图标。
- 模板基于用户提供的 Centralmatrix3 配置整理，保留了部分网络参数和脚本引用；各上游资源遵循其各自许可及使用说明。
