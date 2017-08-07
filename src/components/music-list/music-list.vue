<style scoped>
   .music-list{position:fixed;top:0;left:0;width:100%;height:100%;background:#1a1a1a;z-index:99;display:flex;flex-direction:column;}
   .top{position:relative;height:0;width:100%;padding-top:70%;}
   .top .backBtn{width:20px;height:20px;background:#dd4215;position:absolute;left:10px;top:10px;}
   .top h2{font-size:16px;text-align:center;line-height:40px;font-weight:normal;}
   .top .bgimg{display:block;width:100%;border:none;position:absolute;top:0;left:0;}
   .top .text{z-index:2;position:absolute;top:0;left:0;width:100%;}
   .musics h2{font-size:14px;font-weight:normal;color:#ddd;}
   .musics .desc{color:#666;font-size:12px;}
   .musics li{margin:0.2rem 0;padding:0 0.2rem;}
   .musicContent{height:30%;flex:1;}
   .scrollMasking{background:#1a1a1a;position:absolute;width:100%;bottom:0;padding-bottom:0px;}
   .top .show{overflow:hidden;position:absolute;left:0;top:0;width:100%;height:100%;}
   .smallTop .show{z-index:15;position:fixed;top:0;background:green;width:100%;}
   .playBtn{position:absolute;bottom:30px;width:120px;margin-left:-60px;left:50%;border-radius:20px;border:#bb9c47 solid 1px;z-index:0;}
   .playBtn h2{font-size:14px;color:#bb9c47;line-height:2.5;}
   
</style>

<template>
    <div class="music-list">
        <div class="top" ref="top">
            <div class="show" ref="show">
                <div class="text">
                    <div class="backBtn" @click="back"></div>
                    <h2 class="title" v-html="title"></h2>
                </div>
                <img ref="bgimg" class="bgimg" :src="bgImage">                
            </div>
            <div class="playBtn" ref="playBtn">
                <i></i>
                <h2>随机播放全部</h2>
            </div>
        </div>
        <ms-scroll @scroll="scroll" :myCss="myCss" :probeType="probeType" :listenScroll="listenScroll" class="musicContent" :data="songs">
            <ul class="musics">
                <li v-for="song in songs">
                    <h2>{{ song.name }}</h2>
                    <div class="desc">{{ getDesc(song) }}</div>
                </li>
            </ul>
            <div class="loading-container" v-show="!songs.length">
                <ms-loading></ms-loading>
            </div>
        </ms-scroll>
    </div>
</template>

<script>
    import Scroll from '@/base/scroll/scroll.vue'
    import Loading from '@/base/loading/loading'

    const TOP_MIN_HEIGHT = 40;
    export default{
        components: {
            'ms-scroll': Scroll,
            'ms-loading': Loading
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
        data() {
            return {
                scrollY: 0,
                
            }
        },
        created() {
            this.probeType = 3;
            this.listenScroll = true; 
            this.myCss = 'background:#1a1a1a;'           
        },
        mounted() {
            this.topHeight = this.$refs.top.offsetHeight;
            this.topWidth = this.$refs.top.offsetWidth;
            
        },
        methods: {
            getDesc(song) {
                return  `${song.singer}。${song.album}`
            },
            back() {
                this.$router.back()
            },
            scroll(pos) {
                this.scrollY = pos.y;
                var maxTs = this.topHeight - TOP_MIN_HEIGHT;
                var ts = -this.scrollY;
                if(ts >= maxTs) {
                    ts = maxTs;
                    bestime.addClass(this.$refs.top, 'smallTop')
                }else if(ts<0){
                    var img = this.$refs.bgimg;
                    let w = this.topWidth - ts;
                    img.style.cssText = `left:50%;margin-left:${-w/2}px;width:${w}px`;
                                
                }else{
                    bestime.removeClass(this.$refs.top, 'smallTop');
                    //this.$refs.playBtn.style.display = 'none';
                }
                
                var showH = this.topHeight - ts;
                this.$refs.show.style.cssText = `height:${showH}px`;
            }
        }
    }
</script>
