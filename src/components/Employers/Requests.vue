<template>
  <div>
    <el-row class="m-bottom-1">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">Inicio</el-breadcrumb-item>
        <el-breadcrumb-item>Trabajadores</el-breadcrumb-item>
        <el-breadcrumb-item>Solicitudes</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-row class="m-bottom-1">
      <p>Solicitudes de trabajadores.</p>
    </el-row>
    <el-row>
      <el-table
              :data="tableData"
              style="width: 100%">
        <el-table-column
                fixed
                prop="solicitud"
                label="Solicitud"
                width="180">
        </el-table-column>
        <el-table-column
                prop="estado"
                label="Estado"
                width="180">
        </el-table-column>
        <el-table-column
                width="160"
                prop="desde"
                label="Desde">
        </el-table-column>
        <el-table-column
                width="160"
                prop="hasta"
                label="Hasta">
        </el-table-column>
        <el-table-column
                width="100"
                prop="dias"
                label="Días">
        </el-table-column>
        <el-table-column
                width="100"
                prop="horas"
                label="Horas">
        </el-table-column>
        <el-table-column
                width="100"
                label="Apr">
          <template slot-scope="scope">
            <i class="fa fa-check text-success"></i>
          </template>
        </el-table-column>
        <el-table-column
                width="100"
                prop="supervisor"
                label="Supervisor">
        </el-table-column>
        <el-table-column
                width="100"
                label="Apr">
          <template slot-scope="scope">
            <i class="fa fa-check text-success"></i>
          </template>
        </el-table-column>
        <el-table-column
                width="100"
                prop="aprueba"
                label="Aprueba">
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
export default {
    mounted(){
    },
    data () {
      return {
          tableData: [{
              solicitud: 'Feriado Legal',
              estado: 'Pendiente',
              desde: '07-08-2017',
              hasta: '07-09-2017',
              dias: '10 Días',
              horas: '4 horas',
              aprobado: true,
              supervisor: 'jberrios',
              aprobado2: true,
              aprueba: 'Hperez'
          }, {
              solicitud: 'Feriado Legal',
              estado: 'Pendiente',
              desde: '07-08-2017',
              hasta: '07-09-2017',
              dias: '10 Días',
              horas: '4 horas',
              aprobado: true,
              supervisor: 'jberrios',
              aprobado2: true,
              aprueba: 'Hperez'
          }, {
              solicitud: 'Feriado Legal',
              estado: 'Pendiente',
              desde: '07-08-2017',
              hasta: '07-09-2017',
              dias: '10 Días',
              horas: '4 horas',
              aprobado: true,
              supervisor: 'jberrios',
              aprobado2: true,
              aprueba: 'Hperez'
          }, {
              solicitud: 'Feriado Legal',
              estado: 'Pendiente',
              desde: '07-08-2017',
              hasta: '07-09-2017',
              dias: '10 Días',
              horas: '4 horas',
              aprobado: true,
              supervisor: 'jberrios',
              aprobado2: true,
              aprueba: 'Hperez'
          }, {
              solicitud: 'Feriado Legal',
              estado: 'Pendiente',
              desde: '07-08-2017',
              hasta: '07-09-2017',
              dias: '10 Días',
              horas: '4 horas',
              aprobado: true,
              supervisor: 'jberrios',
              aprobado2: true,
              aprueba: 'Hperez'
          }, {
              solicitud: 'Feriado Legal',
              estado: 'Pendiente',
              desde: '07-08-2017',
              hasta: '07-09-2017',
              dias: '10 Días',
              horas: '4 horas',
              aprobado: true,
              supervisor: 'jberrios',
              aprobado2: true,
              aprueba: 'Hperez'
          }, {
              solicitud: 'Feriado Legal',
              estado: 'Pendiente',
              desde: '07-08-2017',
              hasta: '07-09-2017',
              dias: '10 Días',
              horas: '4 horas',
              aprobado: true,
              supervisor: 'jberrios',
              aprobado2: true,
              aprueba: 'Hperez'
          }, {
              solicitud: 'Feriado Legal',
              estado: 'Pendiente',
              desde: '07-08-2017',
              hasta: '07-09-2017',
              dias: '10 Días',
              horas: '4 horas',
              aprobado: true,
              supervisor: 'jberrios',
              aprobado2: true,
              aprueba: 'Hperez'
          }, {
              solicitud: 'Feriado Legal',
              estado: 'Pendiente',
              desde: '07-08-2017',
              hasta: '07-09-2017',
              dias: '10 Días',
              horas: '4 horas',
              aprobado: true,
              supervisor: 'jberrios',
              aprobado2: true,
              aprueba: 'Hperez'
          }]

    }
  }
}
</script>