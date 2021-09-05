<template>
    <div>
        <DashboardHeader/>

        Milestones
    </div>
</template>

<script>
import DashboardHeader from '../incs/DashboardHeader.vue'

export default {
    components: { DashboardHeader },
    name: 'MilestonesComponent',

    created: function () {
			document.title = "Milestones | " + this.$store.state.appName 
	},
}

</script>
