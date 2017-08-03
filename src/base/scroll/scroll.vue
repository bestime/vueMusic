<style scoped>
    .scrollView{overflow:hidden;}
</style>

<template>
    <div ref="wrapper">
        <div class="scrollView">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    export default {
        props: {
            probeType: {
                type: Number,
                default: 1
            },
            click: {
                type: Boolean,
                default: true
            },
            data: {
                type: Array,
                default: null
            }
        },
        mounted() {
            setTimeout(()=>{
                this._initScroll();
            },20)
        },
        methods: {
            _initScroll() {
                if(!this.$refs.wrapper) return;
                this.scroll = new BScroll(this.$refs.wrapper,{
                    probeType: this.probeType,
                    click: this.click
                })
            },
            enable() {
                this.scroll && this.scroll.enable();
            },
            disable() {
                this.scroll && this.scroll.disable();
            },
            refresh() {
                setTimeout(() => {
                    if(this.scroll){
                        this.scroll.refresh();
                    }
                },30);
            }
        },
        watch: {
            data() {
               this.refresh();
            }
        }
    }
</script>
