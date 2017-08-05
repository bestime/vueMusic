<style scoped>
    .singer-detail{position:fixed;top:0;left:0;width:100%;height:100%;background:#1a1a1a;z-index:99;}
    .slide-enter-active,.slide-leave-active{
        transition: all 0.3s;
    }
    .slide-enter,.slide-leave-to{
        transform:translate3d(100%,0,0)
    }
</style>

<template>
    <transition name="slide">
        <div class="singer-detail">
            
        </div>
    </transition>
</template>

<script>

</script>
