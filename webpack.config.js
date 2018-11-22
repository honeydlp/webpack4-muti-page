const path = require('path');
const pluginsConfig = require("./webpack.plguins.js");
const rulesConfig = require("./webpack.rules.js");
const paths = require('./config/paths.js')
const proxyConfig = require('./config/proxy.config')

let getAppEntry = function () {
	let entryObj = {}
	paths.getEntry().forEach(item => {
		entryObj[item] = path.resolve(__dirname, 'src/js', item + '.js')
	})
	return entryObj
}

let PROXY_ENV = process.env.PROXY_ENV

const devMode = process.env.NODE_ENV !== 'production'

let config = {
	entry: {
		// 多入口文件
		...getAppEntry(),
		// 由于每个都是互补相关的页面，没有公用性 lib建议单独引入
	},
	output: {
		path: path.resolve(__dirname, 'app'),
		// 打包多出口文件
		filename: devMode ? './js/[name].[hash:8].js' : './js/[name].[chunkhash:8].js',
		chunkFilename: devMode ? './chunk/[name].[hash:8].js' : './chunk/[name].[chunkhash:8].js'
	},
	plugins: pluginsConfig,
	module:{
		rules: rulesConfig
	},
	// 提取js
	optimization: {
		splitChunks: {
			// cacheGroups: {
			// 	lib: {
			// 		chunks: "initial",
			// 		// name: "test",  // 此处的name为其他用于使用chunk名字的地方做服务
			// 		enforce: true
			// 	}
			// }
		}
	}
}

if (devMode) {
	config.devServer = {
		contentBase: path.resolve(__dirname, "app"),
		host: "localhost",
		port: "8090",
		open: true,  // 开启浏览器
		hot: true,   // 开启热更新
		proxy: [{
		  context: proxyConfig.proxy,
		  target: proxyConfig.config[PROXY_ENV]['baseUrl'],
		  onProxyReq: function (proxyReq, req, res) {
		    proxyReq.setHeader('cookie', proxyConfig.config[PROXY_ENV]['cookie'])
		  }
		}]
	},
	config.entry.mock = path.resolve(__dirname, 'mock/index.js')
}
module.exports = config
