// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyLoad from 'vue-lazyload'
import '@/common/css/pub.css'
import '@/common/js/rem.js'
import '@/common/js/bestime.js'

import store from './store'

Vue.config.productionTip = false
Vue.use(VueLazyLoad, {
  loading: require('@/common/images/lazyload.jpg')
})






/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  computed: {
    miniPlayerShow: function () {
      return this.$store.getters.miniPlayerShow;
    }
  },
  methods: {
    setMiniPlayerShow: function (flag) {
      this.$store.dispatch('selectMiniPlayerShow',{flag})
  }
  },
  mounted(){
    router.beforeEach((to, from, next) => {
      //笨办法，每次切换路由，改变state中的miniPlayerShow来刷新scroll组件
      this.setMiniPlayerShow(!this.miniPlayerShow)
      setTimeout(()=>{
        this.setMiniPlayerShow(this.miniPlayerShow)
        next();
      },30)
    });    
  }
})
