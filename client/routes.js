import Home from '../imports/Home.vue';
import Register from '../imports/Register.vue';
import NotFound from '../imports/NotFound.vue';

export const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/register',
        component: Register
    },
    {
        path: '*',
        component: NotFound
    }
]