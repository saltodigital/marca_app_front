<template>
  <div>
    <el-row class="m-bottom-1">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">Inicio</el-breadcrumb-item>
        <el-breadcrumb-item>Configuraciones</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/config/locations/'}">Países</el-breadcrumb-item>
        <el-breadcrumb-item>{{ country.nombre ? 'Regiones de ' + country.nombre : '' }}</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-row class="m-bottom-1">
      <p>Administración de regiones.</p>
    </el-row>
    <el-row class="m-bottom-1">
      <el-col :xs="24" :sm="12">
        <el-input v-model="pagination.search" placeholder="Buscar..." @keyup.enter.native="handleKeyUp" size="small">
          <el-button slot="append" icon="el-icon-search" @click="getData"></el-button>
        </el-input>
      </el-col>
      <el-col :xs="24" :sm="12" class="text-right">
        <el-button type="primary" size="small" @click="handleNew">Nuevo</el-button>
        <el-dialog
                :title="action === 'new' ? 'Nueva Región' : 'Editar región'"
                :visible.sync="visibleDialog"
                @close="handleCloseDialog"
                width="30%"
                center>
          <el-form @submit.prevent.native="handleSave" :model="item" :rules="itemRules" label-position="top" ref="itemForm">
            <el-form-item prop="nombre" label="Nombre de la región" class="fluid-width">
              <el-input v-model="item.nombre"></el-input>
            </el-form-item>
            <el-button :loading="loadingSave" type="primary" @click="handleSave">Guardar</el-button>
          </el-form>
        </el-dialog>
        <el-dialog
                title="Confirmar borrado"
                :visible.sync="visibleDialogConfirm"
                center
                width="30%">
          <span slot="footer" class="dialog-footer">
            <el-button :loading="loadingSave" size="mini" @click="visibleDialogConfirm = false">Cancelar</el-button>
            <el-button :loading="loadingSave" size="mini" type="danger" @click="deleteItem">Eliminar</el-button>
          </span>
        </el-dialog>
      </el-col>
    </el-row>
    <el-row class="m-bottom-1">
      <el-table
              v-loading="loading"
              :data="dataTable">
        <el-table-column
                label="Nombre">
          <template slot-scope="scope">
            <router-link :to="{ name: 'municipalities', params: { id: scope.row.id }}">
              {{ scope.row.nombre }}
            </router-link>
          </template>
        </el-table-column>
        <el-table-column
                label="Operaciones">
          <template slot-scope="scope">
            <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)">Editar</el-button>
            <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">Eliminar</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row>
      <el-col>
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="pagination.currentPage"
                :page-sizes="[10, 20, 30]"
                :page-size="pagination.perPage"
                layout="total, prev, pager, next"
                :total="pagination.total">
        </el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
    mounted(){
        this.getCountry();
        this.getData();
    },
    data () {
      return {
          dataTable: [],
          loading: false,
          loadingSave: false,
          visibleDialog: false,
          visibleDialogConfirm: false,
          action: 'new',
          item: {
              id: null,
              nombre: '',
              pais_id: this.$route.params.id
          },
          itemRules: {
              nombre: [
                  {required: true, message: 'Debes ingresar un nombre para la región'}
              ]
          },
          pagination: {
              currentPage: 1,
              perPage: 10,
              total: 0,
              next: null,
              prev: null,
              search: ''
          },
          selectedId: null,

          country: {
              nombre: ''
          }
    }
  },
  methods: {
        getCountry(){
          http.get('api/pais/' + this.$route.params.id + '/').then(res=>{
              this.country = res.data.data;
          });
        },
        getData(){
            this.loading = true;
            http.get('api/regiones/', {
                params: {
                    page: this.pagination.currentPage,
                    dato: this.pagination.search,
                    id_pais: this.$route.params.id
                }
            }).then(res=>{
                this.pagination.next = res.data.next;
                this.pagination.prev = res.data.previuos;
                this.pagination.total = res.data.count;

                this.dataTable = res.data.results.data;
                this.loading = false;
            }).catch(err=>{
                this.loading = false;
            });
        },
        handleNew(){
            this.visibleDialog = true;
        },
        handleEdit(index, row) {
            this.action = 'edit';
            this.item = {
              id: row.id,
              nombre: row.nombre,
              validaRut: row.validaRut
            };
            this.visibleDialog = true;
        },
        handleDelete(index, row) {
            this.visibleDialogConfirm = true;
            this.selectedId = row.id;
        },
        handleCloseDialog(){
            this.item = {
                id: null,
                nombre: ''
            };
            this.action = 'new';
            this.$refs.itemForm.resetFields();
        },
        handleSave(){
            this.$refs.itemForm.validate(valid=>{
                this.item.pais_id = this.$route.params.id;
               if(valid){
                   this.loadingSave = true;
                   if(this.action === 'new'){
                       http.post('api/regiones/', this.item).then(res=>{
                           this.loadingSave = false;
                           this.getData();
                           this.visibleDialog = false;
                       }).catch(err=>{
                           this.loadingSave = false;
                           this.$notify.error({message: 'Complete los campos requeridos'});
                       });
                   }else if(this.action === 'edit'){
                       http.put('api/regiones/'+this.item.id+'/', this.item).then(res=>{
                           this.loadingSave = false;
                           this.getData();
                           this.visibleDialog = false;
                       }).catch(err=>{
                           this.loadingSave = false;
                           this.$notify.error({message: 'Complete los campos requeridos'});
                       });
                   }
               }
            });
        },
        handleSizeChange(val) {
            this.pagination.perPage = val;
            this.getData();
        },
        handleCurrentChange(val) {
            this.pagination.currentPage = val;
            this.getData();
        },
        handleKeyUp(event){
            if(this.pagination.search.length >= 3 || this.pagination.search.length === 0){
                this.getData();
            }
        },
        deleteItem(){
            this.loadingSave = true;
            http.delete('api/regiones/' + this.selectedId + '/').then(res=>{
                this.getData();
                this.loadingSave = false;
                this.visibleDialogConfirm = false;
            }).catch(()=>{
                this.loadingSave = false;
                this.visibleDialogConfirm = false;
                this.$notify.error({message: 'No fue posible eliminar la región seleccionada'});
            })
        }
  }
}
</script>