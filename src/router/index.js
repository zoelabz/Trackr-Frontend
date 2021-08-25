import Vue from 'vue'
import Router from 'vue-router'

//Components
import Login from '@/components/auth/Login'
import ForgotPassword from '@/components/auth/ForgotPassword'
import DashboardComponent from '@/components/admin/DashboardComponent'
import { store } from '../store/store'

Vue.use(Router)


const validateAuth = (from, to, next) => {
	if (store.state.user.token.length == null) {
		next('/login')
	}

	next()
}

export default new Router({

	mode: "history",

	routes: [

		//Dashboard 
		{ path: '/dashboard', name: 'Dashboard', component: DashboardComponent, beforeEnter: validateAuth },

		//Forgot Password
		{ path: '/forgot/password', name: 'ForgotPassword', component: ForgotPassword },

		//Login Path
		{ path: '/', name: 'Login', component: Login }

	]

})