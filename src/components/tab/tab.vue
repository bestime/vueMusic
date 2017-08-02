<style scoped>    
    .tab{text-align:center;font-size:0;}
    .tab div{display:inline-block;}
    .tab-item{cursor:pointer;width:25%;margin:0.2rem 0;}
    .tab-item span{line-height:2;font-size:0.24rem;color:#727272;padding-bottom:0.1rem;}
    .tab-item.router-link-active span{color:#bb9c47;border-bottom:#bb9c47 solid 1px;}
</style>

<template>
    <div class="tab">
        <router-link to="/recommend" tag="div" class="tab-item">
            <span class="tab-link">推荐</span>
        </router-link>
        <router-link to="/singer" tag="div" class="tab-item">
            <span class="tab-link">歌手</span>
        </router-link>
        <router-link to="/rank" tag="div" class="tab-item">
            <span class="tab-link">排行</span>
        </router-link>
        <router-link to="/search" tag="div" class="tab-item">
            <span class="tab-link">搜索</span>
        </router-link>
    </div>
</template>

