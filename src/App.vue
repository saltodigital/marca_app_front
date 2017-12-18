<template>
  <div id="app">
    <transition>
      <router-view/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app',
    mounted(){
      if(this.$store.state.token === null){
          //this.$router.replace('login');
      }
    }
}
</script>

<style lang="scss">

</style>
