const path = require('path')
const pluginsConfig = require('./webpack.plguins.js')
const rulesConfig = require('./webpack.rules.js')
const entrys = require('./config/entrys.js')

let getAppEntry = function () {
  let entryObj = {}
  entrys.forEach(item => {
    entryObj[item] = path.resolve(__dirname, 'src/js', item + '.js')
  })
  return entryObj
}

const devMode = process.env.NODE_ENV !== 'production'

let config = {
  entry: {
    // 多入口文件
    ...getAppEntry(),
    rem: path.resolve(__dirname, 'src/utils/rem.js')
    // 由于每个都是互补相关的页面，没有公用性 lib建议单独引入
    // jquery: 'jquery',
    // zepto: 'zepto'
  },
  output: {
    path: path.resolve(__dirname, 'app'),
    // 打包多出口文件
    filename: devMode ? './js/[name].[hash:8].js' : './js/[name].[chunkhash:8].js',
    chunkFilename: devMode ? './chunk/[name].[hash:8].js' : './chunk/[name].[chunkhash:8].js'
  },
  plugins: pluginsConfig,
  module: {
    rules: rulesConfig
  },
  // 提取js
  optimization: {
    // splitChunks: {
    //  cacheGroups: {
    //    lib: {
    //      chunks: "initial",
    //      // name: "test",  // 此处的name为其他用于使用chunk名字的地方做服务
    //      enforce: true
    //    }
    //  }
    // }
  },
  resolve: {
    alias: {
      utils: path.resolve(__dirname, './src', 'utils'),
      styles: path.resolve(__dirname, './src', 'styles'),
      image: path.resolve(__dirname, './src', 'image'),
      lib: path.resolve(__dirname, './src', 'lib')
    }
  },
  mode: devMode ? 'development' : 'production'
}

if (devMode) {
  config.entry.mock = path.resolve(__dirname, 'mock/index.js')
  config.entry.index = path.resolve(__dirname, 'config/indexEntry.js')
}
module.exports = config
