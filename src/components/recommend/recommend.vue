<style scoped>

</style>

<template>
    <div ckass="recommend">
        <div class="recommend-content">
            <div clas="slider-wrapper" v-if="recommends.length">
                <ms-slider>
                    <div v-for="item in recommends">
                        <a :href="item.linkUrl">
                            <img :src="item.picUrl" />
                        </a>
                    </div>
                </ms-slider>
            </div>
        </div>
    </div>
</template>

<script>
    import Slider from '@/base/slider/slider'
    import {getRecommend} from '@/api/recommend'
    import {ERR_OK} from '@/api/config'

    export default {
        data: function () {
            return {
                recommends: []
            }
        },
        created: function () {
            this._getRecomend();
        },
        methods: {
            _getRecomend: function () {
                getRecommend().then((res) => {
                    if(res.code===ERR_OK){
                        this.recommends = res.data.slider;
                    }
                })
            }
        },
        components: {
            'ms-slider': Slider
        }
    }
</script>