<style scoped>
    .player{position:fixed;top:0;left:0;width:100%;height:100%;background:#fff;z-index:99;}
</style>

<template>
    <div class="player" v-show="playlist.length>0">
        <div class="normal-player" v-show="fullScreen">
            播放器
        </div>
        <div class="mini-player" v-show="!fullScreen"></div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        computed: {
            ...mapGetters([
                'fullScreen',
                'playlist'
            ])
        }
    }
</script>