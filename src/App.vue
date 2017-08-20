<template>
  <div id="app" :class="{'miniPlayerShow':isMiniPlayerShow}">
    <m-header></m-header>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script type="text/ecmascript-6">
  import MHeader from 'components/m-header/m-header'
  import Player from 'components/player/player'
  import Tab from 'components/tab/tab'
  import {mapMutations} from 'vuex'

  export default {
    components: {
      MHeader,
      Tab,
      Player
    },
    computed: {
      isMiniPlayerShow() {
        var playlist = this.$store.state.playlist
        if (playlist.length) {
          return true
        } else {
          return false
        }
      }
    },
    methods: {
      ...mapMutations({
        setMiniPlayerShow: 'SET_MINIPLAYER_SHOW'
      })
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>