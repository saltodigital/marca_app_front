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
      if(this.$store.state.token === null){
          this.$router.replace('login');
      }
      this.loaded = true;
    }
}
</script>

<style lang="scss">
  @import "main.scss";
</style>
