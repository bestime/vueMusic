<template>
	<div id="app">
		<ms-mHeader></ms-mHeader>
		<ms-tab></ms-tab>
		<div class="routerView">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
	import Tab from '@/components/tab/tab.vue'
	import MHeader from '@/components/m-header/header.vue'
	export default {
		name: 'app',
		components: {
			'ms-tab': Tab,
			'ms-mHeader': MHeader
		}
	}
</script>

<style>
	#app {
		width:6.4rem;margin:0 auto;overflow:hidden;
	}
</style>
