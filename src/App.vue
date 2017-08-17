<template>
	<div id="app" :class="{'miniPlayerShow':isMiniPlayerShow}">
		<ms-mHeader></ms-mHeader>
		<ms-tab></ms-tab>
		<div class="routerView" ref="routerview">
			<keep-alive>
				<router-view ref="routers"></router-view>
			</keep-alive>
		</div>
		<ms-player ref="player"></ms-player>
	</div>
</template>

<script>
	import Tab from '@/components/tab/tab.vue'
	import MHeader from '@/components/m-header/header.vue'
	import Player from '@/components/player/player.vue'
	import {mapMutations} from 'vuex'
	export default {
		name: 'app',
		components: {
			'ms-tab': Tab,
			'ms-mHeader': MHeader,
			'ms-player': Player
		},
		computed:{
			isMiniPlayerShow() {
				var playlist = this.$store.state.playlist;
				if(playlist.length){
					return true;
				}else{
					return false;
				}
			}
		},
		mounted() {
            this.setRecommendListHeight();
            bestime.winFun(window,'resize',() => {
                this.setRecommendListHeight();
            });			
        },
		watch: {
			isMiniPlayerShow(){
				this.setMiniPlayerShow(true);
			}
		},
		methods: {
			setRecommendListHeight() {
                var el = this.$refs.routerview;
                var docWidth = document.documentElement.clientWidth || document.body.clientWidth;
                var docHeight = document.documentElement.clientHeight || document.body.clientHeight;
                el.style.height = (docHeight - el.offsetTop) + 'px';				
            },
			...mapMutations({
                setMiniPlayerShow: 'SET_MINIPLAYER_SHOW'
            })
		}
	}
</script>

<style>
	#app {
		width:6.4rem;margin:0 auto;overflow:hidden;
	}
	.routerView{overflow:hidden;}
</style>

<div class="box">  <!-- 这个撑高,设置padding或者height-->
	<div class="fixed"></div>  <!-- 定位 -->
</div>
