<template>
  <div id="app">
    <transition name="fade">
      <router-view/>
    </transition>
    <i class="el-icon-edit"></i>
    <i class="el-icon-share"></i>
    <i class="el-icon-delete"></i>
    <el-button type="primary" icon="el-icon-search">Search</el-button>
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
  @import "main.scss";
</style>
