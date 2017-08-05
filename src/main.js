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
  components: { App }
})
