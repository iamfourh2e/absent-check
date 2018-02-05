import {Meteor} from 'meteor/meteor'
import {Accounts} from 'meteor/accounts-base'
const authModule = {
    state: {
        user: null,
        errorLogin: null,
        users: []
    },
    mutations: {
        UPDATE_USER(state, value) {
            let user = Meteor.users.findOne({});
            state.user = value || user && user._id ? user : null;
            state.users = [value || user && user._id ? user : null]
            state.errorLogin = null
        },
        IS_ERROR_USER_LOGIN(state, value) {
            state.errorLogin = value;
        },
        
    },
    actions: {
        submitRegisterForm({commit, state}, formData) {
            Accounts.createUser(formData, error => {
                if (error) {
                    commit('IS_ERROR_USER_LOGIN', error)
                } else {
                    commit('UPDATE_USER');
                }

            })
        },
        subscribeUser() {

        },
        submitLoginForm({commit, state}, formData) {
            Meteor.loginWithPassword(formData.username, formData.password, error => {
                if (!error) {
                    this.commit('UPDATE_USER');
                }else{
                   this.commit('IS_ERROR_USER_LOGIN', error)
                }
            })
        },
        logout() {
            Meteor.logout(() => {
                this.commit('UPDATE_USER', null)
            })
        }
    }
};

export default authModule