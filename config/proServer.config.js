const path = require('path')
const proxyConfig = require('./config')
const PROXY_ENV = process.env.PROXY_ENV

const devServer = {
  // contentBase: config.output.path,
  contentBase: path.resolve(__dirname, '..', 'app'),
  watchContentBase: true,
  disableHostCheck: true,
  host: 'localhost',
  port: '8091',
  hot: true, // 开启热更新
  overlay: true,
  inline: true,
  open: true,
  clientLogLevel: 'none',
  proxy: [{
    context: proxyConfig.proxy,
    target: proxyConfig.config[PROXY_ENV]['baseUrl'],
    onProxyReq: function (proxyReq, req, res) {
      proxyReq.setHeader('cookie', proxyConfig.config[PROXY_ENV]['cookie'])
    }
  }]
}

module.exports = devServer
