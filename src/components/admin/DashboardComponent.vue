<template>	
	<div>
		<DashboardHeader/>

		<div class="column">

			<div class="column is-one-quarter">
					<div class="card">
						<div class="card-image">
							<figure class="image is-4by3">
							<img alt="Trackr Logo" src="@/assets/logo.png" id="trackrLogo">
							</figure>
						</div>
						<div class="card-content">
							<div class="media">
						
							<div class="media-content">
								<p class="title is-4">{{ this.$store.state.user.firstName }} {{ this.$store.state.user.lastName }}</p>
								<p class="subtitle is-6" v-if="userLevel == 1">Administrator</p>
								<p class="subtitle is-6" v-else-if="userLevel == 3">Project Manager</p>
							</div>
							</div>

							<div class="content">
							{{ QoD }}
							<br>
							</div>
						</div>
						</div>
			</div>

		</div>
	</div>
</template>

<script type="text/javascript">
	import DashboardHeader from '../incs/DashboardHeader.vue'

	export default {
		name: 'DashboardComponent',

		components: {
			'DashboardHeader': DashboardHeader
		},

		data() {
			return {
				userLevel: this.$store.state.user.level,
				QoD: this.$store.state.QoD
			}
		}
	}
</script>