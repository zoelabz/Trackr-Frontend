import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export const store = new Vuex.Store({

	plugins: [ createPersistedState() ],

	state: {
		appName: 'Trackr',
		
		baseApi: 'https://apitrackr.damotiva.com',

		QoD: '',

		user: null,

		authToken: null
	},

	mutations: {

		//On Success Auth
		successAuth: (state, payload) => {

			state.authToken = payload.token

		},

		//Update Quote of The Day From Login Component
		updateQoD: (state, iQoD) => {
			state.QoD = iQoD
		},

		removeUserOnSession: (state) => {
			state.user = null
			state.authToken = null
		}


	},

	actions: {

		
	},

	getters: {

	}


})