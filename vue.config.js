const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  publicPath: process.env.NODE_ENV === 'production'
      ? '/stix/'
      : '/stix/',
  outputDir: 'stix',

  devServer:{
    host:'0.0.0.0',
    port:8080,
    watchFiles: {
      paths: ['src/**/*'],  // 监听 src 目录下所有文件
      options: {
        usePolling: true, // 强制使用轮询模式
        interval: 1000,  // 轮询间隔 1 秒
      },
    },
  }

})
