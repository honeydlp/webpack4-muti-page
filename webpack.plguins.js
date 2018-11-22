const webpack = require("webpack");
const path = require('path');
const glob = require("glob");
// 消除冗余的css
const purifyCssWebpack = require("purifycss-webpack");
// html模板
const htmlWebpackPlugin = require("html-webpack-plugin");
// 清除目录等
const cleanWebpackPlugin = require("clean-webpack-plugin");
// 分离css
const extractTextPlugin = require("extract-text-webpack-plugin");
// 压缩css
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// 静态资源输出
const copyWebpackPlugin = require("copy-webpack-plugin");
// 处理src下面.html文件名字
const paths = require('./config/paths.js')
// 自动生成html模板
let htmpConf = function (extendChunks = []) {
	let htmlArr = []
	paths.getEntry().forEach(pathname => {
		htmlArr.push(
			new htmlWebpackPlugin({
			chunks: extendChunks.concat([pathname]),
			filename: pathname + ".html",
			template: `./src/${pathname}.html`
		}))
	 })
	return htmlArr
}

const devMode = process.env.NODE_ENV !== 'production'

let pluginsConfig = [
		new copyWebpackPlugin([{
			from: 'src/assets',
			to: './assets'
		}]),
		new copyWebpackPlugin([{
			from: 'src/lib-js',
			to: './lib-js'
		}]),
		// 分离css插件参数为提取出去的路径
		new extractTextPlugin('css/[name].[chunkhash:8].css'),
		// 消除冗余的css代码
		new purifyCssWebpack({
			// glob为扫描模块，使用其同步方法（请谨慎使用异步方法）
			paths: glob.sync(path.join(__dirname, "src/*.html"))
		}),
		// 全局暴露统一入口
		new webpack.ProvidePlugin({
			// $: "jquery",
			// zepto: "zepto"
		})
]
if (devMode) {
	pluginsConfig.push(
		new webpack.DefinePlugin({
			IS_DEV: JSON.stringify(true),
			IS_MOCK: JSON.stringify(Boolean(process.env.IS_MOCK)),
		}),
		new webpack.HotModuleReplacementPlugin(),
		...htmpConf(['mock'])
	)
}else {
	pluginsConfig.push(
		new cleanWebpackPlugin(['app']),
		new OptimizeCssAssetsPlugin(),
		...htmpConf()
	)
}

module.exports = pluginsConfig
