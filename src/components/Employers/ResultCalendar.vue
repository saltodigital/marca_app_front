<template>
  <div>
    <el-row class="m-bottom-1">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">Inicio</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/employees'}">Trabajadores</el-breadcrumb-item>
        <el-breadcrumb-item>Resultado en Calendario</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-row class="m-bottom-1">
      <p>Lista  De Trabajadores - Vista Asignación y Resultados.</p>
    </el-row>
    <el-row class="m-bottom-2" :gutter="30">
      <el-col :xs="24" :sm="6">
        <span>Por Cliente</span>
        <br><br>
        <el-select
                class="fluid-width"
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
      <el-col :xs="24" :sm="6">
        <span>Por Proyecto</span>
        <br><br>
        <el-select
                class="fluid-width"
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
      <el-col :xs="24" :sm="6">
        <span>Por Trabajador</span>
        <br><br>
        <el-select
                class="fluid-width"
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
      <el-col :xs="24" :sm="6">
        <span>Por Responsable</span>
        <br><br>
        <el-select
                class="fluid-width"
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
    <el-row class="m-bottom-2">
      <el-checkbox-group size="small" v-model="option" class="float-right">
        <el-checkbox-button v-for="option in options" :value="option.value" :label="option.label" :key="option.value">{{option.label}}</el-checkbox-button>
      </el-checkbox-group>
    </el-row>
    <el-row class="m-bottom-3">
      <el-table
              :data="tableData"
              style="width: 100%">
        <el-table-column
                fixed
                prop="colaborador"
                label="Nombre QA"
                width="180">
        </el-table-column>
        <el-table-column
                prop="proyecto"
                label="Nombre Proyecto"
                width="180">
        </el-table-column>
        <el-table-column
                prop="colaborador"
                label="Responsable"
                width="180">
        </el-table-column>
        <el-table-column
                label="Días">
        </el-table-column>
        <el-table-column
                v-for="(n, index) in days"
                :key="index"
                :label="n.name + ' - ' + n.num">
          <template slot-scope="scope">
            {{ dataDays[Math.floor(Math.random() * dataDays.length)] }}
          </template>
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
                option: [],
                options: [
                    {label: 'Retrasos AM', value: 'retrasos'},
                    {label: 'HH.EE Efec./Aut.', value: 'hh_ee'},
                    {label: 'Con Feriado Legal', value: 'feriado_legal'},
                    {label: 'Con Licencia Médica', value: 'licencia_médica'},
                    {label: 'Con Permisos', value: 'permisos'},
                    {label: 'Ausencia Sin Justificar', value: 'ausencia'},
                ],
                tableData: [
                    {dias: '2', proyecto: 'Mant Facturación', colaborador: 'Juan Gonzalez', cargo: 'AP', porcentaje: 100, hora_entrada: '09:00', hora_de_entrada: '09:02', aviso: '', llegada_estimada: '', ausente: ''},
                    {dias: '5', proyecto: 'Mant Facturación', colaborador: 'Andres Martinez', cargo: 'AP', porcentaje: 50, hora_entrada: '09:00', hora_de_entrada: '08:55', aviso: '', llegada_estimada: '', ausente: ''},
                    {dias: '2', proyecto: 'Portal Fase II', colaborador: 'Andres Martinez', cargo: 'AP', porcentaje: 50,	hora_entrada: '14:00', hora_de_entrada: '', aviso: '', llegada_estimada: '', ausente: ''},
                    {dias: '1', proyecto: 'Mant Facturación', colaborador: 'Andres Araya', cargo: 'OP', porcentaje: 100,	hora_entrada: '09:00', hora_de_entrada: '', aviso: '+15', llegada_estimada: '', ausente: ''},
                    {dias: '1', proyecto: 'Mant Facturación', colaborador: 'Javier Moras', cargo: 'OP', porcentaje: 100,	hora_entrada: '09:00', hora_de_entrada: '', aviso: '', llegada_estimada: '09:15', ausente: 'Médico'},
                    {dias: '1', proyecto: 'Portal Fase II', colaborador: 'Juan Andres Ruiz', cargo: 'OP', porcentaje: 100, hora_entrada: '08:30', hora_de_entrada: '09:15', aviso: '+30', llegada_estimada: '', ausente: ''},
                    {dias: '4', proyecto: 'Mant Facturación', colaborador: 'Carlos Parra', cargo: 'AP', porcentaje: 100, hora_entrada: '09:00', hora_de_entrada: '09:45', aviso: '+30', llegada_estimada: '09:20', ausente: ''},
                    {dias: '3', proyecto: 'Portal Fase II', colaborador: 'Carlos Parra', cargo: 'AP', porcentaje: 100, hora_entrada: '08:30', hora_de_entrada: '', aviso: '', llegada_estimada: '09:35', ausente: ''},
                    {dias: '2', proyecto: 'Portal Fase II', colaborador: 'Luis Tapia', cargo: 'JP', porcentaje: 100,	hora_entrada: '08:30', hora_de_entrada: '', aviso: '', llegada_estimada: '', ausente: ''},
                    {dias: '6', proyecto: 'Mant Facturación', colaborador: 'Luis Tapia', cargo: 'JP', porcentaje: 100, hora_entrada: '09:00', hora_de_entrada: '', aviso: '', llegada_estimada: '', ausente: ''},
                    {dias: '2', proyecto: 'Portal Fase II', colaborador: 'Roberto Muñoz', cargo: 'OP', porcentaje: 100, hora_entrada: '08:30', hora_de_entrada: '', aviso: '', llegada_estimada: '', ausente: ''},
                    {dias: '1', proyecto: 'Mant Facturación', colaborador: 'Luis Tapia', cargo: 'JP', porcentaje: 100, hora_entrada: '09:00', hora_de_entrada: '', aviso: '', llegada_estimada: '', ausente: ''},
                    {dias: '1', proyecto: 'ADITOOL', colaborador: 'Johann Bateman', cargo: 'OP', porcentaje: 100, hora_entrada: '08:45', hora_de_entrada: '', aviso: '', llegada_estimada: '', ausente: ''},
                ],
                days: [
                    {name: 'Lu', num: '1'},
                    {name: 'Ma', num: '2'},
                    {name: 'Mi', num: '3'},
                    {name: 'Ju', num: '4'},
                    {name: 'Vi', num: '5'},
                    {name: 'Sa', num: '6'},
                    {name: 'Do', num: '7'},
                    {name: 'Lu', num: '8'},
                    {name: 'Ma', num: '9'},
                    {name: 'Mi', num: '10'},
                    {name: 'Ju', num: '11'},
                    {name: 'Vi', num: '12'},
                    {name: 'Sa', num: '13'},
                    {name: 'Do', num: '14'},
                ],
                dataDays: ["0,5", "1", "F", "2,5", "1", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]
            }
        },
        methods: {

        }
    }
</script>