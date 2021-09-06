<template>
    <div>
        <DashboardHeader/>

        Organizations
    </div>
</template>

<script>
import DashboardHeader from '../incs/DashboardHeader.vue'

export default {
    components: { DashboardHeader },
    name: 'OrganizationComponent',

    created: function () {
			document.title = "Organizations | " + this.$store.state.appName 
	},
}

</script>
