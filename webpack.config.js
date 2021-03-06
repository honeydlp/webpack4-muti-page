const path = require('path')
const pluginsConfig = require('./webpack.plguins.js')
const rulesConfig = require('./webpack.rules.js')
const entrys = require('./config/entrysTool.js')

let getAppEntry = function () {
  let entryObj = {}
  entrys.forEach(item => {
    entryObj[item] = path.resolve(__dirname, 'src/js', item)
  })
  return entryObj
}

const devMode = process.env.NODE_ENV !== 'production'
let config = {
  entry: {
    // 多入口文件
    ...getAppEntry(),
    rem: path.resolve(__dirname, 'src/utils/rem.js')
  },
  output: {
    path: path.resolve(__dirname, 'app'),
    // 打包多出口文件
    filename: './js/[name].[chunkhash:8].js',
    chunkFilename: './chunk/[name].[chunkhash:8].js'
  },
  plugins: pluginsConfig,
  module: {
    rules: rulesConfig
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      utils: path.resolve(__dirname, './src', 'utils'),
      styles: path.resolve(__dirname, './src', 'styles'),
      image: path.resolve(__dirname, './src', 'image'),
      lib: path.resolve(__dirname, './src', 'lib')
    }
  },
  mode: 'production'
}

module.exports = config
