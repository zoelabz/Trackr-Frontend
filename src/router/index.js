import Vue from 'vue'
import Router from 'vue-router'

//Components
import Login from '@/components/auth/Login'
import ForgotPassword from '@/components/auth/ForgotPassword'
import DashboardComponent from '@/components/admin/DashboardComponent'

import ManageUsersComponent from '@/components/admin/ManageUsersComponent'
import ChangePasswordComponent from '@/components/auth/ChangePasswordComponent'
import LoginLogsComponent from '@/components/auth/LoginLogsComponent'

import OrganizationComponent from '@/components/pages/OrganizationComponent'
import MilestonesComponent from '@/components/pages/MilestonesComponent'
import ProjectComponent from '@/components/pages/ProjectComponent'

import { store } from '../store/store'

Vue.use(Router)


const validateAuth = (from, to, next) => {
	if (store.state.authToken == null) {
		next('/')
	}

	next()
}

export default new Router({

	mode: "history",

	routes: [

		//Change My Password
		{ path: '/change/my/password', name: 'ChangePassword', component: ChangePasswordComponent },

		//Login Logs
		{ path: '/login/logs', name: 'LoginLogs', component: LoginLogsComponent },

		//Milestones
		{ path: '/projects/milestones', name: 'ProjectsMilestones', component: MilestonesComponent },

		//Projects
		{ path: '/projects', name: 'Projects', component: ProjectComponent },

		//Organizations
		{ path: '/organizations', name: 'Organizations', component: OrganizationComponent },

		//Manage Users
		{ path: '/manage/users', name: 'ManageUsers', component: ManageUsersComponent },

		//Dashboard 
		{ path: '/dashboard', name: 'Dashboard', component: DashboardComponent, beforeEnter: validateAuth },

		//Forgot Password
		{ path: '/forgot/password', name: 'ForgotPassword', component: ForgotPassword },

		//Login Path
		{ path: '/', name: 'Login', component: Login }

	]

})