<style scoped>
.rank{padding:0 0.2rem;height:100%;}
.rank ul{font-size:12px;}
.rank ul li{background:#333;overflow:hidden;display:flex;margin:0.2rem 0;padding-right:0.2rem;}
.rank ul a.img{margin-right:0.2rem;display:block;float:left;width:1.5rem;height:1.5rem;font-size:0;overflow:hidden;}
.rank ul a.img img{display:block;width:100%;height:100%;border:none;}
.rank .content{overflow:hidden;display:flex;flex-direction:column;justify-content: center;flex:1;}
.rank ul li .content p{line-height:2;color:#949494;display:block;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}
.rank ul li .content p span{color:#868686;}
</style>

<template>
    <ms-scroll class="rank" :data="topList">
        <ul>
            <li v-for="item in topList" @click="selectItem(item)">
                <a class="img"><img v-lazy="item.picUrl"></a>
                <div class="content">
                    <p v-for="(song,index) in item.songList">
                        <span>{{ index + 1 }}</span>
                        {{ song.songname }} - {{ song.singername }}
                    </p>
                </div>
            </li>
        </ul>
        <ms-loading v-if="!topList.length"></ms-loading>
        <router-view></router-view>
    </ms-scroll>
</template>

<script>
    import {getTopList} from '@/api/rank.js'
    import {ERR_OK} from '@/api/config'
    import Scroll from '@/base/scroll/scroll.vue'
    import Loading from '@/base/loading/loading'
    import {mapMutations} from 'vuex'

    export default {
        components: {
            'ms-scroll': Scroll,
            'ms-loading': Loading
        },
        data(){
            return {
                topList: []
            }
        },
        created() {
            setTimeout(() => {
                this._getTopList();
            },500)
        },
        methods: {
            selectItem(item){
                this.$router.push({
                    path: `/rank/${item.id}`
                })
                //console.log(item)
                this.setTopList(item)
            },
            _getTopList() {
                getTopList().then((res) => {
                    if(res.code === ERR_OK){
                        this.topList = res.data.topList;
                    }
                })
            },
            ...mapMutations({
                'setTopList': 'SET_TOP_LIST'
            })
        }
    }
</script>