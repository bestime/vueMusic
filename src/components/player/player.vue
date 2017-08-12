<style scoped>
    
    .player{}
    .normal-player{position:fixed;background:#1a1a1a;overflow:hidden;height:100%;width:100%;top:0;left:0;z-index:110;}
    .playbox{position:relative;z-index:5;}
    .playbox .circle{border:#333 solid 0.15rem;width:4.4rem;height:4.4rem;border-radius:50%;margin:1.6rem auto 0 auto;overflow:hidden;}
    .playbox h1,.playbox h2{color:#fff;font-weight:normal;font-size:14px;text-align:center;padding:0.2rem 0 0.1rem 0;}
    .playbox h2{padding:0;font-size:12px;}
    .playbox .circle img{margin:0;padding:0;border:none;display:block;width:100%;}
    .btns{display:flex;width:100%;font-size:0;position:absolute;bottom:30px;}
    .btns div{flex:1;font-size:0;display:flex;text-align:center;}
    .btns div span{display:inline-block;font-size:12px;width:40px;height:40px;background:#fff;margin:0 auto;border-radius:50%;}
    .player .smIcon{position:absolute;width:20px;height:20px;background:#dd4215;left:0.2rem;top:0.2rem;z-index:6;}
    .player img.bg{position:absolute;left:0;top:0;border:none;display:block;width:100%;height:100%;opacity:0.1;}

    .mini-player{height:70px;background:#2f2f2f;position:fixed;bottom:0;width:100%;left:0;z-index:100;overflow:hidden;}
    .mini-player .info{float:left;overflow:hidden;padding-top:10px;}
    .mini-player .info img{display:block;width:50px;height:50px;border:none;margin:0;float:left;border-radius:50%;margin-left:0.2rem;margin-right:10px;}
    .mini-player .info .content{font-size:0;overflow:hidden;display:flex;flex-direction:column;height:50px;}
    .mini-player .info .content h3,.mini-player .info .content h4{font-size:14px;color:#cecece;font-weight:normal;flex:1;line-height:25px;}
    .mini-player .info .content h4{font-size:12px;color:#888;}

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
        </transition> 
        <transition name="mini">
            <div class="mini-player" v-show="!fullScreen" @click="open">
                <div class="info">
                    <img :src="currentSong.image" />
                    <div class="content">
                        <h3>{{ currentSong.name }}</h3>
                        <h4>{{ currentSong.singer }}</h4>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import {mapGetters,mapMutations} from 'vuex'
    import animations from 'create-keyframe-animation'
    export default {
        computed: {
            ...mapGetters([
                'fullScreen',
                'playlist',
                'currentSong'
            ])
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
            ...mapMutations({
                setFullScreen: 'SET_FULL_SCREEN'
            })
        }
    }
</script>