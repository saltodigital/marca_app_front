<template>
  <div>
    <el-row class="m-bottom-1">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">Inicio</el-breadcrumb-item>
        <el-breadcrumb-item>Configuraciones</el-breadcrumb-item>
        <el-breadcrumb-item>Cargos</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-row class="m-bottom-1">
      <p>Administración de cargos para los empleados.</p>
    </el-row>
    <el-row>
      <el-table
              v-loading="loading"
              :data="dataTable">
        <el-table-column
                prop="nombre"
                label="Nombre">
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
export default {
    mounted(){
        this.getPositions();
    },
    data () {
      return {
          dataTable: [],
          loading: false,
          loadingSave: false,
          visibleDialog: false,
          action: 'new',
          item: {
              id: null,
              nombre: '',
              nivel : '1'
          },
          itemRules: {
              nombre: [
                  {required: true, message: 'Debes ingresar un nombre para el cargo'}
              ],
              nivel: [
                  {required: true, message: 'Selecciona un nivel'}
              ]
          },
          itemErrors: {}
    }
  },
  methods: {
        getPositions(){
            this.loading = true;
            http.get('api/cargos/').then(res=>{
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
              nombre: row.nombre
            };
            this.visibleDialog = true;
        },
        handleDelete(index, row) {
          console.log(index, row);
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
               if(valid){
                   this.loadingSave = true;
                   if(this.action === 'new'){
                       http.post('api/cargos/', this.item).then(res=>{
                           this.loadingSave = false;
                           this.visibleDialog = false;
                           this.getPositions();
                       }).catch(err=>{
                           console.log(err);
                           this.itemErrors = err.response.data;
                           this.loadingSave = false;
                           this.$notify.error({message: 'Complete los campos requeridos'});
                       });
                   }else if(this.action === 'edit'){

                   }
               }
            });
        }
  }
}
</script>