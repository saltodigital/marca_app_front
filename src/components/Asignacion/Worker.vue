<template>
  <div>
    <el-row class="m-bottom-1">
      <h3>Asignación de Colaboradores.</h3>
    </el-row>
    <el-row :gutter="20" class="m-bottom-2">
      <el-card class="p-bottom-2">
        <el-form label-position="top" :model="assignment" :rules="assignmentRules"  ref="formAssignment">
          <el-col :xs="24" :sm="6">
            <el-form-item label="Colaborador" class="fluid-width" prop="user">
              <el-select v-model="assignment.user" filterable clearable remote reserve-keyword placeholder="Buscar" @change="remoteWorkerChange"
                :remote-method="remoteUser" >
                <el-option v-for="item in remoteUsers" :key="item.id" :label="item.first_name + ' ' + item.last_name" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
<!--           <el-col :xs="24" :sm="6">
            <el-form-item label="Buscar Cliente" class="fluid-width" prop="client">
              <el-select v-model="assignment.client" filterable clearable remote reserve-keyword placeholder="Buscar" @change="remoteClientChange"
                :remote-method="remoteClient" :loadingRemote="loadingRemote" :disabled="!assignment.user">
                <el-option v-for="item in remoteClients" :key="item.id" :label="item.nombre" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col> -->
          <el-col :xs="24" :sm="6">
            <el-form-item label="Cargo" class="fluid-width" prop="position">
                <el-select filterable v-model="assignment.position">
                  <el-option
                    v-for="item in remotePositions"
                    :key="item.id"
                    :label="item.nombre"
                    :value="item.id">
                  </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="6">
            <el-form-item label="Buscar Proyecto" class="fluid-width" prop="project">
              <el-select v-model="assignment.project" filterable clearable remote reserve-keyword placeholder="Buscar" @change="remoteProjectChange"
                :remote-method="remoteProject" :loadingRemote="loadingRemote">
                <el-option v-for="item in remoteProjects" :key="item.id" :label="item.nombre" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="6">
            <el-form-item label="Desde" class="fluid-width" prop="from">
              <el-date-picker
                v-model="assignment.from"
                format="dd-MM-yyyy"
                type="date"
                placeholder="Desde">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="6">
            <el-form-item label="Hasta" class="fluid-width" prop="to">
              <el-date-picker
                v-model="assignment.to"
                format="dd-MM-yyyy"
                type="date"
                placeholder="Hasta">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="6">
            <el-form-item label="Días" class="fluid-width" prop="days">
              <el-input
                v-model="assignment.days">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="6">
            <el-form-item label="Horas" class="fluid-width" prop="hours">
              <el-input
                v-model="assignment.hours">
              </el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </el-card>
    </el-row>
    <el-row class="m-bottom-2">
      <el-col>
        <el-button type="primary" class="float-right" @click="saveProjectUser" >Asignar</el-button>
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
        remotePositions: [],
        user: [],
        selectedUser: null,
        selectedClient: null,
        selectedProject: null,
        loadingRemote: false,
        selectedClientData: [],
        selectedProjectData: [],
        selectedProjectUser: [],
        assignmentRules: {
          user: [{ required: true, message: "Campo requerido" }],
          position: [{ required: true, message: "Campo requerido" }],
          project: [{ required: true, message: "Campo requerido" }],
          from: [{ required: true, message: "Campo requerido" }],
          to: [{ required: true, message: "Campo requerido" }],
          days: [{ required: true, message: "Campo requerido" }],
          hours: [{ required: true, message: "Campo requerido" }],
        },
        assignment: {
          user: '',
          position: '',
          project: '',
          from: '',
          to: '',
          days: '',
          hours: ''
        },
        items: [],
        desde: null,
        hasta: null,
        dias: null,
        horas: null
      }
    },
    mounted() {
      this.getPositions();
    },
    watch: {
      "desde": function (n) {
        this.assignment.from = moment(n).format("YYYY-MM-DD");
      },
      "hasta": function (n) {
        this.assignment.to = moment(n).format("YYYY-MM-DD");
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
        this.assignment.user = this.remoteUsers.find(item => {
          return item.id === val;
        });
        this.items.push(this.assignment.user)
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
            })
            .catch(err => {
              this.remoteClients = [];
            });
        } else {
          this.remoteClients = [];
        }
      },
      remoteClientChange(val) {
        this.assignment.client = this.remoteClients.find(item => {
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
        this.assignment.project = this.remoteProjects.find(item => {
          return item.id === val;
        });
      },
      getPositions () {
        http
          .get("api/cargos/", {
            params: {
              sin_paginacion: true
            }
          })
          .then(res => {
            this.remotePositions = res.data.data;
          })
          .catch(err => {
            this.remoteProjects = [];
          });
      },
      saveProjectUser () {
        this.$refs.formAssignment.validate(valid => {
          if (valid) {
            http
              .post("api/proyectoUsuarios/", {
                  usuario_id: this.assignment.user.id,
                  proyecto_id: this.assignment.project.id,
                  cargo_id: this.assignment.position,
                  desde: moment(this.assignment.from).format('YYYY-MM-DD'),
                  hasta: moment(this.assignment.to).format('YYYY-MM-DD'),
                  horas: this.assignment.hours
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
                this.$notify.error(err.response.data.message);
              });
          }
        })
      }
    },
  }

</script>
