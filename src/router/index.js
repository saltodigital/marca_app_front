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
import ClientsAddEmpresa from '../components/Clients/AddEmpresa';
import ClientsAddContact from '../components/Clients/AddContact';

//Projects
import ProjectsList from '../components/Projects/List';
import ProjectsDetail from '../components/Projects/Detail';
import ProjectsAdd from '../components/Projects/AddProject';
import ProjectsAddContact from '../components/Projects/AddProjectContact';

//Employers
import Features from '../components/Employers/Features';
import ResultCalendar from '../components/Employers/ResultCalendar';
import ResultList from '../components/Employers/ResultList';
import ResultMonth from '../components/Employers/ResultMonth';
import Requests from '../components/Employers/Requests';

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
            },{
                path: 'clients/add',
                name: 'clientsAddEmpresa',
                component: ClientsAddEmpresa
            },{
                path: 'clients/contact',
                name: 'clientsAddContact',
                component: ClientsAddContact
            },{
                path: 'projects',
                name: 'projects',
                component: ProjectsList
            },{
                path: 'projects/detail',
                name: 'projectsDetail',
                component: ProjectsDetail
            },{
                path: 'projects/add',
                name: 'projectsAddProject',
                component: ProjectsAdd
            },{
                path: 'projects/contact',
                name: 'projectsAddContact',
                component: ProjectsAddContact
            },{
                path: 'employees',
                name: 'employees',
                component: Features
            },{
                path: 'employees/calendar',
                name: 'employeesCalendar',
                component: ResultCalendar
            },{
                path: 'employees/list',
                name: 'employeesList',
                component: ResultList
            },{
                path: 'employees/month',
                name: 'employeesMonth',
                component: ResultMonth
            },{
                path: 'employees/request',
                name: 'employeesRequest',
                component: Requests
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
