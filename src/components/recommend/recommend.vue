<style scoped>
    .title01{font-size:16px;font-weight:normal;text-align:center;color:#bb9c47;margin:0.2rem 0;}
    ul.list li{overflow:hidden;padding:0 0.3rem;margin:0.25rem 0;}
    ul.list li img{display:block;width:60px;height:60px;float:left;}
    ul.list li .text{overflow:hidden;padding-left:0.2rem;}
    ul.list li .title{font-size:14px;color:#ddd;}
    ul.list li p.desc{font-size:12px;color:#737373;padding-top:10px;}
    .recommend{height:100%;overflow:hidden;font-size:0;background:#dd4215;}
    .recommend-content{height:100%;background:#000;overflow:hidden;}
    .loading-container{text-align:center;padding-top:30px;}
</style>

<template>
    <div class="recommend" ref="recommend">
        <ms-scroll ref="scroll" class="recommend-content" :data="discList">
            <div clas="slider-wrapper" v-if="recommends.length">
                <ms-slider>
                    <div v-for="item in recommends">
                        <a :href="item.linkUrl">
                            <img @load="loadImage" :src="item.picUrl" />
                        </a>
                    </div>
                </ms-slider>
            </div>
            <div class="recommendList">
                <h2 class="title01">热门歌单推荐</h2>
                <ul class="list">
                    <li v-for="(item,index) in discList" :class="'div'+index">
                        <img v-lazy="item.imgurl">
                        <div class="text">
                            <div class="title" v-html="item.creator.name"></div>
                            <p class="desc" v-html="item.dissname"></p>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="loading-container" v-show="!discList.length">
                <ms-loading></ms-loading>
            </div>
        </ms-scroll>
    </div>
</template>

<script>
    import Slider from '@/base/slider/slider'
    import {getRecommend,getDiscList} from '@/api/recommend'
    import {ERR_OK} from '@/api/config'
    import Scroll from '@/base/scroll/scroll.vue'
    import Loading from '@/base/loading/loading'

    export default {
        data: function () {
            return {
                recommends: [],
                discList: [],
                imageLoaded: false
            }
        },
        created: function () {
            setTimeout(() => {
                this._getRecomend();
            },4000)
            setTimeout(() => {
                this._getDiscList();
            },1000)            
        },
        mounted() {
            this.setRecommendListHeight();
            bestime.winFun(window,'resize',() => {
                this.setRecommendListHeight();
            })
        },
        methods: {
            _getRecomend: function () {
                getRecommend().then((res) => {
                    if(res.code===ERR_OK){
                        this.recommends = res.data.slider;
                        console.log(this.recommends.length)
                    }
                })
            },
            _getDiscList() {
                getDiscList().then((res) => {
                    if(res.code===ERR_OK){
                        this.discList = res.data.list;
                    }
                })
            },
            loadImage() {
                if(!this.imageLoaded){
                    this.$refs.scroll.refresh();                    
                    this.imageLoaded = true;
                }                
            },
            setRecommendListHeight() {
                var el = this.$refs.recommend;
                var docWidth = document.documentElement.clientWidth || document.body.clientWidth;
                var docHeight = document.documentElement.clientHeight || document.body.clientHeight;
                el.style.height = (docHeight - el.offsetTop) + 'px';
            }
        },
        components: {
            'ms-slider': Slider,
            'ms-scroll': Scroll,
            'ms-loading': Loading
        }
    }
</script>