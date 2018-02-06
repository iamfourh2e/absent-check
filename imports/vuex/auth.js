import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'
import {superUserItems} from './superUserItems';
function SET_DRAWER_ITEMS(state,user) {
    if(user){
        if (user && !user.profile.classEngaged) {
            state.items = state.items.filter(o => o.text !== 'Teacher');
        }else{
            state.items = superUserItems
        }
    }else{
        state.items = [];
    }
}
function UNSET_DRAWER_ITEMS(state) {
    state.items = [];
}
const authModule = {
    state: {
        items: superUserItems,
        user: null,
        errorLogin: null,
        users: []
    },
    mutations: {
        UPDATE_USER(state, value) {
            let user = Meteor.users.findOne({});
            if(user && user._id){
                user.tag = `@${user.username}`;
                state.user = user;
                state.users = [user];
                state.errorLogin = null;
                SET_DRAWER_ITEMS(state,user);
            }else{
                state.user = null;
            }
        },
        IS_ERROR_USER_LOGIN(state, value) {
            state.errorLogin = value;
            UNSET_DRAWER_ITEMS(state);
        },
    },
    actions: {
        submitRegisterForm({ commit, state, rootState }, formData) {
            Accounts.createUser(formData, error => {
                if (error) {
                    commit('IS_ERROR_USER_LOGIN', error)
                } else {
                    commit('UPDATE_USER');
                }

            })
        },
        becomeATeacher() {
            let user = Meteor.users.findOne({});
            Meteor.call("user_updateUser", { $set: { 'profile.classEngaged': !user.profile.classEngaged } }, (err, result) => {
                if (!err) {
                    this.commit('UPDATE_USER');
                }

            });
        },
        subscribeUser() {

        },
        submitLoginForm({ commit, state, rootState }, formData) {
            Meteor.loginWithPassword(formData.username, formData.password, error => {
                if (!error) {
                    this.commit('UPDATE_USER');
                } else {
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