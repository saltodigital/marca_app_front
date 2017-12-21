<template>
  <div>
    <el-row class="m-bottom-1">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">Inicio</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/clients'}">Clientes</el-breadcrumb-item>
        <el-breadcrumb-item>Detalle</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-row class="m-bottom-2">
      <p>Vista Por Cliente - Identificacion del cliente, horarios y proyectos.</p>
    </el-row>
    <el-row class="m-bottom-2">
      <el-col>
        <span>Cliente Empresa</span>
        <el-input size="medium" placeholder="Buscar...">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
    </el-row>
    <el-row class="m-bottom-3" :gutter="20">
      <el-col :xs="24" :sm="18">

        <el-row class="table-row">
          <el-col :xs="24" :sm="6" class="flex-center">
            <h4>Cliente</h4>
          </el-col>
          <el-col :xs="24" :sm="18">
            <el-row class="m-bottom-1">
              <el-col :span="12">
                <b>Nombre Empresa:</b> FALABELLA SDA
              </el-col>
              <el-col :span="12">
                <b>Rut:</b> 78.7473.910-5
              </el-col>
            </el-row>
            <el-row class="m-bottom-1">
              <el-col>
                <b>Nombre fantasia:</b> Falabella
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row class="table-row">
          <el-col :xs="24" :sm="6" class="flex-center">
            <h4>Dirección</h4>
          </el-col>
          <el-col :xs="24" :sm="18">
            <el-row class="m-bottom-1">
              <el-col :span="12">
                <b>País:</b> Chile
              </el-col>
              <el-col :span="12">
                <b>Ciudad:</b> Santiago
              </el-col>
            </el-row>
            <el-row class="m-bottom-1">
              <el-col :span="12">
                <b>Comuna:</b> Macul
              </el-col>
              <el-col :span="12">
                <b>Cód. Postal:</b> 829910
              </el-col>
            </el-row>
            <el-row class="m-bottom-1">
              <el-col :span="12">
                <b>Dirección:</b> Calle 1
              </el-col>
              <el-col :span="12">
                <b>Número:</b> 3222
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row class="table-row">
          <el-col :xs="24" :sm="6" class="flex-center">
            <h4>Estado del cliente</h4>
          </el-col>
          <el-col :xs="24" :sm="18">
            <el-row class="m-bottom-1">
              <el-col :span="12">
                <b>Fecha inicio:</b> 1/1/2016
              </el-col>
              <el-col :span="12">
                <b>Fecha fin:</b> 2/1/2016
              </el-col>
            </el-row>
            <el-row class="m-bottom-1">
              <el-col :span="12">
                <b>Estado:</b> Activo
              </el-col>
              <el-col :span="12">
                <b>Fecha estado:</b> 1/1/2016
              </el-col>
            </el-row>
            <el-row class="m-bottom-1">
              <el-col :span="12">
                <b>Responsable interno:</b> Juan Berrios
              </el-col>
              <el-col :span="12">
                <b>Móvil:</b> +56974676532
              </el-col>
            </el-row>
          </el-col>
        </el-row>

      </el-col>
      <el-col :xs="24" :sm="6">
        <img src="../../assets/placeholder.png" width="100%">
      </el-col>
    </el-row>

    <el-row class="m-bottom-2">
      <el-col>
        <span>Cliente Contacto</span>
        <el-input size="medium" placeholder="Buscar...">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
    </el-row>
    <el-row class="m-bottom-2" :gutter="20">
      <el-col :xs="24" :sm="18">
        <el-row class="table-row">
          <el-col :xs="24" :sm="6" class="flex-center">
            <h4>Contacto</h4>
          </el-col>
          <el-col :xs="24" :sm="18">
            <el-row class="m-bottom-1">
              <el-col :span="12">
                <b>Nombre Contacto:</b> Carlos Jhein Tapia
              </el-col>
              <el-col :span="12">
                <b>Correo Electrónico:</b> cparra@corre.cl
              </el-col>
            </el-row>
            <el-row class="m-bottom-1">
              <el-col :span="12">
                <b>Teléfono Fijo :</b> +569 90001010 + anexo
              </el-col>
              <el-col :span="12">
                <b>Teléfono Móvil 1:</b> +569 90001010
              </el-col>
            </el-row>
            <el-row class="m-bottom-2">
              <el-col :span="12">
                <b>Cargo Informado:</b> Jefe Proyectos
              </el-col>
              <el-col :span="12">
                <b>Teléfono Móvil 2:</b> +569 90001010
              </el-col>
            </el-row>
            <el-row class="m-bottom-1">
              <el-col :span="12">
                <b>Fecha Nacimiento :</b> 6/8/1977
              </el-col>
              <el-col :span="12">
                <b>Nacionalidad:</b> Chilena
              </el-col>
            </el-row>
            <el-row class="m-bottom-1">
              <el-col :span="12">
                <b>Género:</b> Masculino
              </el-col>
              <el-col :span="12">
                <b>Estado Civil:</b> Soltero
              </el-col>
            </el-row>
            <el-row class="m-bottom-1">
              <el-col>
                <b>Rut:</b> 12345678-9
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-col>
      <el-col :xs="24" :sm="6">
        <img src="../../assets/placeholder.png" width="100%">
      </el-col>
    </el-row>

    <el-row class="m-bottom-1">
      <p>Vista Horario - Jornada Diaria y especial de asignaciones del cliente.</p>
    </el-row>
    <el-row>
      <el-table
              :data="tableData"
              style="width: 100%">
        <el-table-column
                prop="nombre"
                label="Nombre">
        </el-table-column>
        <el-table-column
                prop="cantidad_horas"
                label="Cantidad de Horas">
        </el-table-column>
        <el-table-column
                prop="inicial"
                label="Inicial">
        </el-table-column>
        <el-table-column
                prop="final"
                label="Final">
        </el-table-column>
        <el-table-column
                prop="jornada"
                label="Jornada">
        </el-table-column>
        <el-table-column
                prop="fecha_inicio"
                label="Fecha inicio">
        </el-table-column>
        <el-table-column
                prop="fecha_final"
                label="Fecha Final">
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
      return{
          tableData: [
              {nombre: 'Jornada laboral 1	', cantidad_horas: 8.5, inicial: '09:00 AM', final: '18:30 PM', jornada: 'Lunes; Martes; Miércoles; Jueves.', fecha_inicio: '01/01/16', fecha_final: '02/01/17'},
              {nombre: 'Jornada laboral 2', cantidad_horas: 7.5, inicial: '09:00 AM', final: '17:30 PM', jornada: 'Viernes.', fecha_inicio: '01/01/16', fecha_final: '02/01/16'},
              {nombre: 'Colación', cantidad_horas: 1, inicial: '13:00 AM', final: '15:00 PM', jornada: 'Lunes; Martes; Miércoles; Jueves.', fecha_inicio: '01/01/16', fecha_final: '02/01/17'},
              {nombre: '17 Septiembre	', cantidad_horas: 5, inicial: '09:00 AM', final: '15:00 PM', jornada: 'Jueves', fecha_inicio: '17/09/16', fecha_final: '17/09/16'},
          ]
      }
  }
}
</script>