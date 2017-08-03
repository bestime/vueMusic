<style scoped>
    .loading p.desc{font-size:12px;color:#777;padding:5px 0;}
    .loading img{width:20px;display:inline-block;border:none;}
</style>

<template>
    <div class="loading">
        <img src="./loading.gif">
        <p class="desc">{{ title }}</p>
    </div>
</template>

<script>
    export default {
        props: {
            title: {
                type: String,
                default: '正在载入...'
            }
        }
    }
</script>
