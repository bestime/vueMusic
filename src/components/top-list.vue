<style scoped>
.topList{position:fixed;top:0;left:0;width:100%;height:100%;z-index:20;background:#1a1a1a;}
</style>

<template>
    <transition name="slide">
        <music-list class="topList" :title="title" :bg-image="bgImage" :songs="songs">
            <h1>这是toplist</h1>
        </music-list>
    </transition>
</template>

<script>
    import {mapGetters} from 'vuex'
    import MusicList from '@/components/music-list/music-list'
    import {getMusicList} from '@/api/rank'
    import {ERR_OK} from '@/api/config'


    export default {
        components: {
            'music-list':　MusicList
        },
        data() {
            return {
                songs: []
            }
        },
        computed: {
            title(){
                return this.topList.topTitle
            },
            bgImage() {
                return this.topList.picUrl
            },
        ...mapGetters([
                'topList'
            ])
        },
        methods: {
            _getTopList(){
                getMusicList(this.topList.id).then((res) => {
                    if(res.code === ERR_OK){
                        this.songs = this._normalizeSongs(res.songlist)
                    }
                })
            },
            _normalizeSongs(list){
                let ret = [];
                list.forEach((item) => {
                    const musicData = item.data;
                    if(musicData && musicData.albumid){
                        ret.push(createSong(musicData))
                    }
                })
                return ret;
            }
        },
        created() {
            this._getTopList();
        }
    }

</script>