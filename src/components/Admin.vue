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
      <div class="header-right">
        <el-popover
                ref="options"
                placement="bottom"
                width="200"
                trigger="click">
          <a href="#">Perfil</a>
          <br>
          <a href="#">Salir</a>
        </el-popover>
        <div class="avatar" v-popover:options>
        </div>
        <a href="#" v-popover:options>Carlos Hernandez</a>
      </div>
    </div>
    <el-row>
      <el-col class="col-menu" :span="menuCollapse ? 1 : 4">
        <el-menu
                default-active="1"
                @open="handleOpen"
                @close="handleClose"
                background-color="#545c64"
                text-color="#fff"
                :collapse="menuCollapse">

          <el-menu-item index="1">
              <i class="fa fa-th-large"></i>
              <span slot="title">Página Principal</span>
          </el-menu-item>

          <el-submenu index="2">
              <template slot="title">
                <i class="fa fa-users"></i>
                <span slot="title">Clientes</span>
            </template>
            <el-menu-item index="2-1">Lista Clientes</el-menu-item>
            <el-menu-item index="2-2">Detalle Cliente</el-menu-item>
            <el-menu-item index="2-3">Nuevo Cliente Empresa</el-menu-item>
            <el-menu-item index="2-4">Nuevo Cliente Contacto</el-menu-item>
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


    <el-col :span="menuCollapse ? 23 : 20">
      <router-view></router-view>
    </el-col>

  </el-row>
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
      menuCollapse: false
    }
  },
  methods: {
      handleOpen(key, keyPath) {
          console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
          console.log(key, keyPath);
      }
  }
}
</script>