<style scoped>
    .listviewBox,.listview{height:100%;}
    .listview .list-group-title{font-size:16px;background:#2f2f2f;color:#8e8e8e;padding-left:0.1rem;line-height:1.6;margin:5px 0;}
    .listview .list-group-item{overflow:hidden;padding:10px 0;}
    .listview .list-group-item img{width:50px;height:50px;display:block;border:none;float:left;border-radius:50%;}
    .listview .list-group-item .name{display:block;overflow:hidden;font-size:14px;color:#9a9a9a;line-height:50px;padding-left:10px;}
    .listview .list-group ul{
        padding:0 0.2rem;
    }

    .list-shortcut{position:absolute;right:0;top:50%;background:#0a0a0a;padding:3px;}
    .list-shortcut ul{height:auto;font-size:0;}
    .list-shortcut li{margin:3px 0;text-align:center;}
    .list-shortcut li span{font-size:12px;color:#888;line-height:14px;}
</style>

<template>
    <div class="listviewBox">
        <ms-scroll class="listview" :data="data">
            <ul>
                <li v-for="group in data" class="list-group">
                    <h2 class="list-group-title">{{ group.title }}</h2>
                    <ul>
                        <li v-for="item in group.items" class="list-group-item">
                            <img class="avatar" v-lazy="item.avatar" />
                            <div class="name">{{ item.name }}</div>
                        </li>
                    </ul>
                </li>
            </ul>            
        </ms-scroll>
        <div class="list-shortcut" ref="listShortcutPos">
            <ul>
                <li v-for="item in shortcutList">
                    <span>{{ item }}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import Scroll from '@/base/scroll/scroll.vue'
    export default {
        props: {
            data: {
                type: Array,
                default: []
            }
        },
        components: {
            'ms-scroll': Scroll
        },
        mounted() {
                          
        },
        computed: {
            shortcutList() {
                this.$nextTick(function() {
                    this._listShortcutPos();
                })  
                return this.data.map((group) => {
                    return group.title.substr(0,1)
                })
                
            }
        },
        methods: {
            _listShortcutPos() {
                var el = this.$refs.listShortcutPos;
                console.log(el) 
                el.style.cssText = 'margin-top:' + (-el.offsetHeight/2) + 'px;';

            }
        }
    }
</script>