<template>
  <div>
    <el-row class="m-bottom-1">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">Inicio</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/projects'}">Proyectos</el-breadcrumb-item>
        <el-breadcrumb-item>Detalle</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-row class="m-bottom-2">
      <p>Vista Por Cliente - Identificación del cliente, horarios y proyectos.</p>
    </el-row>
    <el-row class="m-bottom-2">
      <el-col>
        <span>Cliente Empresa</span>
        <el-select
                v-model="selectedClient"
                filterable
                remote
                reserve-keyword
                placeholder="Buscar"
                @change="remoteClientChange"
                :remote-method="remoteClient"
                :loadingRemote="loadingRemote">
          <el-option
                  v-for="item in remoteClients"
                  :key="item.id"
                  :label="item.nombre"
                  :value="item.id">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row class="m-bottom-3" :gutter="20" v-loading="loading">
      <el-col :xs="24" :sm="18">

        <el-row class="table-row">
          <el-col :xs="24" :sm="6" class="flex-center">
            <h4>Proyecto</h4>
          </el-col>
          <el-col :xs="24" :sm="18">
            <el-row class="m-bottom-1">
              <el-col :span="12" class="m-bottom-1">
                <b>Nombre:</b> {{ item.nombre ? item.nombre : '-' }}
              </el-col>
              <el-col :span="12" class="m-bottom-1">
                <b>Descripción:</b> {{ item.descripcion ? item.descripcion : '-' }}
              </el-col>
              <el-col :span="12" class="m-bottom-1">
                <b>Desde:</b> {{ item.fechaInicio ? item.fechaInicio : '-' }}
              </el-col>
              <el-col :span="12" class="m-bottom-1">
                <b>Hasta:</b> {{ item.fechaFin ? item.fechaFin : '-' }}
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
                <b>País:</b> {{ item.municipio ? item.municipio.region.pais.nombre : '-' }}
              </el-col>
              <el-col :span="12">
                <b>Ciudad:</b> {{ item.municipio? item.municipio.region.nombre : '-' }}
              </el-col>
            </el-row>
            <el-row class="m-bottom-1">
              <el-col :span="12">
                <b>Comuna:</b> {{ item.municipio ? item.municipio.nombre : '-' }}
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row class="table-row">
          <el-col :xs="24" :sm="6" class="flex-center">
            <h4>Cliente</h4>
          </el-col>
          <el-col :xs="24" :sm="18">
            <el-row class="m-bottom-1">
              <el-col :span="12">
                <b>Nombre Empresa:</b> {{ item.empresa ? item.empresa.nombre : '-' }}
              </el-col>
              <el-col :span="12">
                <b>Rut:</b> {{ item.empresa ? item.empresa.rut : '-' }}
              </el-col>
            </el-row>
            <el-row class="m-bottom-1">
              <el-col>
                <b>Nombre fantasia:</b> {{ item.empresa ? item.empresa.nombre_fantasia : '-' }}
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
                <b>País:</b> {{ item.empresa.municipio ? item.empresa.municipio.region.pais.nombre : '-' }}
              </el-col>
              <el-col :span="12">
                <b>Ciudad:</b> {{ item.empresa.municipio? item.empresa.municipio.region.nombre : '-' }}
              </el-col>
            </el-row>
            <el-row class="m-bottom-1">
              <el-col :span="12">
                <b>Comuna:</b> {{ item.empresa.municipio ? item.empresa.municipio.nombre : '-' }}
              </el-col>
              <el-col :span="12">
                <b>Cód. Postal:</b> {{ item.codigo_postal ? item.codigo_postal : '-' }}
              </el-col>
            </el-row>
            <el-row class="m-bottom-1">
              <el-col :span="12">
                <b>Dirección:</b> {{ item.direccion ? item.direccion : '-' }}
              </el-col>
              <el-col :span="12">
                <b>Número:</b> {{ item.numero ? item.numero : '-' }}
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
              :data="dataTable"
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
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
            this.id = this.$route.params.id;
            if(typeof this.id !== "undefined"){
                this.getData();
            }
        },
        data () {
            return {
                loading: false,
                items: [],
                dataTable: [],
                id: null,
                item: {},

                remoteClients: [],
                selectedClient: null,
                selectedClientData: null,
                loadingRemote: false,
            }
        },
        methods: {
            getData(){
                this.loading = true;
                http.get('api/proyectos/' + this.id + '/').then(res=>{
                    this.item = res.data.data;
                    this.loading = false;
                }).catch(err=>{
                    this.loading = false;
                });
            },
            remoteClientChange(val){
                this.item = this.remoteClients.find((item)=>{
                    return item.id === val;
                });
            },
            remoteClient(query) {
                if (query !== '' && query.length >= 2) {
                    this.loadingRemote = true;
                    http.get('api/proyectos/', {
                        params: {
                            dato: query,
                            sin_paginacion: true
                        }
                    }).then(res=>{
                        this.remoteClients = res.data.data;
                    }).catch(err=>{
                        this.remoteClients = [];
                    });
                } else {
                    this.remoteClients = [];
                }
            },
        }
    }
</script>