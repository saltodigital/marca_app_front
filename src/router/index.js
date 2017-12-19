import Vue from 'vue';
import Router from 'vue-router';

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
