import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    token: null,
};

const mutations = {
    setToken (state, token) {
        state.token = token;
    },
    deleteToken (state) {
        state.token = null;
    }
};

export default new Vuex.Store({
    state,
    mutations
});