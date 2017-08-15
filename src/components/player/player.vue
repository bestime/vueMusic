<style scoped>
    
    .player{}    
    .player .disableClass *{background:#666;}/** 歌曲无法播放，灰色按钮 **/
    .normal-player{position:fixed;background:#1a1a1a;overflow:hidden;height:100%;width:100%;top:0;left:0;z-index:110;}
    .playbox{position:relative;z-index:5;}
    .playbox .circle{border:#333 solid 0.15rem;width:4.4rem;height:4.4rem;border-radius:50%;margin:1.6rem auto 0 auto;overflow:hidden;}
    .playbox h1,.playbox h2{color:#fff;font-weight:normal;font-size:14px;text-align:center;padding:0.2rem 0 0.1rem 0;}
    .playbox h2{padding:0;font-size:12px;}
    .playbox .circle img{margin:0;padding:0;border:none;display:block;width:100%;}
    .playbox .circle img.playing,.mini-player .info img.playing{animation: rotate 20s linear infinite}
    .playbox .circle img.pause,.mini-player .info img.pause{animation-play-state: paused;}
    .btns{display:flex;width:100%;font-size:0;position:absolute;bottom:30px;}
    .btns div{flex:1;font-size:0;display:flex;text-align:center;}
    .btns div span{display:inline-block;font-size:12px;width:40px;height:40px;background:#fff;margin:0 auto;border-radius:50%;}
    .btns div.sequence span{background:#dd4215;}
    .btns div.loop span{background:yellow;}
    .btns div.random span{background:green;}
    .player .smIcon{position:absolute;width:20px;height:20px;background:#dd4215;left:0.2rem;top:0.2rem;z-index:6;}
    .player img.bg{position:absolute;left:0;top:0;border:none;display:block;width:100%;height:100%;opacity:0.1;}

    .mini-player{height:60px;background:#2f2f2f;position:fixed;bottom:0;width:100%;left:0;z-index:100;overflow:hidden;}
    .mini-player .info{float:left;overflow:hidden;padding-top:10px;}
    .mini-player .info img{display:block;width:40px;height:40px;border:none;margin:0;float:left;border-radius:50%;margin-left:0.2rem;margin-right:10px;}
    
    .mini-player .info .content{font-size:0;overflow:hidden;display:flex;flex-direction:column;height:40px;}
    .mini-player .info .content h3,.mini-player .info .content h4{font-size:14px;color:#cecece;font-weight:normal;flex:1;line-height:20px;}
    .mini-player .info .content h4{font-size:12px;color:#888;}
    .mini-player .cz{float:right;overflow:hidden;display:flex;}
    .mini-player .playBtn{width:32px;height:32px;background:#fff;}
    .mini-player .cz .bt01{width:32px;height:32px;position:absolute;left:0;top:0;}
    .mini-player .cz .list{width:32px;height:32px;background:#fff;margin-left:5px;}

    .normal-enter-active,.normal-leave-active{transition: all 0.4s;}
    .normal-enter-active .b_titile,
    .normal-leave-active .b_titile,
    .normal-enter-active .btns,
    .normal-leave-active .btns{transition:all 0.4s cubic-bezier(0.86,0.18,0.82,1.32)}
    .normal-enter,.normal-leave-to{opacity:0;}
    .normal-enter .b_titile,
    .normal-leave .b_titile{transform:translate3d(0,-100px,0)}
    .normal-enter .btns,
    .normal-leave .btns{transform:translate3d(0,100px,0)}

    .mini-enter-active,.mini-leave-active{transition:all 0.4s;}
    .mini-enter,mini-leave-to{opacity:0;}

    .progressWrapper{position:relative;z-index:120;width:90%;margin:0 auto;display:flex;overflow:hidden;top:80px;align-items:center;height:16px;}
    .progressWrapper span.time{line-height:16px;color:#fff;font-size:12px;width:30px;text-align:center;}
    .progressWrapper .progressBox{height:4px;flex:1;background:#000;}

    @keyframes rotate{
        0% {transform:rotate(0)}
        100% {transform: rotate(360deg)}
    }
</style>

<template>
    <div class="player" v-show="playlist.length>0"> 
        <transition name="normal" 
            @enter = "enter" 
            @after-enter="afterEnter" 
            @leave="leave" 
            @after-leave="afterLeave" 
        >         
            <div class="normal-player" v-show="fullScreen">
                <img class="bg" :src="currentSong.image">
                <div class="smIcon" @click="back"></div>
                <div class="playbox">
                    <div class="b_titile">
                        <h1>{{ currentSong.name }}</h1>
                        <h2>{{ currentSong.singer }}</h2>
                    </div>
                    <div class="circle">
                        <img :src="currentSong.image" :class="playingClass">
                    </div>
                </div>
                <div class="progressWrapper">
                    <span class="time time-l">{{ format(currentTime) }}</span>
                    <div class="progressBox">
                        <ms-progressBar @percentChange="onProgressBarChange" :percent="percent"></ms-progressBar>
                    </div>
                    <span class="time timer-r">{{ format(currentSong.duration) }}</span>
                </div>
                <div class="btns">
                    <div class="mode" :class="iconMode" @click="changeMode"><span></span></div>
                    <div class="prev" :class="disableClass" @click="prev"><span></span></div>
                    <div class="play":class="disableClass" @click="togglePlaying"><span></span></div>
                    <div class="next" :class="disableClass" @click="next"><span></span></div>
                    <div><span></span></div>
                </div>
            </div>
        </transition> 
        <transition name="mini">
            <div class="mini-player" v-show="!fullScreen" @click="open">
                <div class="info">
                    <img :src="currentSong.image" :class="playingClass" />
                    <div class="content">
                        <h3>{{ currentSong.name }}</h3>
                        <h4>{{ currentSong.singer }}</h4>
                    </div>
                </div>
                <div class="cz">
                    <ms-progressCircle class="playBtn" :radius="32" :percent="percent">
                        <div class="bt01" :class="disableClass" @click.stop="togglePlaying"></div>
                    </ms-progressCircle>
                    <div class="list"></div>
                </div>
            </div>
        </transition>
        <audio ref="audio" @timeupdate="updateTime" :src="currentSong.url" @canplay="ready" @error="error" @ended="end"></audio>
    </div>
</template>

<script>
    import {mapGetters,mapMutations} from 'vuex'
    import animations from 'create-keyframe-animation'
    import progressBar from '@/base/progress-bar.vue'
    import progressCircle from '@/base/progress-circle.vue'
    import {playMode} from '@/common/js/config.js'
    export default {
        components: {
            'ms-progressBar': progressBar,
            'ms-progressCircle': progressCircle
        },
        computed: {
            iconMode() {
                var cls = '';
                if(this.mode === playMode.sequence){
                    cls = 'sequence';
                }else if(this.mode === playMode.loop){
                    cls = 'loop';
                }else{
                    cls = 'random';
                }
                return cls;
            },
            percent() {
                return this.currentTime/this.currentSong.duration
            },
            playingClass() {
                return this.playing ? 'playing' : 'playing pause';
            },
            disableClass() {
                return this.songReady ? '' : 'disableClass'
            },
            ...mapGetters([
                'fullScreen',
                'playlist',
                'currentSong',
                'playing',
                'currentIndex',
                'mode',
                'sequenceList'
            ])
        },
        data() {
            return {
                songReady: false,
                currentTime: 0
            }
        },
        methods: {
            back() {
                this.setFullScreen(false);
            },
            open () {
                this.setFullScreen(true);
            },            
            enter(el, done){
                
            },
            afterEnter() {

            },
            leave () {

            },
            afterLeave () {

            },            
            changeMode() {
                const mode = (this.mode+1)%3;
                this.setPlayMode(mode);
                let list = null;
                if(mode==playMode.random){
                    list = bestime.shuffle(this.sequenceList)
                }else{
                    list = this.sequenceList;
                }
                this._resetCurrentIndex(list)
                this.setPlayList(list);
            },
            _resetCurrentIndex(list) {
                let index = list.findIndex((item) => {
                    return item.id === this.currentSong.id
                })
                this.setCurrentIndex(index);
            },
            onProgressBarChange(percent) {
                this.$refs.audio.currentTime = this.currentSong.duration * percent;
                if(!this.playing){
                    this.togglePlaying();
                }
            },
            format(interval) {
                interval = interval | 0;
                const minute = interval / 60 | 0;
                const second = this._pad(interval % 60);
                return `${minute}:${second}`;
            },
            _pad(num,n=2){
                let len = num.toString().length;
                while(len<n){
                    num = '0' + num;
                    len++
                }
                return num;
            },
            updateTime(e) {
                this.currentTime = e.target.currentTime
            },
            ready() {
                this.songReady = true;
            },
            error() {
                this.songReady = true;
            },
            prev() {
                if(!this.songReady) return;
                var index = this.currentIndex - 1;
                if(index===-1){
                    index = this.playlist.length - 1;
                }
                this.setCurrentIndex(index);
                if(!this.playing){
                    this.togglePlaying();
                }
                this.songReady = false;
            },
            end() {
                if(this.mode==playMode.loop){
                    this.loop();
                }else {
                    this.next();
                }                
            },
            loop() {
                this.$refs.audio.currentTime = 0;
                this.$refs.audio.play();
            },
            next() {
                if(!this.songReady) return;
                var index = this.currentIndex + 1;
                if(index===this.playlist.length){
                    index = 0;
                }
                this.setCurrentIndex(index);
                if(!this.playing){
                    this.togglePlaying();
                }
                this.songReady = false;
            },
            togglePlaying () {
                if(!this.songReady) return;
                this.setPlayingState(!this.playing);
            },
            _getPosAndScale() {
                const targetWidth = 40;
                const paddingLeft = 40;
                const paddingBottom = 30;
                const paddingTop = 80;
                const width = window.innerWidth * 0.8;
                const scale = targetWidth/width;
                const x = -(window.innerWidth/2-paddingLeft);

            },
            ...mapMutations({
                setFullScreen: 'SET_FULL_SCREEN',
                setPlayingState: 'SET_PLAYING_STATE',
                setCurrentIndex: 'SET_CURRENT_INDEX',
                setPlayMode: 'SET_PLAY_MODE',
                setPlayList: 'SET_PLAYLIST'
            })
        },
        watch: {
            currentSong(newSong,oldSong) {
                if(newSong.id===oldSong.id) return;
                this.$nextTick(() => {
                    this.$refs.audio.play();
                    this.currentSong._getLyric(this.currentSong.id);
                });
                
            },
            playing (newPlaying) {
                const audio = this.$refs.audio;
                this.$nextTick(() => {
                    newPlaying?audio.play() : audio.pause();
                })
            }
        }
    }
</script>