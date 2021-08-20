import Vue from 'vue'
import Router from 'vue-router'

//Components
import Login from '@/components/Login'
import ForgotPassword from '@/components/ForgotPassword'

Vue.use(Router)


export default new Router({

	routes: [

		//Forgot Password
		{
			path: '/forgot/password',
			name: 'ForgotPassword',
			component: ForgotPassword
		},

		//Login Path
		{
			path: '/',
			name: 'Login',
			component: Login
		}

	]

})