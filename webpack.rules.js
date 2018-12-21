const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const devMode = process.env.NODE_ENV !== 'production'
module.exports = [
  {
    test: /\.css$/,
    use: [
      devMode ? 'style-loader' : {
        loader: MiniCssExtractPlugin.loader,
        options: {
          publicPath: '../'
        }
      },
      'css-loader',
      'postcss-loader'
    ]
  },
  {
    test: /\.(js)$/,
    use: devMode ? [
      'babel-loader',
      {
        loader: 'eslint-loader',
        options: {
          formatter: require('eslint-friendly-formatter') // 默认的错误提示方式
        }
      }
    ] : ['babel-loader'],
    exclude: '/node_modules/'
  },
  {
    test: /\.(ts)$/,
    use: devMode ? [
      'ts-loader',
      {
        loader: 'eslint-loader',
        options: {
          formatter: require('eslint-friendly-formatter') // 默认的错误提示方式
        }
      }
    ] : ['ts-loader'],
    exclude: '/node_modules/'
  },
  {
    test: /\.(woff|woff2|eot|ttf|otf)$/,
    use: [{
      loader: 'file-loader',
      options: {
        outputPath: 'image/',
        name: '[name].[hash:8].[ext]'
      }
    }]
  },
  {
    test: /\.(png|jpg|gif|jpeg)$/,
    use: [{
      loader: 'url-loader',
      options: {
        limit: 50,
        // 图片文件输出的文件夹
        outputPath: 'image/',
        name: '[name].[hash:8].[ext]'
      }
    }
    ]
  },
  {
    test: /\.html$/,
    use: ['html-withimg-loader']
  },
  {
    test: /\.less$/,
    use: [
      devMode ? 'style-loader' : {
        loader: MiniCssExtractPlugin.loader,
        options: {
          publicPath: '../'
        }
      },
      'css-loader',
      'postcss-loader',
      'less-loader'
    ]
  },
  {
    test: /\.(scss|sass)$/,
    use: [
      devMode ? 'style-loader' : {
        loader: MiniCssExtractPlugin.loader,
        options: {
          publicPath: '../'
        }
      },
      'css-loader',
      'postcss-loader',
      'sass-loader'
    ]
  }
]
