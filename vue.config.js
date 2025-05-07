const { defineConfig } = require('@vue/cli-service')  
module.exports = defineConfig({  
  transpileDependencies: true,  
  lintOnSave: false,  
  devServer: {  
    host: "localhost",  
    port: "8080",  // 端口写成数字即可  
    https: false,  
    hot: false, 
    client: {
      overlay: { errors: false, warnings: true }
    },
    proxy: {  
      "/csxyb_server_war": {  
        target: "http://127.0.0.1:8888",  
        ws: true,  
        changeOrigin: true,  
        pathRewrite: {  
          "^/csxyb_server_war": ""  
        }  
      }  
    }  
  }  
})  