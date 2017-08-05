<style scoped>
   .music-list{position:fixed;top:0;left:0;width:100%;height:100%;background:#1a1a1a;z-index:99;}
   .top{overflow:hidden;position:relative;height:0;width:100%;padding-top:70%;}
   .top .backBtn{width:20px;height:20px;background:#dd4215;position:absolute;left:10px;top:10px;}
   .top h2{font-size:16px;text-align:center;line-height:40px;font-weight:normal;}
   .top .bgimg{z-index:1;display:block;width:100%;border:none;position:absolute;top:0;left:0;}
   .top .text{z-index:2;position:absolute;top:0;left:0;width:100%;}
   .musics h2{font-size:14px;font-weight:normal;color:#ddd;}
   .musics .desc{color:#666;font-size:12px;}
   .musics li{margin:0.2rem 0;padding:0 0.2rem;}
   .musicContent{height:30%;background:#dd4215;}
</style>

<template>
    <div class="music-list">
        <div class="top">
            <div class="text">
                <div class="backBtn"></div>
                <h2 class="title" v-html="title"></h2>
            </div>
            <img class="bgimg" :src="bgImage">
        </div>
        <ms-scroll class="musicContent">
            <ul class="musics">
                <li v-for="song in songs">
                    <h2>{{ song.name }}</h2>
                    <div class="desc">{{ getDesc(song) }}</div>
                </li>
            </ul>
        </ms-scroll>
    </div>
</template>

<script>
    import Scroll from '@/base/scroll/scroll.vue'
    export default{
        components: {
            'ms-scroll': Scroll
        },
        props: {
            bgImage: {
                type: String,
                default: ''
            },
            songs: {
                type: Array,
                default: []
            },
            title: {
                type: String,
                default: ''
            }
        },
        methods: {
            getDesc(song) {
                return  `${song.singer}。${song.album}`
            }
        }
    }
</script>
