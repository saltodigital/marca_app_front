<template>
  <div>
    <el-row class="m-bottom-1">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">Inicio</el-breadcrumb-item>
        <el-breadcrumb-item>Proyectos</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-row class="m-bottom-1">
      <p>Vista Por Cliente - Identifica Proyectos, Configuración Horaria y Recursos Asignados.</p>
    </el-row>
    <el-row>
      <el-table
              :data="tableData"
              style="width: 100%">
        <el-table-column
                fixed
                prop="cliente"
                label="Cliente"
                width="180">
        </el-table-column>
        <el-table-column
                prop="proyectos"
                label="Proyectos"
                width="180">
        </el-table-column>
        <el-table-column
                width="160"
                prop="contacto"
                label="Contacto">
        </el-table-column>
        <el-table-column
                width="160"
                prop="direccion"
                label="Dirección">
        </el-table-column>
        <el-table-column
                width="100"
                prop="ciudad"
                label="Ciudad">
        </el-table-column>
        <el-table-column
                width="100"
                prop="provincia"
                label="Provincia">
        </el-table-column>
        <el-table-column
                width="100"
                prop="pais"
                label="País">
        </el-table-column>
        <el-table-column label="Hoy">
          <el-table-column
                  width="120"
                  prop="trabajadores"
                  label="Trabajadores">
          </el-table-column>
          <el-table-column
                  width="120"
                  label="Puntualidad">
            <template slot-scope="scope">
              <span class="score score-red" v-if="scope.row.puntualidad < 90"></span>
              <span class="score score-yellow" v-else-if="scope.row.puntualidad >= 90 && scope.row.puntualidad < 100"></span>
              <span class="score score-green" v-else=""></span>
              {{ scope.row.puntualidad }}%
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="Mensual en curso">
          <el-table-column
                  width="120"
                  prop="trabajadores2"
                  label="Trabajadores">
          </el-table-column>
          <el-table-column
                  width="120"
                  label="Puntualidad">
            <template slot-scope="scope">
              <span class="score score-red" v-if="scope.row.puntualidad2 < 90"></span>
              <span class="score score-yellow" v-else-if="scope.row.puntualidad2 >= 90 && scope.row.puntualidad2 < 100"></span>
              <span class="score score-green" v-else=""></span>
              {{ scope.row.puntualidad2 }}%
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column
                width="160"
                prop="supervisor"
                label="Supervisor">
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
              cliente: 'P001 Falabella',
              proyectos: 'Modificaciones al WS de Alta cuenta y cliente',
              contacto: 'Alfredo Perez',
              direccion: 'Rosas # 1850',
              ciudad: 'Santiago',
              provincia: 'Santiago',
              pais: 'Chile',
              trabajadores: '22',
              puntualidad: '75',
              trabajadores2: '22',
              puntualidad2: '75',
              supervisor: 'JBerrios',
          }, {
              cliente: 'P001 Falabella',
              proyectos: 'Modificaciones al WS de Alta cuenta y cliente',
              contacto: 'Alfredo Perez',
              direccion: 'Rosas # 1850',
              ciudad: 'Santiago',
              provincia: 'Santiago',
              pais: 'Chile',
              trabajadores: '22',
              puntualidad: '92',
              trabajadores2: '22',
              puntualidad2: '75',
              supervisor: 'JBerrios',
          }, {
              cliente: 'P001 Falabella',
              proyectos: 'Modificaciones al WS de Alta cuenta y cliente',
              contacto: 'Alfredo Perez',
              direccion: 'Rosas # 1850',
              ciudad: 'Santiago',
              provincia: 'Santiago',
              pais: 'Chile',
              trabajadores: '22',
              puntualidad: '100',
              trabajadores2: '22',
              puntualidad2: '75',
              supervisor: 'JBerrios',
          }, {
              cliente: 'P001 Falabella',
              proyectos: 'Modificaciones al WS de Alta cuenta y cliente',
              contacto: 'Alfredo Perez',
              direccion: 'Rosas # 1850',
              ciudad: 'Santiago',
              provincia: 'Santiago',
              pais: 'Chile',
              trabajadores: '22',
              puntualidad: '75',
              trabajadores2: '22',
              puntualidad2: '75',
              supervisor: 'JBerrios',
          }, {
              cliente: 'P001 Falabella',
              proyectos: 'Modificaciones al WS de Alta cuenta y cliente',
              contacto: 'Alfredo Perez',
              direccion: 'Rosas # 1850',
              ciudad: 'Santiago',
              provincia: 'Santiago',
              pais: 'Chile',
              trabajadores: '22',
              puntualidad: '75',
              trabajadores2: '22',
              puntualidad2: '75',
              supervisor: 'JBerrios',
          }, {
              cliente: 'P001 Falabella',
              proyectos: 'Modificaciones al WS de Alta cuenta y cliente',
              contacto: 'Alfredo Perez',
              direccion: 'Rosas # 1850',
              ciudad: 'Santiago',
              provincia: 'Santiago',
              pais: 'Chile',
              trabajadores: '22',
              puntualidad: '75',
              trabajadores2: '22',
              puntualidad2: '75',
              supervisor: 'JBerrios',
          }, {
              cliente: 'P001 Falabella',
              proyectos: 'Modificaciones al WS de Alta cuenta y cliente',
              contacto: 'Alfredo Perez',
              direccion: 'Rosas # 1850',
              ciudad: 'Santiago',
              provincia: 'Santiago',
              pais: 'Chile',
              trabajadores: '22',
              puntualidad: '75',
              trabajadores2: '22',
              puntualidad2: '75',
              supervisor: 'JBerrios',
          }, {
              cliente: 'P001 Falabella',
              proyectos: 'Modificaciones al WS de Alta cuenta y cliente',
              contacto: 'Alfredo Perez',
              direccion: 'Rosas # 1850',
              ciudad: 'Santiago',
              provincia: 'Santiago',
              pais: 'Chile',
              trabajadores: '22',
              puntualidad: '75',
              trabajadores2: '22',
              puntualidad2: '75',
              supervisor: 'JBerrios',
          }, {
              cliente: 'P001 Falabella',
              proyectos: 'Modificaciones al WS de Alta cuenta y cliente',
              contacto: 'Alfredo Perez',
              direccion: 'Rosas # 1850',
              ciudad: 'Santiago',
              provincia: 'Santiago',
              pais: 'Chile',
              trabajadores: '22',
              puntualidad: '75',
              trabajadores2: '22',
              puntualidad2: '75',
              supervisor: 'JBerrios',
          }]

    }
  }
}
</script>