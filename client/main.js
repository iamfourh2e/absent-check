import Vue from 'vue';
import VueRouter from 'vue-router';
import {routes} from './routes';
import VueMeteorTracker from 'vue-meteor-tracker';
import 'vuetify/dist/vuetify.min.css';
import Vuetify  from 'vuetify/dist/vuetify.min.js'
import GoogleMapsLoader from 'google-maps';
GoogleMapsLoader.KEY = 'AIzaSyDOld0lTG5Ku15U-p-kyhohZXmZra2rG1k';
Vue.prototype.$_GoogleMapsLoader = GoogleMapsLoader;
//import page layout
import AppLayout from '../imports/AppLayout.vue';

Vue.use(Vuetify);
Vue.use(VueRouter);
Vue.use(VueMeteorTracker);
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
