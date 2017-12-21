<template>
  <div class="page-admin">
    <div class="header">
      <div class="header-left">
        <h1>Marca App</h1>
        <a class="menu-collapse-switch" href="#" @click="menuCollapse = !menuCollapse">
          <i class="fa fa-indent" v-if="menuCollapse"></i>
          <i class="fa fa-indent fa-flip-horizontal" v-else></i>
        </a>
      </div>
      <div class="header-description">
        <p>Marca-app Sistema De Control Horario y Asistencia</p>
      </div>
      <div>
        {{ currentTime }}
      </div>
      <div class="header-right">
        <el-popover
                ref="options"
                placement="bottom"
                width="200"
                trigger="click">
          <ul class="user-menu">
            <li>
              <a href="#">Perfil</a>
            </li>
            <li>
              <a href="#" @click="handleLogout">Salir</a>
            </li>
          </ul>

        </el-popover>
        <div v-popover:options>
          <div class="avatar">
          </div>
          <a href="#">{{ currentName }}</a>
        </div>
      </div>
    </div>
    <el-row type="flex">
      <el-col class="col-menu" :xs="menuCollapse ? 0 : 24" :sm="menuCollapse ? 1 : 4">
        <el-menu
                ref="mainMenu"
                :router="true"
                :default-active="menuActive"
                background-color="#545c64"
                text-color="#fff"
                :collapse="menuCollapse">

          <el-menu-item index="1" :route="{name: 'dashboard'}">
              <i class="fa fa-th-large"></i>
              <span slot="title">Página Principal</span>
          </el-menu-item>

          <el-submenu index="2">
              <template slot="title">
                <i class="fa fa-users"></i>
                <span slot="title">Clientes</span>
            </template>
            <el-menu-item :route="{name: 'clients'}" index="2-1">Lista Clientes</el-menu-item>
            <el-menu-item :route="{name: 'clientsDetail'}" index="2-2">Detalle Cliente</el-menu-item>
            <el-menu-item :route="{name: 'clientsAddEmpresa'}" index="2-3">Nuevo Cliente Empresa</el-menu-item>
            <el-menu-item :route="{name: 'clientsAddContact'}" index="2-4">Nuevo Cliente Contacto</el-menu-item>
        </el-submenu>

        <el-submenu index="3">
          <template slot="title">
            <i class="fa fa-briefcase"></i>
            <span slot="title">Proyectos</span>
          </template>
          <el-menu-item index="3-1">Lista Proyectos</el-menu-item>
          <el-menu-item index="3-2">Detalle Proyecto</el-menu-item>
          <el-menu-item index="3-3">Nuevo Proyecto</el-menu-item>
          <el-menu-item index="3-4">Nuevo Contacto Proyecto</el-menu-item>
        </el-submenu>

        <el-submenu index="4">
          <template slot="title">
            <i class="fa fa-vcard"></i>
            <span slot="title">Trabajadores</span>
          </template>
          <el-menu-item index="4-1">Novedades en Curso</el-menu-item>
          <el-menu-item index="4-2">Resultados en Calendario</el-menu-item>
          <el-menu-item index="4-3">Nuevo Cliente Empresa</el-menu-item>
          <el-menu-item index="4-4">Nuevo Cliente Contacto</el-menu-item>
          <el-submenu index="4-5">
            <span slot="title">Resultado en Lista</span>
            <el-menu-item index="4-5-1">Resultado Mensual</el-menu-item>
          </el-submenu>
          <el-menu-item index="4-6">Solicitudes</el-menu-item>
        </el-submenu>

      </el-menu>
    </el-col>


    <el-col :xs="menuCollapse ? 24 : 0" :sm="menuCollapse ? 23 : 20" v-loading="loading" class="col-content">
      <router-view></router-view>
    </el-col>

  </el-row>
</div>
</template>

<script>
import moment from 'moment';
export default {
  mounted(){
      /*
      if(this.$store.state.token === null){

      }*/
      let width = window.screen.width;
      if(typeof width !== "undefined" && width <= 768){
          this.menuCollapse = true;
      }
      this.currentTime = this.getTime();
      setInterval(()=>{
          this.currentTime = this.getTime();
      }, 1000);
  },
  data () {
    return {
        menuCollapse: false,
        loading: false,
        menuActive: "1",
        currentTime: "",
        currentName: this.$store.state.name
    }
  },
  beforeRouteUpdate (to, from, next) {
      let index = null;
      switch (to.name){
          case "dashboard":
              index = "1";
              break;
          case "clients":
              index = "2-1";
              break;
          default:
              break;
      }
      if(index !== null){
          this.$refs.mainMenu.activeIndex = index;
      }
      next();
  },
  methods: {
      handleLogout(){
          this.$store.commit('deleteToken');
          this.loading = true;
          setTimeout(()=>{
              this.$router.push('login');
              this.loading = false;
          }, 1000);
      },
      getTime(){
          return moment().locale('es').format("dddd D, MMMM YYYY, h:mm:ss a");
      }
  },

}
</script>