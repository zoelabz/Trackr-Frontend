<template>
    <div>

        <DashboardHeader/>

        Login Logs
    </div>
</template>

<script>

import DashboardHeader from '../incs/DashboardHeader.vue'

export default {

    name: 'LoginLogComponent',

    components: {
			'DashboardHeader': DashboardHeader
	},

    created: function () {
			document.title = "Login Logs | " + this.$store.state.appName 
	},

}

</script>
