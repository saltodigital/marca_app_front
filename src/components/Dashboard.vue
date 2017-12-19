<template>
  <div>
    <el-row class="m-bottom-2">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>Tablero</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-row>
      <el-table
              :data="tableData"
              style="width: 100%">
        <el-table-column
                prop="date"
                label="Fecha"
                width="180">
        </el-table-column>
        <el-table-column
                prop="name"
                label="Nombre"
                width="180">
        </el-table-column>
        <el-table-column
                prop="address"
                label="Dirección">
        </el-table-column>
      </el-table>
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
          tableData: [{
              date: '2016-05-03',
              name: 'Tom',
              address: 'No. 189, Grove St, Los Angeles'
          }, {
              date: '2016-05-02',
              name: 'Tom',
              address: 'No. 189, Grove St, Los Angeles'
          }, {
              date: '2016-05-04',
              name: 'Tom',
              address: 'No. 189, Grove St, Los Angeles'
          }, {
              date: '2016-05-01',
              name: 'Tom',
              address: 'No. 189, Grove St, Los Angeles'
          }]
      }
  }
}
</script>