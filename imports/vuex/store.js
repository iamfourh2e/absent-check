import Vue from 'vue'
import Vuex from 'vuex'
import authModule from '/imports/vuex/auth.js'
import drawerModule from '/imports/vuex/drawer.js'
const store = new Vuex.Store({
    modules: {
        auth: authModule,
        drawer: drawerModule
    },
    state: {
        users: []
    },
    mutations: {
        updateUsers(state, value) {
            console.log('users state mutated');
            state.users = value
        }
    }
})

export default store