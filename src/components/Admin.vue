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
        <el-popover ref="options" placement="bottom" width="200" trigger="click">
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
        <el-menu ref="mainMenu" :router="true" :default-active="menuActive" background-color="#545c64"
          text-color="#fff" :collapse="menuCollapse" unique-opened>

          <el-menu-item index="1" :route="{name: 'dashboard'}">
            <i class="fa fa-th-large"></i>
            <span slot="title">Página Principal</span>
          </el-menu-item>

          <el-submenu index="2">
            <template slot="title">
              <i class="fa fa-th-large"></i>
              <span slot="title">Nuevos</span>
            </template>
            <el-submenu index="2-1">
              <template slot="title">
                <i class="fa fa-users"></i>
                <span slot="title">Cliente</span>
              </template>
              <el-menu-item :route="{name: 'clients'}" index="2-1-1">Lista Clientes</el-menu-item>
              <el-menu-item :route="{name: 'clientsDetail'}" index="2-1-2">Detalle Cliente</el-menu-item>
              <el-menu-item :route="{name: 'clientsAddEmpresa'}" index="2-1-3">Nuevo Cliente Empresa</el-menu-item>
              <el-menu-item :route="{name: 'clientsAddContact'}" index="2-1-4">Nuevo Cliente Contacto</el-menu-item>
            </el-submenu>
            <el-submenu index="2-2">
              <template slot="title">
                <i class="fa fa-briefcase"></i>
                <span slot="title">Proyecto</span>
              </template>
              <el-menu-item :route="{name: 'projects'}" index="2-2-1">Lista Proyectos</el-menu-item>
              <el-menu-item :route="{name: 'projectsDetail'}" index="2-2--2">Detalle Proyecto</el-menu-item>
              <el-menu-item :route="{name: 'projectsAddProject'}" index="2-2-3">Nuevo Proyecto</el-menu-item>
              <el-menu-item :route="{name: 'projectsAddContact'}" index="2-2-4">Nuevo Contacto Proyecto</el-menu-item>
            </el-submenu>
            <el-submenu index="2-3">
              <template slot="title">
                <i class="fa fa-vcard"></i>
                <span slot="title">Trabajador</span>
              </template>
              <el-menu-item index="2-3-1" :route="{name: 'employees'}">Novedades en Curso</el-menu-item>
              <el-menu-item index="2-3-2" :route="{name: 'employeesCalendar'}">Resultados en Calendario</el-menu-item>
              <el-menu-item index="2-3-3" :route="{name: 'employeesList'}">Resultado en Lista Trabajadores</el-menu-item>
              <el-menu-item index="2-3-4" :route="{name: 'employeesMonth'}">Resultado Mensual</el-menu-item>
              <el-menu-item index="2-3-5" :route="{name: 'employeesRequest'}">Solicitudes</el-menu-item>
            </el-submenu>
          </el-submenu>

          <el-submenu index="5">
            <template slot="title">
              <i class="fa fa-puzzle-piece"></i>
              <span slot="title">Configuraciones</span>
            </template>
            <el-menu-item index="5-1" :route="{name: 'positions'}">Cargos</el-menu-item>
            <el-menu-item index="5-2" :route="{name: 'locations'}">Ubicaciones</el-menu-item>
          </el-submenu>

        </el-menu>
      </el-col>


      <el-col :xs="menuCollapse ? 24 : 0" :sm="menuCollapse ? 23 : 20" v-loading="loading"
        class="col-content">
        <router-view></router-view>
      </el-col>

    </el-row>
  </div>
</template>

<script>
  import moment from "moment";
  export default {
    data() {
      return {
        menuCollapse: false,
        loading: false,
        menuActive: "1",
        currentTime: "",
        currentName: this.$store.state.name
      };
    },
    mounted() {
      /*
          if(this.$store.state.token === null){

          }*/
      let width = window.screen.width;
      if (typeof width !== "undefined" && width <= 768) {
        this.menuCollapse = true;
      }
      this.currentTime = this.getTime();
      setInterval(() => {
        this.currentTime = this.getTime();
      }, 1000);
    },
    beforeRouteUpdate(to, from, next) {
      let index = null;
      switch (to.name) {
        case "dashboard":
          index = "1";
          break;
        case "clients":
          index = "2-1";
          break;
        case "projects":
          index = "3-1";
          break;
        case "employees":
          index = "4-1";
          break;
        case "clientsAddEmpresa":
          index = "2-3";
          break;
        case "clientsDetail":
          index = "2-2";
          break;
        default:
          break;
      }
      if (index !== null) {
        this.$refs.mainMenu.activeIndex = index;
      }
      next();
    },
    methods: {
      handleLogout() {
        this.$store.commit("deleteToken");
        this.loading = true;
        setTimeout(() => {
          this.$router.push("login");
          this.loading = false;
        }, 1000);
      },
      getTime() {
        return moment()
          .locale("es")
          .format("dddd D, MMMM YYYY, h:mm:ss a");
      }
    }
  };

</script>
