import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'
import store from './store'

import 'common/stylus/index.styl'

/* eslint-disable no-unused-vars */
// import vConsole from 'vconsole'

fastclick.attach(document.body)

Vue.use(VueLazyload, {
  loading: require('common/image/default.png')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  computed: {
    miniPlayerShow () {
      return this.$store.getters.miniPlayerShow
    }
  },
  methods: {
    setMiniPlayerShow: function (flag) {
      this.$store.dispatch('selectMiniPlayerShow', {flag})
    }
  },
  mounted() {
    router.beforeEach((to, from, next) => {
      // 笨办法，每次切换路由，改变state中的miniPlayerShow来刷新scroll组件
      this.setMiniPlayerShow(!this.miniPlayerShow)
      setTimeout(() => {
        this.setMiniPlayerShow(this.miniPlayerShow)
        next()
      }, 30)
    })
  }
})
