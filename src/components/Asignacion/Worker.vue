<template>
  <div>
    <el-row class="m-bottom-1">
      <h3>Asignación de Colaboradores.</h3>
    </el-row>
    <el-row class="m-bottom-1">
      Buscar colaborador
      <el-col :xs="24" :sm="12">
        <el-input>
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
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

  }

</script>
