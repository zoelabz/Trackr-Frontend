<template>
    <div>
        <DashboardHeader/>

        Change Password
    </div>
</template>

<script>

import DashboardHeader from '../incs/DashboardHeader.vue'

export default {

    name: 'ChangePasswordComponent',

    components: {
			'DashboardHeader': DashboardHeader
	},

    created: function () {
			document.title = "Change Password | " + this.$store.state.appName 
	},
    
}

</script>
