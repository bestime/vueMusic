<style scoped>    
    .tab{text-align:center;font-size:0;}
    .tab div{display:inline-block;}
    .tab-item{color:#b9b9b9;font-size:0.24rem;cursor:pointer;line-height:2;width:25%;margin:0.2rem 0;}
    .tab-item.router-link-active{color:#f3e424;border-bottom:#f3e424 solid 1px;}
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

