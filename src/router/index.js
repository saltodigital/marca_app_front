import Vue from 'vue';
import Router from 'vue-router';

import VueCookie from 'vue-cookie';
Vue.use(VueCookie);

import Login from '../components/Login';
import Admin from '../components/Admin';
import Dashboard from '../components/Dashboard';

//Clients
import ClientsList from '../components/Clients/List';
import ClientsDetail from '../components/Clients/Detail';

Vue.use(Router);

export default new Router({
  routes: [
    {
        path: '/',
        beforeEnter: (to, from, next) => {
            let ck = Vue.cookie.get('ma_tk_mp');
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
            },{
                path: 'clients',
                name: 'clients',
                component: ClientsList
            },{
                path: 'clients/detail',
                name: 'clientsDetail',
                component: ClientsDetail
            },
            {
                path: 'projects',
                name: 'projects',
                component: ClientsList
            },
            {
                path: 'employees',
                name: 'employees',
                component: ClientsList
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
