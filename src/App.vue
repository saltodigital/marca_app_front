<template>
  <div id="app">
    <transition name="fade">
      <router-view v-if="loaded"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app',
    data(){
      return{
          loaded: false
      }
    },
    mounted(){
      if(this.$store.state.token === null){ //Si no existe el token, enviar el usuario a iniciar sesión
          this.$router.replace('login');
      }else {
          this.$store.commit('onMounted');
          //Si el token existe ejecutar la función onMounted en /vuex/store
          //Esa función toma el token de las cookies y lo guarda en las configuraciones Header de Axios.
      }
      this.loaded = true;
    }
}
</script>

<style lang="scss">
  /*
  Importar main.scss (Todos los estilos de la aplicación)
   */
  @import "main.scss";
</style>
