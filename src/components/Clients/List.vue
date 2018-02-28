<template>
  <div>
    <el-row class="m-bottom-1">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">Inicio</el-breadcrumb-item>
        <el-breadcrumb-item>Clientes</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-row class="m-bottom-1">
      <p>Vista Por Cliente - Identifica Proyectos, Configuración Horaria y Recursos Asignados.</p>
    </el-row>
    <el-row class="m-bottom-1">
      <el-col :xs="24" :sm="12">
        <el-input v-model="pagination.search" placeholder="Buscar..." @keyup.enter.native="handleKeyUp">
          <el-button slot="append" @click="getData">Buscar</el-button>
        </el-input>
      </el-col>
      <el-col :xs="24" :sm="12" class="text-right">
        <el-button type="primary" icon="el-icon-plus" @click="handleNew">Nuevo</el-button>
      </el-col>
    </el-row>
    <el-row class="m-bottom-2">
      <el-card>
        <el-table v-loading="loading" :data="items" style="width: 100%">
          <el-table-column fixed label="Cliente" width="380">
            <template slot-scope="scope">
              <router-link :to="{ name: 'clientsDetail', params: { id: scope.row.id }}">
                {{ scope.row.nombre }}
              </router-link>
            </template>
          </el-table-column>
          <el-table-column label="Número de Proyectos" width="200">
            <template slot-scope="scope">
              -
            </template>
          </el-table-column>
          <el-table-column label="Hoy">
            <el-table-column width="120" label="Trabajadores">
              <template slot-scope="scope">
                12
              </template>
            </el-table-column>
            <el-table-column width="120" label="Puntualidad">
              <template slot-scope="scope">
                <span class="score score-red" v-if="scope.row.puntualidad < 90"></span>
                <span class="score score-yellow" v-else-if="scope.row.puntualidad >= 90 && scope.row.puntualidad < 100"></span>
                <span class="score score-green" v-else=""></span>
                96%
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="Mensual en curso">
            <el-table-column width="120" label="Trabajadores">
              <template slot-scope="scope">
                23
              </template>
            </el-table-column>
            <el-table-column width="120" label="Puntualidad">
              <template slot-scope="scope">
                <span class="score score-red" v-if="scope.row.puntualidad2 < 90"></span>
                <span class="score score-yellow" v-else-if="scope.row.puntualidad2 >= 90 && scope.row.puntualidad2 < 100"></span>
                <span class="score score-green" v-else=""></span>
                98%
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column width="250" label="Supervisor">
            <template slot-scope="scope">
              -
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-row>
    <el-row>
      <el-col>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pagination.currentPage"
          :page-sizes="[15, 20, 30]" :page-size="pagination.perPage" layout="total, prev, pager, next" :total="pagination.total">
        </el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      loading: false,
      pagination: {
        currentPage: 1,
        perPage: 15,
        total: 0,
        next: null,
        prev: null,
        search: ""
      }
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.loading = true;
      http
        .get("api/empresas/", {
          params: {
            page: this.pagination.currentPage,
            dato: this.pagination.search
          }
        })
        .then(res => {
          this.items = res.data.results.data;

          this.pagination.next = res.data.next;
          this.pagination.prev = res.data.previuos;
          this.pagination.total = res.data.count;

          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
        });
    },
    handleKeyUp() {
      if (
        this.pagination.search.length >= 3 ||
        this.pagination.search.length === 0
      ) {
        this.getData();
      }
    },
    handleSizeChange(val) {
      this.pagination.perPage = val;
      this.getData();
    },
    handleCurrentChange(val) {
      this.pagination.currentPage = val;
      this.getData();
    },
    handleNew() {
      this.$router.push({
        name: "clientsAddEmpresa"
      });
    }
  }
};
</script>
