//Importar Vuex
import Vue from 'vue';
import Vuex from 'vuex';

//Importar librería para manejar Cookies
import VueCookie from 'vue-cookie';
Vue.use(VueCookie);

Vue.use(Vuex);

const state = {
    token: Vue.cookie.get('ma_tk_mp'), //Toma el token de sesión desde las cookies
    name: Vue.cookie.get('ma_nm_mp'), //Toma el nombre de usuario de sesión desde las cookies
    avatar: Vue.cookie.get('ma_av_mp') //Debería tomar la url del avatar (todavía no implementado)
};

const mutations = {
    //Se ejecuta una vez ha cargado la aplicación, si existe token de sesión en Cookies
    //Lo agrega a las configuraciones de Axios.
    onMounted(){
        window.http.defaults.headers.common['Authorization'] = "Token " + state.token;
        //console.log('Token is in header: ' + state.token);
    },
    //Se ejecuta una vez el usuario inicia sesión
    //Almacena el token y otra información en Cookies y también en las configuraciones de Axios.
    setToken (state, data) {
        state.token = data.token;
        state.name = data.name;
        state.avatar = data.avatar;
        window.http.defaults.headers.common['Authorization'] = "Token "+data.token;
        if(data.remember === true){
            //Si marco la casilla "Recordar" el token se elimina dentro de un día
            Vue.cookie.set('ma_tk_mp', data.token, { expires: '1D' });
        }else{
            //Si no se marco la casilla "Recordar" el token se elimina al cerrar el navegador
            Vue.cookie.set('ma_tk_mp', data.token);
        }
        Vue.cookie.set('ma_nm_mp', data.name);
        Vue.cookie.set('ma_av_mp', data.avatar);
    },
    //Se debe ejecutar al cerrar sesión
    deleteToken (state) {
        state.token = null;
        Vue.cookie.delete('ma_tk_mp');
    }
};

export default new Vuex.Store({
    state,
    mutations
});