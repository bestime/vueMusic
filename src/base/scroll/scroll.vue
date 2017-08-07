<style scoped>
    .scrollView{overflow:hidden;}
</style>

<template>
    <div ref="wrapper">
        <div class="scrollView" ref="scrollView">
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
            },
            listenScroll: {
                type: Boolean,
                default: false
            },
            myCss: {
                type: String,
                default: ''
            }
        },
        mounted() {
            setTimeout(()=>{
                this._initScroll();
                this._setCss();
            },20)
        },
        methods: {
            _setCss() {
                this.$refs.scrollView.style.cssText = this.myCss;
            },
            _initScroll() {
                if(!this.$refs.wrapper) return;
                this.scroll = new BScroll(this.$refs.wrapper,{
                    probeType: this.probeType,
                    click: this.click
                })
                console.log('初始化滚动组件');
                if(this.listenScroll){
                    this.scroll.on('scroll',(pos) => {
                        this.$emit('scroll',pos)
                    })
                }
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
            },
            scrollTo() {
                this.scroll && this.scroll.scrollTo.apply(this.scroll,arguments)
            },
            scrollToElement() {
                this.scroll && this.scroll.scrollToElement.apply(this.scroll,arguments)
            }
        },
        watch: {
            data() {
               this.refresh();
            }
        }
    }
</script>
