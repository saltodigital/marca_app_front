// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './vuex/store';
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/es';

Vue.use(ElementUI, { locale });

Vue.config.productionTip = false;

new Vue({
    store,
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
});
