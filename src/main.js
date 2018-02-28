// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

//Importar Vue.js
import Vue from 'vue';
import App from './App';

//Importar configuraciones de rutas (Vue Router) https://router.vuejs.org/
import router from './router';

//Importar configuraciones Vuex (para sesiones) https://vuex.vuejs.org/
import store from './vuex/store';

//Importación de componentes especiales para vue.js (Element UI: http://element.eleme.io/#/es)
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/es'; //Español
Vue.use(ElementUI, { locale });

//Importación y configuración de Axios, para peticiones HTTP, ajax (get, post, etc): https://github.com/axios/axios
import axios from 'axios';
window.http = axios.create({
    baseURL: 'https://arcane-retreat-9940.herokuapp.com/',
});

Vue.config.productionTip = false;

new Vue({
    store, //vuex
    el: '#app',
    router, //rutas
    template: '<App/>',
    components: { App }
});
