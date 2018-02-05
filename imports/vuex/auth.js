import {Meteor} from 'meteor/meteor'
import {Accounts} from 'meteor/accounts-base'

const authModule = {
    state: {
        user: null,
        errorLogin: null
    },
    mutations: {
        UPDATE_USER(state, value) {
            let user = Meteor.users.findOne({});
            state.user = value || user && user._id ? user : null;
        },
        IS_ERROR_USER_LOGIN(state, value) {
            state.error = value;
        },
        isUsernameValid(state, value) {
            state.isUsernameValid = value
        }
    },
    actions: {
        submitRegisterForm({commit, state}, formData) {
            Accounts.createUser(formData, error => {
                if (error) {
                    console.log(error.reason)
                } else {
                    commit('UPDATE_USER')
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
                    console.log(error.reason)
                    new Meteor.Error(error.reason)
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