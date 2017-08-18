<style scoped>

</style>

<template>
    <transition name="slide">
        <ms-musicList :title="title" :bgImage="bgImage" :songs="songs"></ms-musicList>
    </transition>
</template>

<script type="text/javascript">
    import MusicList from '@/components/music-list/music-list'
    import {getSongList} from '@/api/recommend'
    import {mapGetters} from 'vuex'
    import {ERR_OK} from '@/api/config'
    import {createSong} from '@/common/js/song'

    export default {
        components: {
            'ms-musicList': MusicList
        },
        data(){
            return {
                songs: []
            }
        },
        computed: {
            title() {
                return this.disc.dissname
            },
            bgImage() {
                return this.disc.imgurl
            },
            ...mapGetters([
                'disc'
            ])
        },
        methods: {
            _getSongList(){   
                if(!this.disc.dissid){
                    this.$router.push('/recommend');
                    return;
                }
                getSongList(this.disc.dissid).then((res) => {
                    if(res.code === ERR_OK){
                        this.songs = this._normalizeSings(res.cdlist[0].songlist)
                    }
                })
            },
            _normalizeSings(list){
                let ret = [];
                list.forEach((musicData) => {
                    if(musicData.songid && musicData.albumid){
                        ret.push(createSong(musicData))
                    }
                })
                return ret;
            }
        },
        created() {
            this._getSongList();
        }
    }
</script>