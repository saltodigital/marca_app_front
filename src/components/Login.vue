<template>
  <div>
    <h1>Login</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi beatae commodi delectus dignissimos distinctio dolor, dolore doloribus ducimus et illum incidunt iste libero obcaecati odit optio quae quas sapiente veritatis.</p>
  </div>
</template>

<script>
export default {
    mounted(){
        if(this.$store.state.token !== null){
            //this.$router.replace('admin');
        }
    },
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
}
</script>