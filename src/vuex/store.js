import Vue from 'vue';
import Vuex from 'vuex';

import VueCookie from 'vue-cookie';
Vue.use(VueCookie);

Vue.use(Vuex);

const state = {
    token: Vue.cookie.get('ma_tk_mp'),
};

const mutations = {
    setToken (state, data) {
        state.token = data.token;
        console.log(data);
        if(data.remember === true){
            Vue.cookie.set('ma_tk_mp', data.token, { expires: '1M' });
            console.log('recordar un mes');
        }else{
            Vue.cookie.set('ma_tk_mp', data.token);
            console.log('Eliminar al salir');
        }
    },
    deleteToken (state) {
        state.token = null;
        Vue.cookie.delete('ma_tk_mp');
    }
};

export default new Vuex.Store({
    state,
    mutations
});