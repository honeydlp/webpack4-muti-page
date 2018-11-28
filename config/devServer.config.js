const path = require('path')
// const config = require('../webpack.config')
const proxyConfig = require('./proxy.config')
const PROXY_ENV = process.env.PROXY_ENV

const devServer = {
  // contentBase: config.output.path,
  contentBase: path.resolve(__dirname, '..', 'src'),
  watchContentBase: true,
  disableHostCheck: true,
  host: 'localhost',
  port: '8090',
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
