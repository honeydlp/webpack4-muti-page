const path = require('path')
const pluginsConfig = require('./webpack.plguins.js')
const rulesConfig = require('./webpack.rules.js')
const webpackConf = require('./config/config.js')

let config = {
  devtool:  '#cheap-module-eval-source-map' ,
  entry: () => new Promise((resolve) => resolve(webpackConf.webpackEntrys())),
  output: {
    path: path.resolve(__dirname, 'app'),
    // 打包多出口文件
    filename: './js/[name].js',
    chunkFilename: './chunk/[name].js'
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
  mode: 'development'
}

module.exports = config
