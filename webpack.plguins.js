const webpack = require('webpack')
const path = require('path')
const glob = require('glob')
// 消除冗余的css
const PurifyCssWebpack = require('purifycss-webpack')
// html模板
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 清除目录等
const CleanWebpackPlugin = require('clean-webpack-plugin')
// 分离css
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 压缩css
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
// 静态资源输出
const CopyWebpackPlugin = require('copy-webpack-plugin')
// 处理src下面.html文件名字
const entrys = require('./config/entrys.js')

// 自动生成html模板
let htmpConf = function (extendChunks = []) {
  let htmlArr = []
  entrys.forEach(pathname => {
    htmlArr.push(
      new HtmlWebpackPlugin({
        chunks: extendChunks.concat([pathname]),
        filename: pathname + '.html',
        template: `./src/${pathname}.html`,
        chunksSortMode: 'manual',
        minify:{
					collapseInlineTagWhitespace: true,
					collapseInlineTagWhitespace: true,
					collapseWhitespace: true,
					minifyCSS: true,
					minifyJS: true,
				},
        meta: {
          'Content-Type': { 'http-equiv': 'Content-Type', 'content': 'text/html;charset=UTF-8' },
          'expires': { 'http-equiv': 'expires', 'content': '0' },
          'pragma': { 'http-equiv': 'pragma', 'content': 'no-cache' },
          'cache-control': { 'http-equiv': 'cache-control', 'content': 'no-cache' },
          'viewport': 'width=device-width, initial-scale=1.0, user-scalable=no',
          'renderer': 'webkit|ie-comp|ie-stand',
          'format-detection': 'telephone=no, email=no',
          'ML-Config': 'fullscreen=yes,preventMove=no',
          'x5-fullscreen': 'true',
          'apple-mobile-web-app-capable': 'yes',
          'apple-touch-fullscreen': 'yes',
          'apple-mobile-web-app-status-bar-style': 'black'
        }
      }))
  })
  return htmlArr
}

const devMode = process.env.NODE_ENV !== 'production'

let pluginsConfig = [
  new CopyWebpackPlugin([{
    from: 'src/assets',
    to: './assets'
  }]),
  new CopyWebpackPlugin([{
    from: 'src/lib',
    to: './lib'
  }]),
  // 分离css插件参数为提取出去的路径
  new MiniCssExtractPlugin({
    filename: devMode ? 'css/[name].css' : 'css/[name].[contenthash:8].css',
    chunkFilename: devMode ? 'css/[id].css' : 'css/[id].[contenthash:8].css',
  }),
  // 消除冗余的css代码
  new PurifyCssWebpack({
    // glob为扫描模块，使用其同步方法（请谨慎使用异步方法）
    paths: glob.sync(path.join(__dirname, 'src/*.html'))
  }),
  // 全局暴露统一入口
  new webpack.ProvidePlugin({
    // $: "jquery",
    // zepto: "zepto"
  })
]
if (devMode) {
  pluginsConfig.push(
    // 目录页
    new HtmlWebpackPlugin({
      chunks: ['index']
    }),
    new webpack.DefinePlugin({
      IS_DEV: true,
      IS_MOCK: process.env.IS_MOCK === 'true',
      INDEX_LIST: JSON.stringify(entrys)
    }),
    new webpack.HotModuleReplacementPlugin(),
    ...htmpConf(['mock', 'rem'])
  )
} else {
  pluginsConfig.push(
    new CleanWebpackPlugin(['app']),
    new OptimizeCssAssetsPlugin(),
    ...htmpConf(['rem'])
  )
}

module.exports = pluginsConfig
