<style scoped>
.progressBar{position:relative;width:98%;border-radius:10px;margin:0 auto;background:#000;height:100%;}
.progressBar .barInner{width:40%;height:100%;background:#bb9c47;border-radius:20px;position:relative;}
.progressBar .progressBtn{position:absolute;right:-5px;top:-3px;}
.progressBar .progressBtnDrag{width:10px;height:10px;background:#fff;border-radius:50%;}
</style>

<template>
    <div class="progressBar" ref="progressBar" @click="progressClick">
        <div class="barInner" ref="barInner">
            <div class="progress" ref="progress"></div>
            <div class="progressBtn" 
                @touchstart.prevent="progressTouchStart" 
                @touchmove.prevent="progressTouchMove" 
                @touchend="progressTouchEnd"
            
            >
                <div class="progressBtnDrag" ref="progressBtn"></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            percent: {
                type: Number,
                default: 0
            }
        },
        data() {
            return {
                isDraging: false
            }
        },
        created() {
            this.touch = {};
        },
        methods: {
            progressClick(e) {
                this._offset(e.offsetX);
                this._triggerPercent();
            },
            progressTouchStart(e) {
                this.touch.initiated = true;
                this.isDraging = true;
                this.touch.startX = e.touches[0].pageX;
                this.touch.left = this.$refs.barInner.offsetWidth;
            },
            progressTouchMove(e) {
                if(!this.touch.initiated) return;
                const deltaX = e.touches[0].pageX - this.touch.startX;
                var offsetWidth = Math.max(0,this.touch.left+deltaX);
                if(offsetWidth>=this.$refs.progressBar.offsetWidth){
                    offsetWidth = this.$refs.progressBar.offsetWidth;
                }else if(offsetWidth<=0){
                    offsetWidth = 0;
                }
                this._offset(offsetWidth);
            },
            progressTouchEnd() {
                this.touch.initiated = false;
                this.isDraging = false;
                this._triggerPercent();
            },
            _offset(offsetWidth){
                this.$refs.barInner.style.cssText = `width:${offsetWidth}px`
            },
            _triggerPercent() {
                const barWidth = this.$refs.progressBar.offsetWidth;
                const percent = this.$refs.barInner.offsetWidth / barWidth;
                this.$emit('percentChange', percent)
            }
        },
        watch: {
            percent(newPercent){
                if(newPercent>=0&&!this.isDraging){
                    const barWidth = this.$refs.progressBar.offsetWidth;
                    const offsetWidth = newPercent * barWidth;
                    this._offset(offsetWidth);
                }
            }
        }
    }
</script>