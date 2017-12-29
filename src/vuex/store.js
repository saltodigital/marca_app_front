import Vue from 'vue';
import Vuex from 'vuex';

import VueCookie from 'vue-cookie';
Vue.use(VueCookie);

Vue.use(Vuex);

const state = {
    token: Vue.cookie.get('ma_tk_mp'),
    name: Vue.cookie.get('ma_nm_mp'),
    avatar: Vue.cookie.get('ma_av_mp')
};

const mutations = {
    onMounted(){
        window.http.defaults.headers.common['Authorization'] = "Token " + state.token;
        //console.log('Token is in header: ' + state.token);
    },
    setToken (state, data) {
        state.token = data.token;
        state.name = data.name;
        state.avatar = data.avatar;
        window.http.defaults.headers.common['Authorization'] = "Token "+data.token;
        if(data.remember === true){
            Vue.cookie.set('ma_tk_mp', data.token, { expires: '1D' });
        }else{
            Vue.cookie.set('ma_tk_mp', data.token);
        }
        Vue.cookie.set('ma_nm_mp', data.name);
        Vue.cookie.set('ma_av_mp', data.avatar);
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