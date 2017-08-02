<style scoped>
    .slider .slider-group{overflow:hidden;}
    .slider .slider-item{float:left;font-size:0;}
    .slider .slider-item a{display:block;}
    .slider .slider-item a img{display:block;width:100%;border:none;margin:0;}
</style>

<template>
    <div class="slider" ref="slider">
        <div class="slider-group" ref="sliderGroup">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    export default {
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
                default: 4000
            }
        },
        mounted: function () {
            setTimeout(() => {
                this._setSliderWidth();
                this._initSlider();
            },20);
        },
        methods: {
            _setSliderWidth() {
                this.children = this.$refs.sliderGroup.children;

                let width = 0;
                let sliderWidth = this.$refs.slider.offsetWidth;
                for(let i=0;i<this.children.length;i++){
                    let child = this.children[i];
                    bestime.addClass(child, 'slider-item');
                    child.style.width = sliderWidth + 'px';
                    width += sliderWidth;
                }
                if(this.loop){
                    width += 2*sliderWidth;
                }
                this.$refs.sliderGroup.style.width = width + 'px';
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
            }
        }
    }    
</script>