<template>
  <div>
    <el-row class="m-bottom-1">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">Inicio</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/employees'}">Trabajadores</el-breadcrumb-item>
        <el-breadcrumb-item>Resultado en Lista Trabajadores</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-row class="m-bottom-1">
      <p>Lista  De Trabajadores - Vista Asignacion y Resultados.</p>
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
      <el-table :data="tableData2"
              style="width: 100%">
        <el-table-column
                fixed
                width="150"
                prop="proyecto"
                label="Proyecto">
        </el-table-column>
        <el-table-column
                width="160"
                prop="colaborador"
                label="Colaborador (R.R H.H)">
        </el-table-column>
        <el-table-column
                prop="cargo"
                label="Cargo">
        </el-table-column>
        <el-table-column
                width="160"
                prop="responsable"
                label="Responsable">
        </el-table-column>
        <el-table-column label="Fecha Asignación">
          <el-table-column
                  prop="fecha_inicio"
                  label="Fecha Inicio">
          </el-table-column>
          <el-table-column
                  prop="fecha_fin"
                  label="Fecha Fin">
          </el-table-column>
        </el-table-column>
        <el-table-column label="Asignación">
          <el-table-column
                  prop="dias"
                  label="Días">
          </el-table-column>
          <el-table-column
                  prop="porcentaje"
                  label="%">
          </el-table-column>
          <el-table-column
                  prop="hh"
                  label="HH">
          </el-table-column>
          <el-table-column
                  prop="en_el_mes"
                  label="En el Mes">
          </el-table-column>
        </el-table-column>
        <el-table-column label="Ausentismo - Días">
          <el-table-column
                  prop="legal"
                  label="Legal">
          </el-table-column>
          <el-table-column
                  prop="medico"
                  label="Médico">
          </el-table-column>
          <el-table-column
                  prop="especial"
                  label="Especial">
          </el-table-column>
          <el-table-column
                  prop="sin_info"
                  label="Sin Info">
          </el-table-column>
        </el-table-column>
        <el-table-column label="Desborde Horario - Cantidad y Horas">
          <el-table-column
                  prop="ingreso_cantidad"
                  label="Ingreso Cantidad">
          </el-table-column>
          <el-table-column
                  prop="ingreso_hh"
                  label="Ingreso HH">
          </el-table-column>
          <el-table-column
                  prop="salida_cantidad"
                  label="Salida Cantidad">
          </el-table-column>
          <el-table-column
                  prop="salida_hh"
                  label="Salida HH">
          </el-table-column>
          <el-table-column
                  prop="salida_especial"
                  label="Especial">
          </el-table-column>
        </el-table-column>
        <el-table-column label="Resultado">
          <el-table-column
                  prop="hh_del_mes"
                  label="HH del Mes">
          </el-table-column>
          <el-table-column
                  prop="ausente_legal"
                  label="Ausente Legal">
          </el-table-column>
          <el-table-column
                  prop="ausente_especial"
                  label="Ausente Especial">
          </el-table-column>
          <el-table-column
                  prop="ausente_sin_info"
                  label="Ausente sin Info">
          </el-table-column>
        </el-table-column>
        <el-table-column label="Horas del Trabajador">
          <el-table-column
                  prop="reales"
                  label="Reales">
          </el-table-column>
          <el-table-column
                  prop="efectivas"
                  label="Efectivas">
          </el-table-column>
          <el-table-column
                  prop="diff"
                  label="Diff">
          </el-table-column>
          <el-table-column
                  prop="extras_realizadas"
                  label="Extras Realizadas">
          </el-table-column>
          <el-table-column
                  prop="extras_autorizadas"
                  label="Extras Autorizadas">
          </el-table-column>
          <el-table-column
                  prop="compensado"
                  label="Compensado">
          </el-table-column>
          <el-table-column
                  prop="marca_corregida"
                  label="Marca Corregida">
          </el-table-column>
        </el-table-column>
      </el-table>
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
                tableData2: [
                    {proyecto: 'Mant Facturación', colaborador: 'Juan Gonzalez', cargo: 'AP', responsable: 'J Berrios', fecha_inicio: '28/02/17', fecha_fin: '30/12/17', dias: '21', porcentaje: '100%', hh: '168', en_el_mes: '100%', legal: '10', medico: '0', especial: '0', sin_info: '0', ingreso_cantidad: '8', ingreso_hh: '5', salida_cantidad: '0', salida_hh: '0', salida_especial: '0', hh_del_mes: '168', ausente_legal: '80', ausente_especial: '0', ausente_sin_info: '5', reales: '88', efectivas: '83', diff: '-5', extras_realizadas: '6', extras_autorizadas: '0', compensado: '1', marca_corregida: '4'},
                    {proyecto: 'Mant Facturación', colaborador: 'Andres Martinez', cargo: 'AP', responsable: 'J Berrios', fecha_inicio: '28/02/17', fecha_fin: '30/12/17', dias: '21', porcentaje: '50%', hh: '84', en_el_mes: '50%', legal: '0', medico: '0', especial: '0', sin_info: '0', ingreso_cantidad: '21', ingreso_hh: '19', salida_cantidad: '2', salida_hh: '2', salida_especial: '0', hh_del_mes: '168', ausente_legal: '0', ausente_especial: '0', ausente_sin_info: '21', reales: '168', efectivas: '147', diff: '-21', extras_realizadas: '0', extras_autorizadas: '0', compensado: '-21', marca_corregida: '1'},
                    {proyecto: 'Portal Fase II', colaborador: 'Andres Martinez', cargo: 'AP', responsable: 'M. Tolosa', fecha_inicio: '28/02/17', fecha_fin: '30/12/17', dias: '21', porcentaje: '50%', hh: '84', en_el_mes: '50%', legal: '0', medico: '0', especial: '0', sin_info: '0', ingreso_cantidad: '18', ingreso_hh: '8', salida_cantidad: '0', salida_hh: '0', salida_especial: '0', hh_del_mes: '168', ausente_legal: '0', ausente_especial: '0', ausente_sin_info: '8', reales: '168', efectivas: '160', diff: '-8', extras_realizadas: '8', extras_autorizadas: '0', compensado: '0', marca_corregida: '1'},
                    {proyecto: 'Mant Facturación', colaborador: 'Andres Araya', cargo: 'OP', responsable: 'J Berrios', fecha_inicio: '28/02/17', fecha_fin: '30/12/17', dias: '21', porcentaje: '100%', hh: '168', en_el_mes: '100%', legal: '0', medico: '0', especial: '0', sin_info: '0', ingreso_cantidad: '3', ingreso_hh: '4', salida_cantidad: '0', salida_hh: '0', salida_especial: '0', hh_del_mes: '168', ausente_legal: '0', ausente_especial: '0', ausente_sin_info: '4', reales: '168', efectivas: '164', diff: '-4', extras_realizadas: '2', extras_autorizadas: '2', compensado: '-4', marca_corregida: '7'},
                    {proyecto: 'Mant Facturación', colaborador: 'Javier Moras', cargo: 'OP', responsable: 'J Berrios', fecha_inicio: '28/02/17', fecha_fin: '30/12/17', dias: '21', porcentaje: '100%', hh: '168', en_el_mes: '100%', legal: '0', medico: '0', especial: '0', sin_info: '0', ingreso_cantidad: '0', ingreso_hh: '0', salida_cantidad: '0', salida_hh: '0', salida_especial: '5', hh_del_mes: '168', ausente_legal: '0', ausente_especial: '5', ausente_sin_info: '0', reales: '168', efectivas: '163', diff: '-5', extras_realizadas: '40', extras_autorizadas: '8', compensado: '27', marca_corregida: '6'},
                    {proyecto: 'Portal Fase II', colaborador: 'Juan Andres Ruiz', cargo: 'OP', responsable: 'M. Tolosa', fecha_inicio: '28/02/17', fecha_fin: '30/12/17', dias: '21', porcentaje: '100%', hh: '168', en_el_mes: '100%', legal: '0', medico: '0', especial: '0', sin_info: '0', ingreso_cantidad: '1', ingreso_hh: '2', salida_cantidad: '0', salida_hh: '0', salida_especial: '0', hh_del_mes: '168', ausente_legal: '0', ausente_especial: '0', ausente_sin_info: '2', reales: '168', efectivas: '166', diff: '-2', extras_realizadas: '0', extras_autorizadas: '0', compensado: '-2', marca_corregida: '2'},
                    {proyecto: 'Mant Facturación', colaborador: 'Carlos Parra', cargo: 'AP', responsable: 'J Berrios', fecha_inicio: '28/02/17', fecha_fin: '30/12/17', dias: '21', porcentaje: '100%', hh: '168', en_el_mes: '100%', legal: '8', medico: '1', especial: '1', sin_info: '1', ingreso_cantidad: '10', ingreso_hh: '12', salida_cantidad: '0', salida_hh: '0', salida_especial: '0', hh_del_mes: '168', ausente_legal: '72', ausente_especial: '8', ausente_sin_info: '20', reales: '96', efectivas: '68', diff: '-28', extras_realizadas: '0', extras_autorizadas: '0', compensado: '-28', marca_corregida: '11'},
                    {proyecto: 'Portal Fase II', colaborador: 'Carlos Parra', cargo: 'AP', responsable: 'J Berrios', fecha_inicio: '28/02/17', fecha_fin: '30/12/17', dias: '21', porcentaje: '100%', hh: '168', en_el_mes: '100%', legal: '8', medico: '1', especial: '1', sin_info: '3', ingreso_cantidad: '0', ingreso_hh: '0', salida_cantidad: '5', salida_hh: '5', salida_especial: '0', hh_del_mes: '168', ausente_legal: '72', ausente_especial: '8', ausente_sin_info: '29', reales: '96', efectivas: '59', diff: '-37', extras_realizadas: '2', extras_autorizadas: '0', compensado: '-35', marca_corregida: '11'},
                    {proyecto: 'Portal Fase II', colaborador: 'Luis Tapia', cargo: 'JP', responsable: 'M. Tolosa', fecha_inicio: '28/02/17', fecha_fin: '30/12/17', dias: '21', porcentaje: '100%', hh: '168', en_el_mes: '100%', legal: '0', medico: '0', especial: '0', sin_info: '0', ingreso_cantidad: '0', ingreso_hh: '0', salida_cantidad: '0', salida_hh: '0', salida_especial: '21', hh_del_mes: '168', ausente_legal: '0', ausente_especial: '21', ausente_sin_info: '0', reales: '168', efectivas: '147', diff: '-21', extras_realizadas: '12', extras_autorizadas: '10', compensado: '-19', marca_corregida: '0'},
                    {proyecto: 'Mant Facturación', colaborador: 'Luis Tapia', cargo: 'JP', responsable: 'J Berrios', fecha_inicio: '28/02/17', fecha_fin: '30/12/17', dias: '21', porcentaje: '100%', hh: '168', en_el_mes: '100%', legal: '0', medico: '0', especial: '0', sin_info: '0', ingreso_cantidad: '5', ingreso_hh: '2', salida_cantidad: '0', salida_hh: '0', salida_especial: '0', hh_del_mes: '168', ausente_legal: '0', ausente_especial: '0', ausente_sin_info: '2', reales: '168', efectivas: '166', diff: '-2', extras_realizadas: '3', extras_autorizadas: '0', compensado: '1', marca_corregida: '0'},
                    {proyecto: 'Portal Fase II', colaborador: 'Roberto Muñoz', cargo: 'OP', responsable: 'M. Tolosa', fecha_inicio: '28/02/17', fecha_fin: '30/12/17', dias: '21', porcentaje: '100%', hh: '168', en_el_mes: '100%', legal: '0', medico: '0', especial: '4', sin_info: '0', ingreso_cantidad: '1', ingreso_hh: '1', salida_cantidad: '0', salida_hh: '0', salida_especial: '0', hh_del_mes: '168', ausente_legal: '0', ausente_especial: '32', ausente_sin_info: '1', reales: '168', efectivas: '135', diff: '-33', extras_realizadas: '0', extras_autorizadas: '0', compensado: '-33', marca_corregida: '18'},
                    {proyecto: 'Mant Facturación', colaborador: 'Luis Tapia', cargo: 'JP', responsable: 'J Berrios', fecha_inicio: '28/02/17', fecha_fin: '30/12/17', dias: '21', porcentaje: '100%', hh: '168', en_el_mes: '100%', legal: '0', medico: '0', especial: '0', sin_info: '0', ingreso_cantidad: '5', ingreso_hh: '4', salida_cantidad: '0', salida_hh: '0', salida_especial: '0', hh_del_mes: '168', ausente_legal: '0', ausente_especial: '0', ausente_sin_info: '4', reales: '168', efectivas: '164', diff: '-4', extras_realizadas: '0', extras_autorizadas: '0', compensado: '-4', marca_corregida: '0'},
                    {proyecto: 'ADITOOL 1', colaborador: 'Johann Bateman', cargo: 'AP', responsable: 'J Berrios', fecha_inicio: '28/02/17', fecha_fin: '30/12/17', dias: '2', porcentaje: '100%', hh: '16', en_el_mes: '10%', legal: '0', medico: '0', especial: '0', sin_info: '2', ingreso_cantidad: '0', ingreso_hh: '0', salida_cantidad: '0', salida_hh: '0', salida_especial: '0', hh_del_mes: '16', ausente_legal: '0', ausente_especial: '0', ausente_sin_info: '16', reales: '16', efectivas: '0', diff: '-16', extras_realizadas: '2', extras_autorizadas: '0', compensado: '-14', marca_corregida: '11'},
                    {proyecto: 'ADITOOL 2', colaborador: 'Johann Bateman', cargo: 'JP', responsable: 'J Berrios', fecha_inicio: '28/02/17', fecha_fin: '30/12/17', dias: '4', porcentaje: '100%', hh: '32', en_el_mes: '19%', legal: '1', medico: '1', especial: '1', sin_info: '0', ingreso_cantidad: '3', ingreso_hh: '0', salida_cantidad: '5', salida_hh: '5', salida_especial: '0', hh_del_mes: '32', ausente_legal: '16', ausente_especial: '8', ausente_sin_info: '5', reales: '16', efectivas: '3', diff: '-13', extras_realizadas: '12', extras_autorizadas: '10', compensado: '-11', marca_corregida: '0'},
                    {proyecto: 'ADITOOL 3', colaborador: 'Johann Bateman', cargo: 'JP', responsable: 'J Berrios', fecha_inicio: '28/02/17', fecha_fin: '30/12/17', dias: '13', porcentaje: '54%', hh: '56', en_el_mes: '33%', legal: '1', medico: '1', especial: '1', sin_info: '0', ingreso_cantidad: '5', ingreso_hh: '1', salida_cantidad: '0', salida_hh: '0', salida_especial: '0', hh_del_mes: '104', ausente_legal: '16', ausente_especial: '8', ausente_sin_info: '1', reales: '88', efectivas: '79', diff: '-9', extras_realizadas: '3', extras_autorizadas: '0', compensado: '-6', marca_corregida: '0'},
                    {proyecto: 'ADITOOL 4', colaborador: 'Johann Bateman', cargo: 'OP', responsable: 'J Berrios', fecha_inicio: '28/02/17', fecha_fin: '30/12/17', dias: '4', porcentaje: '100%', hh: '32', en_el_mes: '19%', legal: '1', medico: '1', especial: '1', sin_info: '1', ingreso_cantidad: '0', ingreso_hh: '0', salida_cantidad: '0', salida_hh: '0', salida_especial: '0', hh_del_mes: '32', ausente_legal: '16', ausente_especial: '8', ausente_sin_info: '8', reales: '16', efectivas: '0', diff: '-16', extras_realizadas: '0', extras_autorizadas: '0', compensado: '-16', marca_corregida: '18'},
                    {proyecto: 'ADITOOL 5', colaborador: 'Johann Bateman', cargo: 'JP', responsable: 'J Berrios', fecha_inicio: '28/02/17', fecha_fin: '30/12/17', dias: '8', porcentaje: '50%', hh: '32', en_el_mes: '19%', legal: '1', medico: '1', especial: '1', sin_info: '0', ingreso_cantidad: '5', ingreso_hh: '2', salida_cantidad: '0', salida_hh: '0', salida_especial: '0', hh_del_mes: '64', ausente_legal: '16', ausente_especial: '8', ausente_sin_info: '2', reales: '48', efectivas: '38', diff: '-10', extras_realizadas: '0', extras_autorizadas: '0', compensado: '-10', marca_corregida: '0'},
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