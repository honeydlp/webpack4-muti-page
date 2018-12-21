const path = require('path')
const selfConf = require('./self.config.js')
const entrys = require('./entrysTool.js')

const commonEntry = {
      'rem': path.resolve(__dirname, '..', 'src/utils/rem.js'),
      'mock': path.resolve(__dirname, '..', 'mock/index.js'),
      'index': path.resolve(__dirname, '..', 'config/indexEntry.js')
    }

let entry = selfConf.entry

// webpack js入口
let webpackEntrys = function () {
  if(entry === "") {
    return getAppEntry()
  } else {
    return {
            [entry]: path.resolve(__dirname, '..', 'src/js/' + entry),
            ...commonEntry
          }
  }
}

// 接口代理
const proxy = ['/h5']

let config = {
  qa1: {
    baseUrl: '',
    cookie: selfConf.cookie
  },
  qa2: {
    baseUrl: '',
    cookie: selfConf.cookie
  },
  qa3: {
    baseUrl: '',
    cookie: selfConf.cookie
  },
  dev: {
    baseUrl: selfConf.devBaseUrl,
    cookie: selfConf.cookie
  }
}

function getAppEntry () {
  let entryObj = {}
  entrys.forEach(item => {
    entryObj[item] = path.resolve(__dirname, '..', 'src/js', item)
  })
  return {
    ...entryObj,...commonEntry
  }
}

module.exports = {
  proxy: proxy,
  config: config,
  webpackEntrys: webpackEntrys
}
