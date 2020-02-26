
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '~/assets/css/reset.css',
    '~/assets/css/animate.css',
    '~/assets/css/transition.css',
    '~/assets/css/iconfont.css',
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/element-ui'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
  ],
  /*
  ** Build configuration
  */
  build: {
    transpile: [/^element-ui/],
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    },
    modules: [
      '@nuxtjs/style-resources'
    ],
    styleResources: {
      scss: './assets/css/common.scss'
    }
  },
  //全局变量
  //全局变量
  env: process.env.NODE_ENV === 'development' ? {
    BASE_URL: 'https://www.studyinghome.com/mock/5e5618d82cb0d073b813a629/boss'
  } : {
    BASE_URL: 'https://www.studyinghome.com/mock/5e5618d82cb0d073b813a629/boss'
  },
  //路由
  router: {
    base: ''
  }
}
