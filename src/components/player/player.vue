<style scoped>
    
    .player{}    
    .player .disableClass *{background:#666;}/** 歌曲无法播放，灰色按钮 **/
    .normal-player{position:fixed;background:#1a1a1a;overflow:hidden;height:100%;width:100%;top:0;left:0;z-index:110;display:flex;flex-direction:column;}
    .playbox{position:relative;z-index:5;height:70px;overflow:hidden;}
    .circle{border:#333 solid 0.15rem;width:4.4rem;height:4.4rem;border-radius:50%;margin:1.6rem auto 0 auto;overflow:hidden;}
    .playbox h1,.playbox h2{color:#fff;font-weight:normal;font-size:14px;text-align:center;padding:0.2rem 0 0.1rem 0;}
    .playbox h2{padding:0;font-size:12px;}
    .circle img{margin:0;padding:0;border:none;display:block;width:100%;}
    .circle img.playing,.mini-player .info img.playing{animation: rotate 20s linear infinite}
    .circle img.pause,.mini-player .info img.pause{animation-play-state: paused;}
    .icons{display:flex;width:100%;font-size:0;position:absolute;bottom:10px;}
    .icons div{flex:1;font-size:0;display:flex;text-align:center;}
    .icons div span{display:inline-block;font-size:12px;width:40px;height:40px;background:#fff;margin:0 auto;border-radius:50%;}
    .icons div.sequence span{background:#dd4215;}
    .icons div.loop span{background:yellow;}
    .icons div.random span{background:green;}
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

    .btns{height:100px;position:relative;overflow:hidden;}
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

    .progressWrapper{position:relative;z-index:120;width:90%;margin:3px auto 0 auto;display:flex;overflow:hidden;align-items:center;height:16px;}
    .progressWrapper span.time{line-height:16px;color:#fff;font-size:12px;width:30px;text-align:center;}
    .progressWrapper .progressBox{height:4px;flex:1;background:#000;}

    @keyframes rotate{
        0% {transform:rotate(0)}
        100% {transform: rotate(360deg)}
    }
    .middle{flex:1;display:flex;flex-direction:column;position:relative;}
    .middle .page01,.middle .lyric{flex:1;position:absolute;left:0;right:0;width:100%;height:100%;overflow:hidden;}
    .middle .page01 .playingLyric{font-size:14px;color:#c2af93;text-align:center;padding-top:50px;}
    .middle .lyric{left:100%;}
    .lyric{font-size:0;}
    .lyric p{font-size:14px;color:#5a5a5a;text-align:center;line-height:1.8;}
    .lyric p.current{color:#bb9c47;}
    .btns .dots{height:14px;font-size:0;text-align:center;margin-top:5px;}
    .btns .dots span{display:inline-block;width:8px;height:8px;background:#fff;border-radius:10px;margin: 0 2px;}
    .btns .dots span.active{background:#dd4215;padding:0 3px;}
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
                    
                </div>

                <div class="middle" 
                    @touchstart.prevent="middleTouchStart" 
                    @touchmove.prevent="middleTouchMove" 
                    @touchend="middleTouchEnd"
                >
                    <div class="page01" ref="page01">
                        <div class="circle">
                            <img :src="currentSong.image" :class="playingClass">
                        </div>
                        <div class="playingLyric">{{ playingLyric }}</div>
                    </div>
                    <ms-scroll ref="lyric" class="lyric" :data="currentLyric && currentLyric.lines">
                        <div class="lyricWrapper">
                            <div v-if="currentLyric">
                                <p 
                                ref="lyricLine" 
                                class="text" 
                                :class="{'current':currentLineNum === index}" 
                                v-for="(line,index) in currentLyric.lines"
                                >
                                    {{ line.txt }}
                                </p>
                            </div>
                        </div>
                    </ms-scroll>
                </div>
                
                <div class="btns">
                    <div class="dots">
                        <span :class="{'active': currentShow === 'cd'}"></span>
                        <span :class="{'active': currentShow === 'lyric'}"></span>
                    </div>
                    <div class="progressWrapper">
                        <span class="time time-l">{{ format(currentTime) }}</span>
                        <div class="progressBox">
                            <ms-progressBar @percentChange="onProgressBarChange" :percent="percent"></ms-progressBar>
                        </div>
                        <span class="time timer-r">{{ format(currentSong.duration) }}</span>
                    </div>
                    <div class="icons">
                        <div class="mode" :class="iconMode" @click="changeMode"><span></span></div>
                        <div class="prev" :class="disableClass" @click="prev"><span></span></div>
                        <div class="play":class="disableClass" @click="togglePlaying"><span></span></div>
                        <div class="next" :class="disableClass" @click="next"><span></span></div>
                        <div><span></span></div>
                    </div>
                </div>
            </div>
        </transition> 
        <transition name="mini">
            <div ref="miniPlayer" class="mini-player" v-show="!fullScreen" @click="open">
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
    import lyricParser from 'lyric-parser'
    import Scroll from '@/base/scroll/scroll'
    export default {
        components: {
            'ms-progressBar': progressBar,
            'ms-progressCircle': progressCircle,
            'ms-scroll': Scroll
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
                currentTime: 0,
                currentLyric: null,
                currentLineNum: 0,
                currentShow: 'cd',
                playingLyric: ''
            }
        },
        created() {
            this.touch = {}
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
                const currentTime = this.currentSong.duration * percent;
                this.$refs.audio.currentTime = currentTime;
                if(!this.playing){
                    this.togglePlaying();
                }
                if(this.currentLyric){
                    this.currentLyric.seek(currentTime*1000);
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
                if(this.playlist.length ===1){
                    this.loop();
                }else{
                    var index = this.currentIndex - 1;
                    if(index===-1){
                        index = this.playlist.length - 1;
                    }
                    this.setCurrentIndex(index);
                    if(!this.playing){
                        this.togglePlaying();
                    }
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
                if(this.currentLyric){
                    this.currentLyric.seek(0);
                }
            },
            next() {
                if(!this.songReady) return;
                if(this.playlist.length ===1){
                    this.loop();
                }else{
                    var index = this.currentIndex + 1;
                    if(index===this.playlist.length){
                        index = 0;
                    }
                    this.setCurrentIndex(index);
                    if(!this.playing){
                        this.togglePlaying();
                    }
                }                
                this.songReady = false;
            },
            togglePlaying () {
                if(!this.songReady) return;
                this.setPlayingState(!this.playing);
                if(this.currentLyric) this.currentLyric.togglePlay();
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
            toGetLyric() {                
                this.currentSong._getLyric((lyric) =>{
                    this.currentLyric = lyric;
                    this.handleLyric(this.currentLyric);                            
                })
                // .catch(() => {
                //     alert('121231')
                //     this.currentLyric = '暂无歌词';
                //     this.currentLineNum = 0;
                //     this.playingLyric = '';
                // });  
            },
            handleLyric(lyric) {
                this.currentLyric = new lyricParser(lyric, ({lineNum, txt}) => {
                    this.playingLyric = txt;
                    this.currentLineNum = lineNum;
                    if(this.currentLineNum>5){
                        let lineEl = this.$refs.lyricLine[lineNum-5];
                        this.$refs.lyric.scrollToElement(lineEl,1000)
                    }else{
                        this.$refs.lyric.scrollTo(0,0,1000)
                    }
                });
                this.currentLyric.stop();
                if(this.playing){                    
                    this.currentLyric.play();
                }
            },
            middleTouchStart (e){
                this.touch.initiated = true;
                const touch = e.touches[0];
                this.touch.startX = touch.pageX;
                this.touch.startY = touch.pageY;
                this.touch.isMove = false;
                this.touch.canSwitch = true;
            },
            middleTouchMove (e){
                var nowX = e.touches[0].pageX;
                var nowY = e.touches[0].pageY;
                if(Math.abs(nowY-this.touch.startY)>Math.abs(nowX-this.touch.startX)) {
                    this.touch.canSwitch = false;
                };
                this.touch.isMove = true;
                if(!this.touch.initiated) return;
                const touch = e.touches[0];
                const deltaX = touch.pageX - this.touch.startX;
                const deltaY = touch.pageY - this.touch.startY;
                if(Math.abs(deltaY)>Math.abs(deltaX)){
                    return;
                }
                const left = this.currentShow === 'cd' ? 0 : -window.innerWidth;
                const offsetWidth = Math.min(0,Math.max(-window.innerWidth,left+deltaX));
                this.touch.percent = Math.abs(offsetWidth/window.innerWidth);
                this.$refs.lyric.$el.style['transform'] = `translate3d(${offsetWidth}px,0,0)`;
                this.$refs.lyric.$el.style['transition'] = '0s';
                this.$refs.page01.style.cssText = `opacity:${1-this.touch.percent};`;
            },
            middleTouchEnd (e){                
                if(!this.touch.isMove) return;
                if(!this.touch.canSwitch) return;
                var offsetWidth = null;
                var opcityPage01 = 0;
                if(this.currentShow === 'cd'){
                    if(this.touch.percent>0.2){
                        offsetWidth = -window.innerWidth;
                        this.currentShow = 'lyric';
                        opcityPage01 = 0;
                    }else{
                        offsetWidth = 0;
                        opcityPage01 = 1;
                    }
                }else{
                    if(this.touch.percent<0.8){
                        offsetWidth = 0;
                        this.currentShow = 'cd';
                        opcityPage01 = 1;
                    }else{
                        offsetWidth = -window.innerWidth;
                        opcityPage01 = 0;
                    }
                }
                this.$refs.page01.style.cssText = `opacity:${opcityPage01};transition:0.3s;`;
                this.$refs.lyric.$el.style['transition'] = '0.3s';
                this.$refs.lyric.$el.style['transform'] = `translate3d(${offsetWidth}px,0,0)`; 
                this.touch.isMove = false;  
                this.touch.canSwitch = true;           
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
                setTimeout(() => {
                    this.$refs.audio.play();
                    this.toGetLyric();                    
                },1000);
                
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