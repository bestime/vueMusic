import {getLyric} from '@/api/song.js'
import {ERR_OK} from '@/api/config.js'
import {Base64} from 'js-base64'

export default class Song {
    constructor({id,mid,singer,name,album,duration,image,url}){
        this.id = id;
        this.mid = mid
        this.singer = singer
        this.name = name
        this.album = album
        this.duration = duration
        this.image = image
        this.url = url,
        this.lyric = null,
        this._getLyric = function (fn) {
            let result = null;
            getLyric(mid).then((res) => {                
                if(res.retcode === ERR_OK){
                    result = Base64.decode(res.lyric);
                    if(fn) return fn(result)
                }
            })
        };
    }

    
    // _getLyric() {
    //     getLyric(this.mid).then((res) => {
    //         if(res.retcode === ERR_OK){
    //             this.lyric = res.lyric;
    //         }
    //     })
    // }
}

export function createSong(musicData) { 
    return new Song({
        id: musicData.songid,
        mid: musicData.songmid,
        singer: filterSinger(musicData.singer),
        name: musicData.songname,
        album: musicData.albumname,
        duration: musicData.interval,
        image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
        url: `http://ws.stream.qqmusic.qq.com/${musicData.songid}.m4a?fromtag=46`
    })
}

function filterSinger(singer){
    let ret = [];
    if(!singer){
        return null
    }

    singer.forEach((s)=>{
        ret.push(s.name)
    })

    return ret.join('/')
}