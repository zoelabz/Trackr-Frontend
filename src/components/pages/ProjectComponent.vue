<template>
    <div>
        <DashboardHeader/>

        Project
    </div>
</template>

<script>
import DashboardHeader from '../incs/DashboardHeader.vue'

export default {
    components: { DashboardHeader },
    name: 'ProjectComponent',

    created: function () {
			document.title = "Projects | " + this.$store.state.appName 
	},
}

</script>
