import jsonp from '@/common/js/jsonp';
import {commonParams,options} from './config'

export function getSingerList() {
    const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg';

    const data1 = Object.assign({},commonParams,{
        channel: 'singer',
        page: 'list',
        key: 'all_all_all',
        pagesize: 100,
        pagenum:1,
        g_tk: 1013977292,
        jsonpCallback:'GetSingerListCallback',
        loginUin: 1174295440,
        hostUin:0,
        format: 'jsonp',
        inCharset: 'utf8',
        notice: 0,
        needNewCode:0
    })


    const data = Object.assign({},commonParams,{
        channel: 'singer',
        page: 'list',
        key: 'all_all_all',
        pagesize: 100,
        pagenum:1,
        hostUin:0,
        needNewCode:0
    })
    return jsonp(url,data,options)
}