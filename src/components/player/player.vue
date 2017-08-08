<style scoped>
    
    .player{position:fixed;top:0;width:6.4rem;left:50%;margin-left:-3.2rem;height:100%;background:#000;z-index:99;}
    .normal-player{display:flex;flex-direction:column;overflow:hidden;height:100%;position:relative;z-index:2;}
    .playbox .circle{border:#333 solid 0.15rem;width:4.4rem;height:4.4rem;border-radius:50%;margin:1.6rem auto 0 auto;overflow:hidden;}
    .playbox h1,.playbox h2{color:#fff;font-weight:normal;font-size:14px;text-align:center;padding:0.2rem 0 0.1rem 0;}
    .playbox h2{padding:0;font-size:12px;}
    .playbox .circle img{margin:0;padding:0;border:none;display:block;width:100%;}
    .btns{display:flex;width:100%;font-size:0;background:#dd4215;position:absolute;bottom:0;}
    .btns div{flex:1;font-size:0;display:flex;text-align:center;}
    .btns div span{display:inline-block;font-size:12px;width:40px;height:40px;background:#fff;margin:10%;border-radius:50%;}
    .player .smIcon{position:absolute;width:20px;height:20px;background:#dd4215;left:0.2rem;top:0.2rem;}
    .player img.bg{position:absolute;left:0;top:0;boder:none;display:block;width:100%;height:100%;z-index:1;opacity:0.2;}
</style>

<template>
    <div class="player" v-show="playlist.length>0">
        <div class="smIcon"></div>
        <img class="bg" :src="currentSong.image">
        <div class="normal-player" v-show="fullScreen">
            <div class="playbox">
                <h1>{{ currentSong.name }}</h1>
                <h2>{{ currentSong.singer }}</h2>
                <div class="circle">
                    <img :src="currentSong.image">
                </div>
            </div>
            <div class="btns">
                <div><span></span></div>
                <div><span></span></div>
                <div><span></span></div>
                <div><span></span></div>
                <div><span></span></div>
            </div>
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
                'playlist',
                'currentSong'
            ])
        }
    }
</script>