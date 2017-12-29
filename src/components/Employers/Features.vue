<template>
  <div>
    <el-row class="m-bottom-1">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">Inicio</el-breadcrumb-item>
        <el-breadcrumb-item>Trabajadores</el-breadcrumb-item>
        <el-breadcrumb-item>Novedades en curso</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-row class="m-bottom-1">
      <p>Lista  De Trabajadores - Vista Asignación y Resultados.</p>
    </el-row>
    <el-row class="m-bottom-2">
      <el-col>
        <span>Por Cliente</span>
        <el-select
                v-model="selectedClientContact"
                filterable
                clearable
                remote
                reserve-keyword
                placeholder="Buscar"
                :remote-method="()=>{}"
                :loadingRemote="false">
          <el-option
                  v-for="item in []"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row class="m-bottom-3">
      <el-table
              :data="tableData"
              style="width: 100%">
        <el-table-column
                fixed
                prop="proyecto"
                label="Proyecto"
                width="180">
        </el-table-column>
        <el-table-column
                prop="colaborador"
                label="Colaborador (R.R H.H)"
                width="180">
        </el-table-column>
        <el-table-column
                prop="cargo"
                label="Cargo">
        </el-table-column>
        <el-table-column label="Asig">
          <el-table-column
                  label="%">
            <template slot-scope="scope">
              {{ scope.row.porcentaje }}%
            </template>
          </el-table-column>
          <el-table-column
                  width="120"
                  prop="hora_entrada"
                  label="Hora Ingreso">
          </el-table-column>
          <el-table-column
                  width="130"
                  prop="hora_de_entrada"
                  label="Hora de Ingreso">
          </el-table-column>
          <el-table-column
                  width="80"
                  prop="aviso"
                  label="Aviso">
          </el-table-column>
          <el-table-column
                  width="130"
                  prop="llegada_estimada"
                  label="Llegada Estimada">
          </el-table-column>
          <el-table-column
                  width="120"
                  prop="ausente"
                  label="Ausente">
          </el-table-column>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row>
      <el-table
              :data="tableData2"
              style="width: 100%">
        <el-table-column
                fixed
                prop="proyecto"
                label="Proyecto"
                width="180">
        </el-table-column>
        <el-table-column
                prop="colaborador"
                label="Colaborador (R.R H.H)"
                width="180">
        </el-table-column>
        <el-table-column
                prop="cargo"
                label="Cargo">
        </el-table-column>
        <el-table-column label="Asig">
          <el-table-column
                  label="%">
            <template slot-scope="scope">
              {{ scope.row.porcentaje }}%
            </template>
          </el-table-column>
          <el-table-column
                  width="120"
                  prop="hora_salida"
                  label="Hora Salida">
          </el-table-column>
          <el-table-column
                  width="130"
                  label="Hora de Salida">
          </el-table-column>
          <el-table-column
                  width="130"
                  prop="hh_ee"
                  label="HHEE Asignada">
          </el-table-column>
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
          selectedClientContact: null,
          tableData: [
              {proyecto: 'Mant Facturación', colaborador: 'Juan Gonzalez', cargo: 'AP', porcentaje: 100, hora_entrada: '09:00', hora_de_entrada: '09:02', aviso: '', llegada_estimada: '', ausente: ''},
              {proyecto: 'Mant Facturación', colaborador: 'Andres Martinez', cargo: 'AP', porcentaje: 50, hora_entrada: '09:00', hora_de_entrada: '08:55', aviso: '', llegada_estimada: '', ausente: ''},
              {proyecto: 'Portal Fase II', colaborador: 'Andres Martinez', cargo: 'AP', porcentaje: 50,	hora_entrada: '14:00', hora_de_entrada: '', aviso: '', llegada_estimada: '', ausente: ''},
              {proyecto: 'Mant Facturación', colaborador: 'Andres Araya', cargo: 'OP', porcentaje: 100,	hora_entrada: '09:00', hora_de_entrada: '', aviso: '+15', llegada_estimada: '', ausente: ''},
              {proyecto: 'Mant Facturación', colaborador: 'Javier Moras', cargo: 'OP', porcentaje: 100,	hora_entrada: '09:00', hora_de_entrada: '', aviso: '', llegada_estimada: '09:15', ausente: 'Médico'},
              {proyecto: 'Portal Fase II', colaborador: 'Juan Andres Ruiz', cargo: 'OP', porcentaje: 100, hora_entrada: '08:30', hora_de_entrada: '09:15', aviso: '+30', llegada_estimada: '', ausente: ''},
              {proyecto: 'Mant Facturación', colaborador: 'Carlos Parra', cargo: 'AP', porcentaje: 100, hora_entrada: '09:00', hora_de_entrada: '09:45', aviso: '+30', llegada_estimada: '09:20', ausente: ''},
              {proyecto: 'Portal Fase II', colaborador: 'Carlos Parra', cargo: 'AP', porcentaje: 100, hora_entrada: '08:30', hora_de_entrada: '', aviso: '', llegada_estimada: '09:35', ausente: ''},
              {proyecto: 'Portal Fase II', colaborador: 'Luis Tapia', cargo: 'JP', porcentaje: 100,	hora_entrada: '08:30', hora_de_entrada: '', aviso: '', llegada_estimada: '', ausente: ''},
              {proyecto: 'Mant Facturación', colaborador: 'Luis Tapia', cargo: 'JP', porcentaje: 100, hora_entrada: '09:00', hora_de_entrada: '', aviso: '', llegada_estimada: '', ausente: ''},
              {proyecto: 'Portal Fase II', colaborador: 'Roberto Muñoz', cargo: 'OP', porcentaje: 100, hora_entrada: '08:30', hora_de_entrada: '', aviso: '', llegada_estimada: '', ausente: ''},
              {proyecto: 'Mant Facturación', colaborador: 'Luis Tapia', cargo: 'JP', porcentaje: 100, hora_entrada: '09:00', hora_de_entrada: '', aviso: '', llegada_estimada: '', ausente: ''},
              {proyecto: 'ADITOOL', colaborador: 'Johann Bateman', cargo: 'OP', porcentaje: 100, hora_entrada: '08:45', hora_de_entrada: '', aviso: '', llegada_estimada: '', ausente: ''},
        ],
          tableData2: [
              {proyecto: 'Mant Facturación', colaborador: 'Juan Gonzalez', cargo: 'AP', porcentaje: 100, hora_salida: '09:00', hh_ee: '2', hora_de_entrada: '09:02', aviso: '', llegada_estimada: ''},
              {proyecto: 'Mant Facturación', colaborador: 'Andres Martinez', cargo: 'AP', porcentaje: 50, hora_salida: '09:00', hh_ee: '2', hora_de_entrada: '08:55', aviso: '', llegada_estimada: ''},
              {proyecto: 'Portal Fase II', colaborador: 'Andres Martinez', cargo: 'AP', porcentaje: 50,	hora_salida: '14:00', hh_ee: '2', hora_de_entrada: '', aviso: '', llegada_estimada: ''},
              {proyecto: 'Mant Facturación', colaborador: 'Andres Araya', cargo: 'OP', porcentaje: 100,	hora_salida: '09:00', hh_ee: '-', hora_de_entrada: '', aviso: '+15', llegada_estimada: ''},
              {proyecto: 'Mant Facturación', colaborador: 'Javier Moras', cargo: 'OP', porcentaje: 100,	hora_salida: '09:00', hh_ee: '-', hora_de_entrada: '', aviso: '', llegada_estimada: '09:15'},
              {proyecto: 'Portal Fase II', colaborador: 'Juan Andres Ruiz', cargo: 'OP', porcentaje: 100, hora_salida: '08:30', hh_ee: '-', hora_de_entrada: '09:15', aviso: '+30', llegada_estimada: ''},
              {proyecto: 'Mant Facturación', colaborador: 'Carlos Parra', cargo: 'AP', porcentaje: 100, hora_salida: '09:00', hh_ee: '-', hora_de_entrada: '09:45', aviso: '+30', llegada_estimada: '09:20'},
              {proyecto: 'Portal Fase II', colaborador: 'Carlos Parra', cargo: 'AP', porcentaje: 100, hora_salida: '08:30', hh_ee: '-', hora_de_entrada: '', aviso: '', llegada_estimada: '09:35'},
              {proyecto: 'Portal Fase II', colaborador: 'Luis Tapia', cargo: 'JP', porcentaje: 100,	hora_salida: '08:30', hh_ee: '-', hora_de_entrada: '', aviso: '', llegada_estimada: ''},
              {proyecto: 'Mant Facturación', colaborador: 'Luis Tapia', cargo: 'JP', porcentaje: 100, hora_salida: '09:00', hh_ee: '2', hora_de_entrada: '', aviso: '', llegada_estimada: ''},
              {proyecto: 'Portal Fase II', colaborador: 'Roberto Muñoz', cargo: 'OP', porcentaje: 100, hora_salida: '08:30', hh_ee: '2', hora_de_entrada: '', aviso: '', llegada_estimada: ''},
              {proyecto: 'Mant Facturación', colaborador: 'Luis Tapia', cargo: 'JP', porcentaje: 100, hora_salida: '09:00', hh_ee: '2', hora_de_entrada: '', aviso: '', llegada_estimada: ''},
              {proyecto: 'ADITOOL', colaborador: 'Johann Bateman', cargo: 'OP', porcentaje: 100, hora_salida: '08:45', hh_ee: '2', hora_de_entrada: '', aviso: '', llegada_estimada: ''},
          ],
    }
  }
}
</script>