module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',  //解决打包直接打开页面空白
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    //以上的ip和端口是我们本机的;下面为需要跨域的
    proxy: {//配置跨域
        '/api': {
            target: 'http://175.178.23.242:7777/api',//这里后台的地址模拟的;应该填写你们真实的后台接口
            ws: true,
            changOrigin: true,//允许跨域
            pathRewrite: {
                '^/api': ''//请求的时候使用这个api就可以
            }
        },
        '/lg': {
            target: 'http://localhost:8080',//这里后台的地址模拟的;应该填写你们真实的后台接口
            ws: true,
            changOrigin: true,//允许跨域
            pathRewrite: {
                '^/lg': ''//请求的时候使用这个api就可以
            }
        }
    },
    hot: true,
},
}