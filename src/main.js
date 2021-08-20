import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store/store'

Vue.config.productionTip = false

//AUthentication Validation
router.beforeEach( (to, from, next) => {

	console.log("From " + router.params)

	// if (this.$store.state.user != null)
	console.log(next())

})

new Vue({
  
  render: h => h(App),
  store: store,
  router,
  
}).$mount('#app')
