import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({

	state: {
		appName: 'Trackr',
		
		baseApi: 'http://apitrackr.damotiva.com',

		QoD: '',

		user: null,

		token: null
	},

	mutations: {

		//Update Quote of The Day From Login Component
		updateQoD: (state, iQoD) => {
			state.QoD = iQoD
		},

		removeUserOnSession: (state) => {
			state.user = null
			state.token = null
		}


	},

	actions: {

		
	},

	getters: {

	}


})