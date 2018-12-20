const open = require('open')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const config = { mode: 'production' }
const devServerConfig = require('../config/proServer.config')

WebpackDevServer.addDevServerEntrypoints(config, devServerConfig)
new WebpackDevServer(webpack(config), devServerConfig)
  .listen(devServerConfig.port, (err) => {
    // 该回调不会执行
    if (err) {
      console.log(err)
    }
    console.log('Listening at localhost:' + devServerConfig.port)
  })

open('http://localhost:' + devServerConfig.port)
