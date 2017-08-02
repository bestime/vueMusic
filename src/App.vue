<template>
	<div id="app">
		<tab></tab>
		<div class="routerView">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
	import Tab from '@/components/tab/tab.vue'
	export default {
		name: 'app',
		components: {
			'tab': Tab
		}
	}
</script>

<style>
	#app {
		width:6.4rem;background:#222;margin:0 auto;overflow:hidden;
	}
</style>
