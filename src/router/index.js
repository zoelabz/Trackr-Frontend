import Vue from 'vue'
import Router from 'vue-router'

//Components
import Login from '@/components/auth/Login'
import ForgotPassword from '@/components/auth/ForgotPassword'
import DashboardComponent from '@/components/admin/DashboardComponent'

Vue.use(Router)


export default new Router({

	mode: "history",

	routes: [

		//Dashboard 
		{ path: '/dashboard', name: 'Dashboard', component: DashboardComponent },

		//Forgot Password
		{ path: '/forgot/password', name: 'ForgotPassword', component: ForgotPassword },

		//Login Path
		{ path: '/', name: 'Login', component: Login }

	]

})