<template>
  <div>
    <el-row class="m-bottom-1">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">Inicio</el-breadcrumb-item>
        <el-breadcrumb-item>Novedades en curso</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-row class="m-bottom-1">
      <p>Vista por novedades en curso</p>
    </el-row>
    <el-row class="m-bottom-1">
      <el-col :xs="24" :sm="12">
        <el-input v-model="pagination.search" placeholder="Buscar..." @keyup.enter.native="handleKeyUp" size="small">
          <el-button slot="append"  @click="getData">Buscar</el-button>
        </el-input>
      </el-col>
      <el-col style="display: none" :xs="24" :sm="12" class="text-right">
        <el-button type="primary" @click="handleNew">Nuevo</el-button>
      </el-col>
    </el-row>
    <el-row class="m-bottom-2">
      <el-card>
        <el-table v-loading="loading" :data="items" style="width: 100%">
          <el-table-column fixed label="Gerencia" width="180">
            <template slot-scope="scope">
              {{ scope.row.gerencia }}
            </template>
          </el-table-column>
          <el-table-column label="Supervisor" width="180">
            <template slot-scope="scope">
              <template slot-scope="scope">
              {{ scope.row.supervisor }}
            </template>
            </template>
          </el-table-column>
          <el-table-column width="160" label="Cliente">
            <template slot-scope="scope">
              -
            </template>
          </el-table-column>

           <el-table-column width="160" label="Proyecto">
            <template slot-scope="scope">
              {{ scope.row.proyecto }}
            </template>
          </el-table-column>

          <el-table-column width="160" label="Trabajador">
            <template slot-scope="scope">
              {{ scope.row.trabajador }}
            </template>
          </el-table-column>
          
          
            <el-table-column width="160" label="Cargo">
            <template slot-scope="scope">
               {{ scope.row.cargo }}
            </template>
          </el-table-column>
          <el-table-column width="160" label="% Asig">
            <template slot-scope="scope">
              -
            </template>
          </el-table-column>

          <el-table-column width="160" label="Hora ingreso">
            <template slot-scope="scope">
               {{ scope.row.hora_ingreso }}
            </template>
          </el-table-column>
          <el-table-column width="160" label="Marca ingreso">
            <template slot-scope="scope">
               {{ scope.row.marca_ingreso }}
            </template>
          </el-table-column>

          <el-table-column width="160" label="Envia aviso">
            <template slot-scope="scope">
              -
            </template>
          </el-table-column>
          <el-table-column width="160" label="Llegada estimada">
            <template slot-scope="scope">
              {{ scope.row.llegada_estimada }}
            </template>
          </el-table-column>

          <el-table-column width="160" label="Envia ausencia">
            <template slot-scope="scope">
               {{ scope.row.envia_ausencia }}
            </template>
          </el-table-column>
          <el-table-column width="160" label="SF">
            <template slot-scope="scope">
               
                <span class="score score-red" v-if="scope.row.sf  >= 99"></span>
                <span class="score score-yellow" v-else-if="scope.row.sf >= 45 && scope.row.sf <= 60"></span>
                <span class="score score-green" v-else=""></span>
                 {{ scope.row.sf }}
            </template>
          </el-table-column>

          <br>

          <el-table-column width="160" label="Hora Salida">
            <template slot-scope="scope">
              -
            </template>
          </el-table-column>
          <el-table-column width="160" label="Hora de Egreso">
            <template slot-scope="scope">
              -
            </template>
          </el-table-column>

          <el-table-column width="160" label="HHEE Asignada">
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
        .get("api/listaDeNovedades/", {
          params: {
            page: this.pagination.currentPage,
            dato: this.pagination.search
          }
        })
        .then(res => {
          this.items = res.data.data;

         console.log(res.data.data);

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
        name: "projectsAddProject"
      });
    }
  }
};
</script>

