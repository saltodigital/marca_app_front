<template>
  <div>
    <h1>Clients</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusamus adipisci aliquid aspernatur culpa deserunt dolor, doloribus id laborum laudantium nesciunt praesentium reprehenderit sed voluptatem voluptatibus? Amet dicta molestias repudiandae!</p>
  </div>
</template>

<script>
export default {
    mounted(){
        if(this.$store.state.token === null){
            //this.$router.replace('login');
        }
    },
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
  }
}
</script>