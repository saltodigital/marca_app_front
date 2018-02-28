<template>
  <div>
    <el-row class="m-bottom-1">
      <h3>Asignación de Colaboradores.</h3>
    </el-row>
    <el-row class="m-bottom-1">
      <el-col :xs="24" :sm="6" class="m-bottom-2">
        Buscar colaborador
        <el-select v-model="selectedUser" filterable clearable remote reserve-keyword placeholder="Buscar" @change="remoteWorkerChange"
          :remote-method="remoteUser" >
          <el-option v-for="item in remoteUsers" :key="item.id" :label="item.first_name + ' ' + item.last_name" :value="item.id">
          </el-option>
        </el-select>
      </el-col>
      <el-col :xs="24" :sm="6" class="m-bottom-2">
        Buscar Cliente
         <el-select v-model="selectedClient" filterable clearable remote reserve-keyword placeholder="Buscar" @change="remoteClientChange"
          :remote-method="remoteClient" :loadingRemote="loadingRemote" :disabled="!selectedUser">
          <el-option v-for="item in remoteClients" :key="item.id" :label="item.nombre" :value="item.id">
          </el-option>
        </el-select>
      </el-col>
      <el-col :xs="24" :sm="6" class="m-bottom-2">
        Buscar Proyecto
         <el-select v-model="selectedProject" filterable clearable remote reserve-keyword placeholder="Buscar" @change="remoteProjectChange"
          :remote-method="remoteProject" :loadingRemote="loadingRemote">
          <el-option v-for="item in remoteProjects" :key="item.id" :label="item.nombre" :value="item.id">
          </el-option>
        </el-select>
      </el-col>
      <el-col :xs="24" :sm="6" class="m-bottom-2">
        Desde
        <el-date-picker
          v-model="desde"
          format="dd-MM-yyyy"
          type="date"
          placeholder="Desde">
        </el-date-picker>
      </el-col>
      <el-col :xs="24" :sm="6" class="m-bottom-2">
        Hasta
        <el-date-picker
          v-model="hasta"
          format="dd-MM-yyyy"
          type="date"
          placeholder="Desde">
        </el-date-picker>
      </el-col>
      <el-col :xs="24" :sm="6" class="m-bottom-2">
        Días
        <el-input
          v-model="dias">
        </el-input>
      </el-col>
      <el-col :xs="24" :sm="6" class="m-bottom-2">
        Horas
        <el-input
          v-model="horas">
        </el-input>
      </el-col>
      <el-col :xs="24" :sm="6" class="m-bottom-2">
        <el-button type="primary" @click="saveProjectUser" >Asignar</el-button>
      </el-col>
    </el-row>
    <el-row class="m-bottom-3">
      <el-table style="width: 100%" :data="items">
        <el-table-column label="Colaborador" width="180">
          <template slot-scope="scope">
            {{ scope.row.first_name }} {{ scope.row.last_name }}
          </template>
        </el-table-column>
        <el-table-column label="Rol" width="180">
          <template slot-scope="scope">
            {{ scope.row.cargo.nombre }}
          </template>
        </el-table-column>
        <el-table-column label="Cliente">
          <template slot-scope="scope">
            {{ selectedClientData.nombre }}
          </template>
        </el-table-column>
        <el-table-column label="Proyecto">
          <template slot-scope="scope">
            {{ selectedProjectData.nombre }}
          </template>
        </el-table-column>
        <el-table-column label="Dirección">
        </el-table-column>
        <el-table-column label="Ciudad/País">
        <template slot-scope="scope">
            {{ scope.row.persona.municipio.nombre }}
          </template>
        </el-table-column>
        <el-table-column label="Desde">
          <template slot-scope="scope">
            {{ desde }}
          </template>
        </el-table-column>
        <el-table-column label="Hasta">
          <template slot-scope="scope">
            {{ hasta }}
          </template>
        </el-table-column>
        <el-table-column prop="address" label="Días">
          <template slot-scope="scope">
            {{ dias }}
          </template>
        </el-table-column>
        <el-table-column prop="address" label="Horas">
          <template slot-scope="scope">
            {{ horas }}
          </template>
        </el-table-column>
        <el-table-column prop="address" label="Asig %">
        </el-table-column>
        <el-table-column prop="address" label="Nº">
        </el-table-column>
        <el-table-column prop="address" label="Total">
        </el-table-column>
        <el-table-column prop="address" label="Supervisor">
        </el-table-column>
      </el-table>
    </el-row>
    <el-row>
      <el-table style="width: 100%" :data="items">
        <el-table-column label="Colaborador" width="180">
          <template slot-scope="scope">
            {{ scope.row.first_name }} {{ scope.row.last_name }}
          </template>
        </el-table-column>
        <el-table-column label="Rol" width="180">
          <template slot-scope="scope">
            {{ scope.row.cargo.nombre }}
          </template>
        </el-table-column>
        <el-table-column label="Cliente">
          <template slot-scope="scope">
            {{ selectedClientData.nombre }}
          </template>
        </el-table-column>
        <el-table-column label="Proyecto">
          <template slot-scope="scope">
            {{ selectedProjectData.nombre }}
          </template>
        </el-table-column>
        <el-table-column label="Dirección">
        </el-table-column>
        <el-table-column label="Ciudad/País">
        <template slot-scope="scope">
            {{ scope.row.persona.municipio.nombre }}
          </template>
        </el-table-column>
        <el-table-column label="Desde">
          <template slot-scope="scope">
            {{ desde }}
          </template>
        </el-table-column>
        <el-table-column label="Hasta">
          <template slot-scope="scope">
            {{ hasta }}
          </template>
        </el-table-column>
        <el-table-column prop="address" label="Días">
          <template slot-scope="scope">
            {{ dias }}
          </template>
        </el-table-column>
        <el-table-column prop="address" label="Horas">
          <template slot-scope="scope">
            {{ horas }}
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
import moment from 'moment'
  export default {
    data() {
      return {
        remoteUsers: [],
        personProject: [],
        remoteClients: [],
        remoteProjects: [],
        remoteContacts: [],
        user: [],
        selectedUser: null,
        selectedClient: null,
        selectedProject: null,
        loadingRemote: false,
        selectedClientData: [],
        selectedProjectData: [],
        selectedProjectUser: [],
        items: [],
        desde: null,
        hasta: null,
        dias: null,
        horas: null
      }
    },
    watch: {
      "desde": function (n) {
        this.desde = moment(n).format("YYYY-MM-DD");
      },
      "hasta": function (n) {
        this.hasta = moment(n).format("YYYY-MM-DD");
      },
    },
    methods: {
      remoteUser(query) {
        if (query !== "" && query.length >= 2) {
          this.loadingRemote = true;
          http
            .get("api/users/", {
              params: {
                dato: query,
                sin_paginacion: true
              }
            })
            .then(res => {
              console.log(res.data.results.data);

              this.remoteUsers = res.data.results.data;
            })
            .catch(err => {
              this.remoteUsers = [];
            });
        } else {
          this.remoteUsers = [];
        }
      },
      remoteWorkerChange(val) {
        this.selectedUser = this.remoteUsers.find(item => {
          return item.id === val;
        });
        this.items.push(this.selectedUser)
      },
      remoteClient(query) {
        if (query !== "" && query.length >= 2) {
          http
            .get("api/empresas/", {
              params: {
                dato: query,
                sin_paginacion: true
              }
            })
            .then(res => {
              this.remoteClients = res.data.data;
              this.clie
            })
            .catch(err => {
              this.remoteClients = [];
            });
        } else {
          this.remoteClients = [];
        }
      },
      remoteClientChange(val) {
        this.selectedClientData = this.remoteClients.find(item => {
          return item.id === val;
        });
      },
      remoteProject(query) {
        if (query !== "" && query.length >= 2) {
          this.loadingRemote = true;
          http
            .get("api/proyectos/", {
              params: {
                dato: query,
                sin_paginacion: true
              }
            })
            .then(res => {
              this.remoteProjects = res.data.data;
            })
            .catch(err => {
              this.remoteProjects = [];
            });
        } else {
          this.remoteProjects = [];
        }
      },
      remoteProjectChange(val) {
        this.selectedProjectData = this.remoteProjects.find(item => {
          return item.id === val;
        });
      },
      saveProjectUser(){
        console.log("id user "+this.selectedUser.id);
        console.log("id proyecto "+ selectedProject.id);
        //console.log("id cargo "+selectedUser.cargo.id);
        http
            .post("api/proyectoUsuarios/", {
                usuario_id: this.selectedUser.id,
                proyecto_id: this.selectedProject.id,
                cargo_id: "7",
                desde: this.desde,
                hasta: this.hasta,
                horas: this.horas
            })
            .then(res => {
              this.$notify.success("Datos almacenados Correactamente");
              http
              .get("api/proyectoUsuarios/", {
                params: {
                    usuario_id: this.selectedUser.id,
                }
                }).then( response => {
                  this.personProject = response.results
                  this.selectedProjectUser = this.personProject.find(item => {
                    return item.usuario.id === this.selectedUser.id;
                  });
                })
              })
            .catch(err => {
              console.log(err);
              this.$notify.error("Problemas al guardar registro");
            });
      }
    },
  }

</script>
