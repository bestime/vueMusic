import Vue from 'vue'
import Router from 'vue-router'
import Reacommend from '@/components/recommend/recommend'
import Search from '@/components/search/search'
import Singer from '@/components/singer/singer'
import Rank from '@/components/rank/rank'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/recommend',
      component: Reacommend
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/singer',
      component: Singer
    },
    {
      path: '/rank',
      component: Rank
    }
  ]
})
