import Vue from 'vue';
import Router from 'vue-router';

import VueCookie from 'vue-cookie';
Vue.use(VueCookie);

import Login from '../components/Login';
import Admin from '../components/Admin';
import Clients from '../components/Clients';
import Projects from '../components/Projects';
import Employees from '../components/Employees';
import Dashboard from '../components/Dashboard';

Vue.use(Router);

export default new Router({
  routes: [
    {
        path: '/',
        name: 'admin',
        beforeEnter: (to, from, next) => {
            let ck = Vue.cookie.get('ma_tk_mp');
            console.log(ck);
            if(ck === null){
                next(false);
            }else{
                next();
            }
        },
        component: Admin,
        children: [
            {
                path: '/',
                name: 'dashboard',
                component: Dashboard
            },
            {
                path: 'clients',
                name: 'clients',
                component: Clients
            },
            {
                path: 'projects',
                name: 'projects',
                component: Projects
            },
            {
                path: 'employees',
                name: 'employees',
                component: Employees
            }
        ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
        path: '*',
        redirect: '/'
    }
  ]
})
