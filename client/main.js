import Vue from 'vue';
import VueRouter from 'vue-router';
import {routes} from './routes';
import 'vuetify/dist/vuetify.min.css';
import Vuetify  from 'vuetify/dist/vuetify.min.js'
//import page layout
import AppLayout from '../imports/AppLayout.vue';

Vue.use(Vuetify);
Vue.use(VueRouter);
const router = new VueRouter({
    mode: 'history',
    routes
})

Meteor.startup(()=>{
    new Vue({
        el: '#app',
        router,
        render: h => h(AppLayout)
    })
})
