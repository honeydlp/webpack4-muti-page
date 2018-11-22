const extractTextPlugin = require("extract-text-webpack-plugin");
module.exports = [
			{
				test: /\.css$/,
				use: extractTextPlugin.extract({
					fallback: "style-loader",
					use: ["css-loader", "postcss-loader"],
					publicPath: "../"
				})
			},
			{
				test: /\.js$/,
				use: {
						loader: 'eslint-loader',
						options: {
								formatter: require('eslint-friendly-formatter') // 默认的错误提示方式
						}
				},
				enforce: 'pre', // 编译前检查
				exclude: /node_modules/, // 不检测的文件
				include: [__dirname + '/src'], // 要检查的目录
			},
			{
				test: /\.js$/,
				use: ["babel-loader"],
				exclude: "/node_modules/"
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: [{
						loader:'file-loader',
						options: {
							outputPath: "image/",
							name: '[name].[hash:8].[ext]'
						}
				}]
			},
			{
				test: /\.(png|jpg|gif|jpeg)$/,
				use: [{
						loader: "url-loader",
						options: {
							limit: 50,
							// 图片文件输出的文件夹
							outputPath: "image/",
							name: '[name].[hash:8].[ext]'
						}
					}
				]
			},
			{
				test: /\.html$/,
				use: ["html-withimg-loader"]
			},
			{
				test: /\.less$/,
				use: extractTextPlugin.extract({
					fallback:"style-loader",
					use: ["css-loader", "less-loader"]
				})
			},
			{
				test: /\.(scss|sass)$/,
				use: extractTextPlugin.extract({
					fallback:"style-loader",
					use: ["css-loader", "sass-loader"]
				})
			}
		]
