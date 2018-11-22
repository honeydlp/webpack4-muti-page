## webpack模块化打包工作流
    参照package.json scripts脚本
       dev_dev脚本可在开发环境自定义,其他脚步不要做修改 
       根据编译环境，定义页面需用到的变量在 webpack.plguins.js DefinePlugin
    代理配置在config/proxy.config.js 
    mock数据在mock/index.js 可在打包脚本增加IS_MOCK=true开启
## mock服务 参照跟目录mock.js文档。

    Mock.mock(/system\/adminUser\/list/, function(options) {

    })

    /**
         * 参数解析
         * rurl, [rtype],[function( options )]
         * rurl       请求url
         * rtype      可选参数，指定请求类型。不写get,post都匹配
         * function   记录用于生成响应数据的函数。当拦截到匹配 rurl 和 rtype 的 Ajax 请求时，函数 function(options) 将被执行，并把执行结果作为响应数据返回。
    */


    /**
        * options参数解析
        * url    ajax请求url
        * type   ajax请求方法
        * body   ajax请求方法如果是post,值在body里
        * {
              "url": "/system/adminUser/list/?foo=1&bar=2&faz=3",
              "type": "GET",
              "body": null
          }
          {
              "url": "/system/adminUser/list/",
              "type": "GET",
              "body": null
          }
          {
              "url": "/system/adminUser/list/",
              "type": "POST",
              "body": "foo=1&bar=2&faz=3"
          }
    */  
### 新增eslint配置，遵循标准代码编写配置，与其不一致的配置详见.eslintrc.js
      eslint src //扫描src目录下的.js文件
      eslint --ext .js,.vue src // 扫描src下的.js与.vue后缀文件（默认只扫描.js文件）
      eslint --fix src // 修正src下面的.js文件格式错误（会自动调整文件）
