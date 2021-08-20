<template>	
	<div>
		<DashboardHeader/>

		<DashboardPage/>
	</div>
</template>

<script type="text/javascript">
	import DashboardHeader from '../incs/DashboardHeader.vue'
	import DashboardPage from '../pages/DashboardPage.vue'

	export default {
		name: 'DashboardComponent',

		components: {
			'DashboardHeader': DashboardHeader,
			'DashboardPage': DashboardPage
		}
	}
</script>