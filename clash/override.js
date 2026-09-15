// Clash Verge Rev / Mihomo 全局扩展脚本。
// 保留机场节点、节点订阅、端口、TUN 和 DNS；替换分流及策略组。
// 无自动切换节点。应用后在“代理出口”手动选择具体节点。
function main(config) {
  const nodes = (config.proxies || []).map(function (p) { return p.name; });
  const providers = Object.keys(config['proxy-providers'] || {});
  if (!nodes.length && !providers.length) {
    throw new Error('没有可用的节点或节点订阅，请先启用机场配置。');
  }
  const reserved = ['代理出口', '苹果服务', '广告拦截'];
  if (nodes.some(function (n) { return reserved.indexOf(n) !== -1; })) {
    throw new Error('节点名称与策略组重名，请先重命名该节点。');
  }
  // 不静默破坏依赖机场旧策略组的链式代理。
  const oldGroups = (config['proxy-groups'] || []).map(function (g) { return g.name; });
  (config.proxies || []).forEach(function (p) {
    if (oldGroups.indexOf(p['dialer-proxy']) !== -1) {
      throw new Error('此订阅含依赖原策略组的 dialer-proxy，请单独适配。');
    }
  });
  const manual = {name: '代理出口', type: 'select'};
  if (nodes.length) manual.proxies = nodes;
  if (providers.length) manual.use = providers;
  config['proxy-groups'] = [
    manual,
    {name: '苹果服务', type: 'select', proxies: ['DIRECT', '代理出口']},
    {name: '广告拦截', type: 'select', proxies: ['REJECT', 'DIRECT']}
  ];
  config.mode = 'rule';
  config.profile = Object.assign({}, config.profile || {}, {'store-selected': true});
  const base = 'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/';
  const own = 'https://raw.githubusercontent.com/easybrad/quantumult-config/main/clash/';
  function provider(url, name, interval) {
    return {type: 'http', behavior: 'classical', format: 'yaml', url: url,
      path: './ruleset/easybrad/' + name + '.yaml', interval: interval,
      proxy: '代理出口'};
  }
  const rp = {};
  ['Lan', 'OpenAI', 'Direct', 'Advertising', 'GlobalMedia', 'Apple', 'Global', 'ChinaMax'].forEach(function (name) {
    const full = ['Advertising', 'GlobalMedia', 'Apple', 'Global', 'ChinaMax'].indexOf(name) !== -1;
    rp[name] = provider(base + name + '/' + name + (full ? '_Classical.yaml' : '.yaml'), name, 86400);
  });
  rp['CustomDirect'] = provider(own + 'custom-direct.yaml', 'custom-direct', 3600);
  rp['CustomReject'] = provider(own + 'custom-reject.yaml', 'custom-reject', 3600);
  config['rule-providers'] = rp;
  config.rules = [
    'RULE-SET,CustomReject,REJECT',
    'RULE-SET,CustomDirect,DIRECT',
    'RULE-SET,Lan,DIRECT',
    'RULE-SET,OpenAI,代理出口',
    'RULE-SET,Direct,DIRECT',
    'RULE-SET,Advertising,广告拦截',
    'RULE-SET,GlobalMedia,代理出口',
    'RULE-SET,Apple,苹果服务',
    'RULE-SET,Global,代理出口',
    'RULE-SET,ChinaMax,DIRECT',
    'MATCH,DIRECT'
  ];
  return config;
}
