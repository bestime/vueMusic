<template>
	<div id="app" :class="{'miniPlayerShow':isMiniPlayerShow}">
		<ms-mHeader></ms-mHeader>
		<ms-tab></ms-tab>
		<div class="routerView" ref="routerview">
			<keep-alive>
				<router-view></router-view>
			</keep-alive>
		</div>
		<ms-player></ms-player>
	</div>
</template>

<script>
	import Tab from '@/components/tab/tab.vue'
	import MHeader from '@/components/m-header/header.vue'
	import Player from '@/components/player/player.vue'
	export default {
		name: 'app',
		components: {
			'ms-tab': Tab,
			'ms-mHeader': MHeader,
			'ms-player': Player
		},
		data() {
			return {
				isMiniPlayerShow: false
			}
		},
		created() {
			this.isMiniPlayerShow = this.$store.state.fullScreen;
			console.log(this.isMiniPlayerShow)
		},
		mounted() {
            this.setRecommendListHeight();
            bestime.winFun(window,'resize',() => {
                this.setRecommendListHeight();
            });			
        },
		methods: {
			setRecommendListHeight() {
                var el = this.$refs.routerview;
                var docWidth = document.documentElement.clientWidth || document.body.clientWidth;
                var docHeight = document.documentElement.clientHeight || document.body.clientHeight;
                el.style.height = (docHeight - el.offsetTop) + 'px';
            }
		}
	}
</script>

<style>
	#app {
		width:6.4rem;margin:0 auto;overflow:hidden;
	}
	.routerView{overflow:hidden;}
</style>
