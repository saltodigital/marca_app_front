<template>
  <div>
    <el-row class="m-bottom-1">
      <h3>Asignación de Colaboradores.</h3>
    </el-row>
    <el-row class="m-bottom-1">
      Buscar colaborador
      <el-col :xs="24" :sm="12">
        <el-select v-model="selectedUser" filterable clearable remote reserve-keyword placeholder="Buscar" @change="remoteWorkerChange"
          :remote-method="remoteUser" >
          <el-option v-for="item in remoteUsers" :key="item.id" :label="item.first_name + ' ' + item.last_name" :value="item.id">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row>
      <el-table style="width: 100%">
        <el-table-column prop="date" label="Colaborador" width="180">
        </el-table-column>
        <el-table-column prop="name" label="Rol" width="180">
        </el-table-column>
        <el-table-column prop="address" label="Cliente">
        </el-table-column>
        <el-table-column prop="address" label="Proyecto">
        </el-table-column>
        <el-table-column prop="address" label="Dirección">
        </el-table-column>
        <el-table-column prop="address" label="Ciudad/País">
        </el-table-column>
        <el-table-column prop="address" label="Desde">
        </el-table-column>
        <el-table-column prop="address" label="Hasta">
        </el-table-column>
        <el-table-column prop="address" label="Días">
        </el-table-column>
        <el-table-column prop="address" label="Horas">
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
  </div>
</template>

<script>
  export default {
    data() {
      return {
        remoteUsers: [],
        user: [],
        selectedUser: null,
        loadingRemote: false
      }
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
      },
    },
  }

</script>
