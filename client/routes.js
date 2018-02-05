import Home from '../imports/Home.vue';
import Register from '../imports/Register.vue';
import NotFound from '../imports/NotFound.vue';
import Settings from '../imports/Setting.vue';
import Login from '../imports/Login.vue';
export const routes = [
    {
        path: '/',
        component: Home
    },
    {
      path: '/login',
      component: Login,
      name: 'login'
    },
    {
        path: '/register',
        component: Register,
        name: 'register'
    },
    {
        path: '/settings',
        component: Settings
    },
    {
        path: '*',
        component: NotFound
    }
];
