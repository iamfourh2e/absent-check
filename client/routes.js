import Home from '../imports/Home.vue';
import Register from '../imports/Register.vue';
import NotFound from '../imports/NotFound.vue';
import Settings from '../imports/Setting.vue';
import Login from '../imports/Login.vue';
import Class from '../imports/Class.vue';
import ShowClass from '../imports/components/ShowClass';
const withPrefix = (prefix, routes) =>
    routes.map( (route) => {
        route.path = prefix + route.path;
        return route;
    });
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
    },
    ...withPrefix('/user/:id',[
        {
            path: '/teacher',
            name: 'teacher',
            component: Class,
        },
        {
            path: '/teacher/:klassId/show',
            component: ShowClass,
            name: 'showClass'
        }
    ])
];
