<style scoped>
    .listviewBox{position:relative;}
    .listviewBox,.listview{height:100%;}
    .listview .list-group-title,.list-fixed h1{font-size:16px;background:#2f2f2f;color:#8e8e8e;padding-left:0.1rem;line-height:1.6;margin:5px 0;}
    .listview .list-group-title:nth-of-type(1){margin-top:0;}
    .listview .list-group-item{overflow:hidden;padding:10px 0;}
    .listview .list-group-item img{width:50px;height:50px;display:block;border:none;float:left;border-radius:50%;}
    .listview .list-group-item .name{display:block;overflow:hidden;font-size:14px;color:#9a9a9a;line-height:50px;padding-left:10px;}
    .listview .list-group ul{
        padding:0 0.2rem;
    }

    .list-shortcut{position:absolute;right:0;top:50%;background:#0a0a0a;padding:3px;}
    .list-shortcut ul{height:auto;font-size:0;}
    .list-shortcut li{text-align:center;overflow:hidden;font-size:0;}
    .list-shortcut li span{font-size:12px;color:#888;display:inline-block;height:18px;line-height:18px;}
    .list-shortcut li.on span{color:#bb9c47;}
    .list-fixed{position:absolute;top:0;z-index:2;left:0;width:100%;font-size:0;}
    .list-fixed h1{margin: 0;}
</style>

<template>
    <div class="listviewBox">        
        <ms-scroll 
            class="listview" 
            :data="data" 
            ref="listview" 
            :listenScroll="listenScroll" 
            @scroll="scroll" 
            :probeType="probeType" 
        >
            <ul>                
                <li v-for="group in data" class="list-group" ref="listGroup">
                    <h2 class="list-group-title">{{ group.title }}</h2>
                    <ul>
                        <li 
                            v-for="item in group.items" 
                            class="list-group-item" 
                            @click="selectItem(item)"
                        >
                            <img class="avatar" v-lazy="item.avatar" />
                            <div class="name">{{ item.name }}</div>
                        </li>
                    </ul>
                </li>
            </ul>            
        </ms-scroll>
        <div 
            class="list-shortcut" 
            ref="listShortcutPos" 
            @touchstart="onShortcutTouchStart" 
            @touchmove.stop.prevent="onShortcutTouchMove"
        >
            <ul>
                <li v-for="(item,index) in shortcutList" :class="{'on':currentIndex===index}">
                    <span :data-index="index">{{ item }}</span>
                </li>
            </ul>
        </div>  
        <div class="list-fixed" ref="listFixed">
            <h1 class="fixed-title" v-show="fixedTitle">{{ fixedTitle }}</h1>
        </div>      
    </div>
</template>

<script>
    import Scroll from '@/base/scroll/scroll.vue'
    
    export default {
        created() {
            this.touch = {};
            this.listenScroll = true;
            this.listHeight = [];
            this.probeType = 3;
        },
        props: {
            data: {
                type: Array,
                default: []
            }
        },
        data() {
            return {
                scrollY: -1,
                currentIndex: 0,
                diff:-1,
                test:{
                    a: '这个可以绑定'
                }
            }
        },
        components: {
            'ms-scroll': Scroll
        },
        computed: {
            shortcutList() {
                this.$nextTick(function() {
                    this._listShortcutPos();
                })  
                return this.data.map((group) => {
                    return group.title.substr(0,1)
                })
            },
            fixedTitle() {
                if(this.scrollY>=0){
                    return null;
                }
                return this.data[this.currentIndex] ? this.data[this.currentIndex].title : null;
            }            
        },
        methods: {
            selectItem(item){
                this.$emit('select', item)
            },
            _listShortcutPos() {
                var el = this.$refs.listShortcutPos;
                el.style.cssText = 'margin-top:' + (-el.offsetHeight/2) + 'px;';

            },
            onShortcutTouchStart(e) {
                var index = e.target.getAttribute('data-index');
                var firstTouch = e.touches[0];
                this.touch.y1 = firstTouch.pageY;
                this.touch.index = index;
                this._scrollTo(index);
                //console.log(index)
            },
            onShortcutTouchMove(e) {
                var noeTouch = e.touches[0];
                this.touch.y2 = noeTouch.pageY;
                var liSpan = this.$refs.listShortcutPos.getElementsByTagName('li')[0].getElementsByTagName('span')[0];
                let delta = Math.ceil((this.touch.y2 - this.touch.y1)/liSpan.offsetHeight);
                
                let index = Number(this.touch.index) + delta;

                //console.log(index);
                this._scrollTo(index);
            },
            _scrollTo(index) {
                if(!index) return;
                this.$refs.listview.scrollToElement(this.$refs.listGroup[index],0);
                this.currentIndex = parseInt(index);
            },
            scroll(pos) {
                //console.log('listview.vue-scroll')
                this.scrollY = pos.y;
            },
            _calculateHeight() {
                this.listHeight = [];
                const list = this.$refs.listGroup;
                let height = 0;
                this.listHeight.push(height);
                for(let i=0;i<list.length;i++){
                    let item = list[i];
                    height += item.offsetHeight;
                    this.listHeight.push(height);
                }
            }
        },
        watch: {
            data() {
                setTimeout(() => {
                    this._calculateHeight();
                },30)
            },
            scrollY(newY) {
                if(newY >= 0){
                    this.currentIndex = 0;
                    return;
                }
                const listHeight = this.listHeight
                for(let i=0;i<listHeight.length;i++){
                    let height1 = listHeight[i];
                    let height2 = listHeight[i+1];
                    if(!height2 || (-newY>height1&&-newY<height2)){
                        this.currentIndex = i;
                        this.diff = height2 + newY;
                        return;
                    }
                }
                this.currentIndex = 0;                
            },
            diff(newVal){
                var h = this.$refs.listFixed.offsetHeight;
                let fixedTop = (newVal>0&&newVal<h)?(newVal-h) : 0;
                if(this.fixedTop===fixedTop){
                    return;
                }
                //console.log(this.$refs.listFixed)
                this.fixedTop = fixedTop;
                this.$refs.listFixed.style.transform = `translate3d(0,${fixedTop}px,0)`;
            }
        }
    }

</script>