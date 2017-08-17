<style scoped>
    .slider{position:relative;}
    .slider .slider-group{overflow:hidden;}
    .slider .slider-item{float:left;font-size:0;}
    .slider .slider-item a{display:block;}
    .slider .slider-item a img{display:block;width:100%;border:none;margin:0;}
    .slider .dots{text-align:center;font-size:0;position:absolute;bottom:0.1rem;width:100%;}
    .slider .dots .dot{display:inline-block;width:0.1rem;height:0.1rem;border-radius:0.1rem;background:rgba(255,255,255,0.5);margin:0 0.05rem;}
    .slider .dots .dot.active{background:rgba(255,255,255,0.8);padding:0 0.03rem;}
</style>

<template>
    <div class="slider" ref="slider">
        <div class="slider-group" ref="sliderGroup">
            <slot></slot>
        </div>
        <div class="dots">
            <span class="dot" v-for="(item,index) in dots" :class="{active:currentPageIndex===index}"></span>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    export default {
        data: function () {
            return {
                dots: [],
                currentPageIndex: 0
            }
        },
        props: {
            loop: {
                type: Boolean,
                default: true
            },
            autoPlay: {
                type: Boolean,
                default: true
            },
            interval: {
                type: Number,
                default: 2000
            }
        },
        mounted: function () {
            var _this = this;
            setTimeout(() => {
                this._setSliderWidth();
                this._initDots();
                this._initSlider();                
            },20);
            bestime.winFun(window, 'resize', () => {
                if(!_this.slider) return;
                _this._setSliderWidth(true);
                _this.slider.refresh();
            })
        },
        methods: {
            _setSliderWidth(isResize) {
                this.children = this.$refs.sliderGroup.children;

                let width = 0;
                let sliderWidth = this.$refs.slider.offsetWidth;
                for(let i=0;i<this.children.length;i++){
                    let child = this.children[i];
                    bestime.addClass(child, 'slider-item');
                    child.style.width = sliderWidth + 'px';
                    width += sliderWidth;
                }
                if(this.loop && !isResize){
                    width += 2*sliderWidth;
                }
                this.$refs.sliderGroup.style.width = width + 'px';
            },
            _initDots() {
                this.dots = new Array(this.children.length);
            },
            _initSlider() {
                this.slider = new BScroll(this.$refs.slider, {
                    scrollX: true,
                    scrollY: false,
                    momentum: false,
                    snap: true,
                    snapLoop: this.loop,
                    snapThreshold: 0.3,
                    snapSpeed: 400,
                    click: true
                })

                this.slider.on('scrollEnd', () => {
                    let pageIndex = this.slider.getCurrentPage().pageX;
                    if(this.loop){
                        pageIndex -=1;
                    }
                    this.currentPageIndex = pageIndex;
                    if(this.autoPlay){
                        clearTimeout(this.timer);
                        this._play();
                    }
                })

                if(this.autoPlay){
                    this._play();
                }
            },
            _play() {
                let pageIndex = this.currentPageIndex + 1;
                if(this.loop){
                    pageIndex++
                }
                this.timer = setTimeout(() => {
                    this.slider.goToPage(pageIndex, 0, 400)
                },this.interval);
            }
        },
        destroyed() {
            clearTimeout(this.timer);
        }
    }    
</script>