<template>
  <div class="page-login">
    <div class="main-form">
      <h2>Iniciar Sesión</h2>
      <p>Por favor ingresa tus credenciales.</p>
      <el-form :model="user" :rules="rules" ref="vForm" @submit="handleLogin">
        <el-form-item label="Email" prop="email">
          <el-input v-model="user.email" placeholder="Email"></el-input>
        </el-form-item>
        <el-form-item label="Contraseña" prop="password">
          <el-input @keyup.enter.native="handleLogin" type="password" v-model="user.password" placeholder="Contraseña"></el-input>
        </el-form-item>
        <el-form-item prop="remember">
          <el-checkbox v-model="user.remember">Recordar mis datos</el-checkbox>
        </el-form-item>
        <el-button
                @click="handleLogin"
                type="primary"
                v-loading="loading"
                class="fluid-width">Ingresar</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
    mounted(){
        if(this.$store.state.token !== null){
            this.$router.replace('admin');
        }
    },
    data () {
      return {
          loading: false,
          user:{
              email: '',
              password: '',
              remember: false
          },
          rules: {
              email: [
                  {required: true, type: 'email', message: 'Ingrese un email válido'}
              ],
              password: [
                  { required: true, message: 'Ingrese su contraseña'}
              ]
          }
      }
    },
    methods: {
        handleLogin(){
            this.$refs.vForm.validate((valid)=>{
                if(valid){
                    this.loading = true;
                    this.$store.commit('setToken', {token: '123', remember: this.user.remember});
                    setTimeout(()=>{
                        this.loading = false;
                        this.$router.push('admin');
                    }, 3000);
                }
            });
        }
    }
}
</script>
<style lang="scss" scoped>
  .page-login{
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    h2,p{
      text-align: center;
    }
    .main-form{
      width: 100%;
      max-width: 320px;
    }
  }
</style>