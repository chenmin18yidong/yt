require('events').EventEmitter.defaultMaxListeners = 0
const resolve = require('path').resolve

module.exports = {
  // router mode eq 'hash' and web project is not in the root router
  // publicPath: process.env.NODE_ENV === 'production' ? './' : '/',

  productionSourceMap: false,

  chainWebpack: (config) => {
    config.resolve.alias.set('@$', resolve(__dirname, 'src'))
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: []
    }
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          'primary-color': '#fe9007',
          'link-color': '#1DA57A'
        },
        javascriptEnabled: true
      }
    }
  },
  // transpileDependencies: ['dom7', 'swiper', 'ant-design-vue'],
  pages: {
    index: {
      // 应用入口配置，相当于单页面应用的main.js，必需项
      entry: 'src/main.js',
      // 应用的模版，相当于单页面应用的public/index.html，可选项，省略时默认与模块名一致
      template: 'public/index.html',
      // 编译后在dist目录的输出文件名，可选项，省略时默认与模块名一致
      filename: 'index.html'
    }
    // 只有entry属性时，直接用字符串表示模块入口
    // exam: 'src/exam/exam.js'
  },
  transpileDependencies: [
    'swiper',
    'ant-design-vue',
    'dom7'
  ],
  devServer: {
    proxy: {
      '/search': {
        target: 'http://192.168.1.172:7001',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/search': ''
        }
      },
      '/search.html': {
        target: 'http://192.168.1.172:7001/search.html',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/search.html': ''
        }
      },
      '/classify.html': {
        target: 'http://192.168.1.172:7001/classify.html',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/classify.html': ''
        }
      },
      '/paper.html': {
        target: 'http://192.168.1.172:7001/paper.html',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/paper.html': ''
        }
      },
      '/answer.html': {
        target: 'http://192.168.1.172:7001/answer.html',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/answer.html': ''
        }
      },
      '/paperList.html': {
        target: 'http://192.168.1.172:7001/paperList.html',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/paperList.html': ''
        }
      },
      // 首页转发
      '/tiku/homePage': {
        target: 'http://192.168.1.172:9006/tiku/homePage',
        // target: 'https://stsqt.tibosi.com/tiku/homePage',
        // target: 'https://shuatishenqi.com/tiku/homePage',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/tiku/homePage': ''
        }
      },
      '/tiku/app': {
        // target: 'http://192.168.1.172:9006/tiku/app',
        target: 'https://stsqt.tibosi.com/tiku/app',
        // target: 'https://shuatishenqi.com/tiku/app',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/tiku/app': ''
        }
      },
      // 题库转发
      '/tiku/home': {
        // target: 'http://192.168.1.172:9006/tiku/home',
        target: 'https://stsqt.tibosi.com/tiku/home',
        // target: 'https://shuatishenqi.com/tiku/home',

        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/tiku/home': ''
        }
      },
      '/tiku/allClass': {
        target: 'http://192.168.1.172:9006/tiku/allClass',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/tiku/allClass': ''
        }
      },
      '/tiku/appInfo': {
        target: 'http://192.168.1.172:9006/tiku/appInfo',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/tiku/appInfo': ''
        }
      },
      '/tiku/price': {
        target: 'http://192.168.1.172:9006/tiku/price',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/tiku/price': ''
        }
      },
      '/tiku/paperInfo': {
        target: 'http://192.168.1.172:9006/tiku/paperInfo',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/tiku/paperInfo': ''
        }
      },
      '/tiku/moreHotPaper': {
        target: 'http://192.168.1.172:9006/tiku/moreHotPaper',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/tiku/moreHotPaper': ''
        }
      },
      '/tiku/ksblogin': {
        target: 'http://192.168.1.172:9006/tiku/ksblogin',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/tiku/ksblogin': ''
        }
      },
      '/companyProfile': {
        target: 'http://192.168.1.172:9006/tiku/companyProfile',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/tiku/companyProfile': ''
        }
      }
    }
  }
}
