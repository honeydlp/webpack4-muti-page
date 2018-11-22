const proxy = ['/h5', '/system']

const config = {
	qa: {
		baseUrl: 'http://www.baidu.com/',
		cookie: '11'
	},
	dev: {
		baseUrl: '',
		cookie: ''
	}
}

module.exports ={
	proxy: proxy,
	config: config
}
