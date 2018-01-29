import Vue from 'vue';
import VueRouter from 'vue-router';
import {routes} from './routes';

//import page layout
import AppLayout from '../imports/AppLayout.vue';
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
