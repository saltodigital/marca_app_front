<template>
  <div class="page-login">
    <div class="main-form">
      <h2>Iniciar Sesión</h2>
      <p>Por favor ingresa tus credenciales.</p>
      <el-form :model="user" :rules="rules" ref="vForm" @submit="handleLogin">
        <el-form-item label="Nombre de usuario" prop="username" class="fluid-width">
          <el-input v-model="user.username" placeholder="Usuario"></el-input>
        </el-form-item>
        <el-form-item label="Contraseña" prop="password" class="fluid-width">
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
              username: '',
              password: '',
              remember: false
          },
          rules: {
              username: [
                  {required: true, message: 'Ingrese su nombre de usuario'}
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
                    http.post('rest-auth/login/', this.user).then((res)=>{
                        this.loading = false;
                        console.log(res.data);
                        this.$store.commit('setToken', {
                            token: res.data.key,
                            name: this.user.username,
                            avatar: '',
                            remember: this.user.remember
                        });
                        this.$router.replace('dashboard');
                    }).catch((err)=>{
                        this.loading = false;
                        this.$message({
                            message: err.response.data.non_field_errors ? err.response.data.non_field_errors[0] : 'No puede iniciar sesión con las credenciales proporcionadas.',
                            type: 'warning'
                        });
                    });
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