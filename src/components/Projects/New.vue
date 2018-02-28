<template>
  <div>
    <el-row class="m-bottom-1">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">Inicio</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/projects' }">Proyectos</el-breadcrumb-item>
        <el-breadcrumb-item>Nuevo Proyecto</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-row class="m-bottom-1">
      <p>Ingreso/Actualización de Proyecto.</p>
    </el-row>

    <el-row class="m-bottom-2">
      <el-col>
        <span>Búsqueda de Proyecto</span>
        <el-select v-model="selectedContact" filterable clearable remote reserve-keyword placeholder="Buscar" @change="remoteContactChange"
          :remote-method="remoteProject" :loadingRemote="loadingRemote">
          <el-option v-for="item in remoteProjects" :key="item.id" :label="item.nombre" :value="item.id">
          </el-option>
        </el-select>
        <el-button :disabled="!selectedContact" @click="handleEdit">
          Editar
        </el-button>
      </el-col>
    </el-row>
    <el-row>
      <h3>Detalle - Proyecto</h3>
    </el-row>

    <el-row :gutter="20" class="m-bottom-2 p-bottom-2">
      <el-card>
        <el-form label-position="top" :rules="proyectoRules" :model="proyecto" ref="formProyecto">
          <el-col :xs="24" :sm="6">
            <el-form-item label="ID Proyecto" class="fluid-width" prop="id">
              <el-input v-model="proyecto.id"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="6">
            <el-form-item label="Nombre" class="fluid-width" prop="nombre">
              <el-input v-model="proyecto.nombre"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="6">
            <el-form-item label="Fecha Inicio" class="fluid-width" prop="fechaInicio">
              <el-date-picker v-model="proyecto.fechaInicio" type="date" format="dd-MM-yyyy" placeholder="Seleccione">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="6">
            <el-form-item label="Fecha Fin" class="fluid-width" prop="fechaFin">
              <el-date-picker v-model="proyecto.fechaFin" type="date" format="dd-MM-yyyy" placeholder="Seleccione">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="24">
            <el-form-item label="Breve Descripción" class="fluid-width" prop="descripcion">
              <el-input type="textarea" v-model="proyecto.descripcion" :rows="6"></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :xs="24" :sm="6">
            <el-form-item label="País" class="fluid-width" prop="pais">
              <el-select v-model="proyecto.pais" filterable @change="onChangePais">
                <el-option v-for="item in countries" :key="item.id" :label="item.nombre" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="6">
            <el-form-item label="Región" class="fluid-width" prop="region">
              <el-select v-model="proyecto.region" filterable :disabled="proyecto.pais === '' || !proyecto.pais" @change="onChangeRegion">
                <el-option v-for="item in regions" :key="item.id" :label="item.nombre" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="6">
            <el-form-item label="Ciudad" class="fluid-width" prop="municipio_id">
              <el-select v-model="proyecto.municipio_id" :disabled="proyecto.region === '' || !proyecto.region">
                <el-option v-for="item in municipalities" :key="item.id" :label="item.nombre" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col> -->
          <el-col :xs="24" :sm="6">
            <el-form-item label="País" class="fluid-width" prop="country">
              <el-select v-model="proyecto.country" placeholder="Selecccione su Nacionalidad" @input="getRegions(proyecto.country)">
                <el-option v-for="country in countries" :key="country.id" :label="country.nombre" :value="country.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="6">
            <el-form-item label="Región" class="fluid-width" prop="region">
              <el-select v-model="proyecto.region" placeholder="Selecccione su Región" :disabled="proyecto.country ? false : true" @input="getCities(proyecto.region)">
                <el-option v-for="region in regions" :key="region.id" :label="region.nombre" :value="region.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="6">
            <el-form-item label="Ciudad" class="fluid-width" prop="city">
              <el-select filterable v-model="proyecto.city" :disabled="proyecto.region ? false : true">
                <el-option v-for="city in cities" :key="city.id" :label="city.nombre" :value="city.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="6">
            <el-form-item label="Nombre Calle" class="fluid-width" prop="nombre_calle">
              <el-input v-model="proyecto.nombre_calle">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="6">
            <el-form-item label="Número" class="fluid-width" prop="numero">
              <el-input v-model="proyecto.numero">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="6">
            <el-form-item label="Código Postal" class="fluid-width" prop="codigo_postal">
              <el-input v-model="proyecto.codigo_postal">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="6">
            <el-form-item label="IP" class="fluid-width" prop="ip">
              <el-input v-model="proyecto.ip">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="6">
            <el-form-item label="Latitud" class="fluid-width" prop="latitud">
              <el-input v-model="proyecto.latitud" :disabled="true">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="6">
            <el-form-item label="Longitud" class="fluid-width" prop="longitud">
              <el-input v-model="proyecto.longitud" :disabled="true">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12">
            <el-button class="form-item-space" icon="el-icon-location" @click="mapVisible = true">Seleccionar coordenadas</el-button>
            <el-dialog title="Buscar coordenadas" :visible.sync="mapVisible" @open="handleOpenMap">
              <input ref="pacInput" class="pac-input controls" type="text" placeholder="Buscar ubicación">
              <div class="map" ref="map"></div>
              <br>
              <el-button size="mini" @click="mapVisible = false">Aceptar</el-button>
            </el-dialog>
          </el-col>
        </el-form>
      </el-card>
    </el-row>

    <!-- <el-row class="m-bottom-2">
      <el-col :xs="24" :sm="12">
        <el-checkbox v-model="add_contact">Asignar a proyecto</el-checkbox>
      </el-col>
    </el-row> -->

    <!-- Client Empresa -->
    <el-row class="m-bottom-2">
      <el-col>
        <strong>Búsqueda de Cliente Empresa</strong>
        <el-select v-model="selectedClient" filterable clearable remote reserve-keyword placeholder="Buscar" @change="remoteClientChange"
          :remote-method="remoteClient" :loadingRemote="loadingRemote">
          <el-option v-for="item in remoteClients" :key="item.id" :label="item.nombre" :value="item.id">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row>
      <h3>Asignar - Cliente Empresa</h3>
    </el-row>

    <el-row>
      <el-row :gutter="20" class="m-bottom-2">
        <el-form label-position="top" ref="formEmpresa" :model="empresa">
          <el-card class="m-bottom-2">
            <div slot="header">
              <strong>Datos Generales</strong>
            </div>
            <el-col :xs="24" :sm="8">
              <el-form-item label="Nombre Empresa" class="fluid-width" prop="nombreEmpresa">
                <el-input v-model="selectedClientData.nombre"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="8">
              <el-form-item label="Nombre Fantasia" class="fluid-width" prop="nombreFantasia">
                <el-input v-model="selectedClientData.field"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="8">
              <el-form-item label="Rut" class="fluid-width" prop="rut">
                <el-input v-model="selectedClientData.rut"></el-input>
              </el-form-item>
            </el-col>
            <el-col class="p-bottom-2">
              <el-button type="primary" class="float-right" icon="el-icon-plus">
                Asignar
              </el-button>
            </el-col>
          </el-card>
        </el-form>
      </el-row>
    </el-row>
    <!-- End Contact -->

    <!--Client Contact -->
    <el-row class="m-bottom-2">
      <el-col>
        <strong>Búsqueda de Cliente Contacto</strong>
        <el-select v-model="selectedContact" filterable clearable remote reserve-keyword placeholder="Buscar" @change="remoteContactChange"
          :remote-method="remoteContact" :loadingRemote="loadingRemote">
          <el-option v-for="item in remoteContacts" :key="item.id" :label="item.nombre" :value="item.id">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row>
      <h3>Asignar - Cliente Contacto</h3>
    </el-row>

    <el-row :gutter="20" class="m-bottom-2">
      <el-form label-position="top" ref="cliente" :model="cliente">
        <el-card class="m-bottom-2">
          <div slot="header">
            <strong>Datos Generales</strong>
          </div>
          <el-col :xs="24" :sm="6">
            <el-form-item label="Nombre" class="fluid-width" prop="nombre">
              <el-input v-model="selectedContactData.nombre"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="6">
            <el-form-item label="Apellido Materno" class="fluid-width" prop="apellido_materno">
              <el-input v-model="selectedContactData.primerApellido"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="6">
            <el-form-item label="Apellido Paterno" class="fluid-width" prop="apellido_paterno">
              <el-input v-model="selectedContactData.segundoApellido"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="6">
            <el-form-item label="Rut" class="fluid-width" prop="rut">
              <el-input v-model="selectedContactData.rut"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="6">
            <el-form-item label="Fecha de Nacimiento" class="fluid-width" prop="fecha_nacimiento">
              <el-date-picker v-model="selectedContactData.fechaNacimiento" type="date" format="dd-MM-yyyy" placeholder="Seleccione">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="6">
            <el-form-item label="Genero" class="fluid-width" prop="genero">
              <el-select v-model="selectedContactData.genero">
                <el-option v-for="item in [{value: '1', label: 'Masculino'}, {value: '2', label: 'Femenino'}]" :key="item.value" :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="6">
            <el-form-item label="Nacionalidad" class="fluid-width" prop="nacionalidad">
              <el-input v-model="selectedContactData.nacionalidad"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="6">
            <el-form-item label="Estado civil" class="fluid-width" prop="estadoCivil">
              <el-select v-model="selectedContactData.estadoCivil">
                <el-option v-for="item in [{value: 'C', label: 'Casado'}, {value: 'S', label: 'Soltero'}, {value: 'O', label: 'Otro'}]" :key="item.value"
                  :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="6">
            <el-form-item label="Correo Electrónico" class="fluid-width" prop="nacionalidad">
              <el-input v-model="selectedContactData.correoElectronico"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="6">
            <el-form-item label="Teléfono Fijo" class="fluid-width" prop="telefono_fijo">
              <el-input v-model="selectedContactData.telefonoFijo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="6">
            <el-form-item label="Teléfono Movil 2" class="fluid-width" prop="telefono_movil_2">
              <el-input v-model="selectedContactData.telefono"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="6">
            <el-form-item label="Cargo Informado" class="fluid-width" prop="cargo_informado">
              <el-select v-model="selectedContactData.cargo_informado">
                <el-option v-for="item in [{value: 'C', label: 'Cargo 1'}, {value: 'S', label: 'Cargo 2'}, {value: 'O', label: 'Cargo 3'}]"
                  :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col class="p-bottom-2">
            <el-button type="primary" class="float-right" icon="el-icon-plus">
              Asignar
            </el-button>
          </el-col>
        </el-card>
      </el-form>
    </el-row>
    <!-- End Client Contact -->

    <!-- Schedule -->
    <el-row>
      <h3>Horario del Cliente</h3>
    </el-row>
    <el-row :gutter="20" class="m-bottom-2 p-bottom-2">
      <el-form label-position="top">
        <el-card>
          <el-col :xs="24" :sm="24">
            <el-form-item label="Selección de Días">
              <el-select v-model="client_horario.dias" multiple placeholder="Seleccione" class="fluid-width">
                <el-option v-for="item in dias" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="8">
            <el-form-item label="Nombre Condición" class="fluid-width">
              <el-input></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="4">
            <el-form-item label="Fecha Inicio" class="fluid-width">
              <el-date-picker v-model="client_horario.fecha_inicio" type="date" placeholder="Seleccione">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="4">
            <el-form-item label="Fecha Termino" class="fluid-width">
              <el-date-picker v-model="client_horario.fecha_termina" type="date" placeholder="Seleccione">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="4">
            <el-form-item label="Hora Inicio" class="fluid-width">
              <el-time-select v-model="client_horario.hora_inicio" placeholder="Seleccione">
              </el-time-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="4">
            <el-form-item label="Hora Fin" class="fluid-width">
              <el-time-select v-model="client_horario.hora_fin" placeholder="Seleccione">
              </el-time-select>
            </el-form-item>
          </el-col>
          <el-col class="p-bottom-2">
            <el-button type="primary" class="float-right" icon="el-icon-plus">
              Agregar
            </el-button>
          </el-col>
        </el-card>
      </el-form>
    </el-row>
    <el-row class="m-bottom-1">
      <p>Vista Horario - Jornada Diaria y especial de asignaciones del cliente.</p>
    </el-row>
    <el-row class="m-bottom-2">
      <el-card>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="nombre" label="Nombre">
          </el-table-column>
          <el-table-column prop="cantidad_horas" label="Cantidad de Horas">
          </el-table-column>
          <el-table-column prop="inicial" label="Inicial">
          </el-table-column>
          <el-table-column prop="final" label="Final">
          </el-table-column>
          <el-table-column prop="jornada" label="Jornada">
          </el-table-column>
          <el-table-column prop="fecha_inicio" label="Fecha inicio">
          </el-table-column>
          <el-table-column prop="fecha_final" label="Fecha Final">
          </el-table-column>
        </el-table>
      </el-card>
    </el-row>
    <!-- Schedule -->

    <el-row class="m-bottom-2">
      <el-col>
        <el-button type="primary" class="float-right" @click="saveProyecto" :loading="loading">
          Guardar
        </el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import moment from "moment";
  export default {
    data() {
      return {
        loading: false,
        add_schedule: false,
        remoteClients: [],
        remoteContacts: [],
        remoteProjects: [],
        selectedClient: null,
        selectedContact: null,
        cities: [],
        selectedClientData: {
          nombre: null,
          rut: null,
          field: null,
          id: null,
        },
        selectedContactData: {
          correoElectronico: null,
          estadoCivil: null,
          fechaNacimiento: null,
          genero: null,
          id: null,
          municipio: null,
          nombre: null,
          primerApellido: null,
          rut: null,
          segundoApellido: null,
          telefono: null,
          telefonoFijo: null,
          cargo_informado: null
        },
        mapVisible: false,
        map: null,
        marker: null,

        proyecto: {
          id: null,
          nombre: "",
          descripcion: "",
          valorAdjudicado: "",
          latitud: "",
          longitud: "",
          fechaInicio: "",
          fechaFin: "",
          municipio_id: null,
          empresa_id: null,
          estado_id: 2,
          tipo_id: 1,
          nombre_calle: "",
          numero: null,
          ip: null,
          pais: null,
          region: null
        },
        empresa: {
          id: null,
          nombreEmpresa: "",
          nombreFantasia: "",
          rut: ""
        },
        cliente: {
          nombre: "",
          apellido_materno: "",
          apellido_paterno: "",
          rut: "",
          fecha_nacimiento: "",
          genero: "",
          nacionalidad: "",
          estado_civil: "",
          correo_electronico: "",
          telefono_fijo: "",
          telefono_movil_1: "",
          telefono_movil_2: "",
          cargo_informado: ""
        },
        proyectoRules :{
              nombre: [
                  {required: true, message: 'Campo requerido'}
              ],
              descripcion: [
                  {required: true, message: 'Campo requerido'}
              ],
              valorAdjudicado: [
                  {required: true, message: 'Campo requerido'}
              ],
              latitud: [
                  {required: true, message: 'Campo requerido'}
              ],
              longitud: [
                  {required: true, message: 'Campo requerido'}
              ],
              fechaInicio: [
                  {required: true, message: 'Campo requerido'}
              ],
              fechaFin: [
                  {required: true, message: 'Campo requerido'}
              ],
              municipio_id: [
                  {required: true, message: 'Campo requerido'}
              ],
              empresa_id: [
                  {required: true, message: 'Campo requerido'}
              ],
              estado_id: [
                  {required: true, message: 'Campo requerido'}
              ],
              tipo_id: [
                  {required: true, message: 'Campo requerido'}
              ],
              pais: [
                  {required: true, message: 'Campo requerido'}
              ],
              region: [
                  {required: true, message: 'Campo requerido'}
              ],
          },
        regionLoaded: false,
        client_horario: {
          nombre: "",
          fecha_inicio: "",
          fecha_termina: "",
          hora_inicio: "",
          hora_fin: "",
          dias: []
        },
        options: [],
        selectedClientContact: null,
        selectedContactContact: null,
        list: [],
        loadingRemote: false,
        clients: [
          "Kareem Acosta",
          "Fatima Duran",
          "Alexa West",
          "Lewis Holden",
          "Kamryn Pacheco",
          "Antwan Zimmerman",
          "Denise Esparza",
          "Santos Frazier",
          "Andres Wiley",
          "Davin Shaw",
          "Clara Ellison",
          "Zoey Gamble"
        ],
        action: "add",
        countries: [],
        regions: [],
        municipalities: [],
        dias: [{
            label: "Lunes",
            value: "Lunes"
          },
          {
            label: "Martes",
            value: "Martes"
          },
          {
            label: "Miércoles",
            value: "Miércoles"
          },
          {
            label: "Jueves",
            value: "Jueves"
          },
          {
            label: "Viernes",
            value: "Viernes"
          },
          {
            label: "Sábado",
            value: "Sábado"
          },
          {
            label: "Domingo",
            value: "Domingo"
          }
        ],
        tableData: [{
            nombre: "Jornada laboral 1	",
            cantidad_horas: 8.5,
            inicial: "09:00 AM",
            final: "18:30 PM",
            jornada: "Lunes; Martes; Miércoles; Jueves.",
            fecha_inicio: "01/01/16",
            fecha_final: "02/01/17"
          },
          {
            nombre: "Jornada laboral 2",
            cantidad_horas: 7.5,
            inicial: "09:00 AM",
            final: "17:30 PM",
            jornada: "Viernes.",
            fecha_inicio: "01/01/16",
            fecha_final: "02/01/16"
          },
          {
            nombre: "Colación",
            cantidad_horas: 1,
            inicial: "13:00 AM",
            final: "15:00 PM",
            jornada: "Lunes; Martes; Miércoles; Jueves.",
            fecha_inicio: "01/01/16",
            fecha_final: "02/01/17"
          },
          {
            nombre: "17 Septiembre	",
            cantidad_horas: 5,
            inicial: "09:00 AM",
            final: "15:00 PM",
            jornada: "Jueves",
            fecha_inicio: "17/09/16",
            fecha_final: "17/09/16"
          }
        ]
      };
    },
    mounted() {
      this.getCountries();
    },
    watch: {
      regionLoaded: function (val) {
        this.getMunicipalities();
      }
    },
    methods: {
      remoteClient(query) {
        if (query !== "" && query.length >= 2) {
          this.loadingRemote = true;
          http
            .get("api/empresas/", {
              params: {
                dato: query,
                sin_paginacion: true
              }
            })
            .then(res => {
              this.remoteClients = res.data.data;
              this.clie
            })
            .catch(err => {
              this.remoteClients = [];
            });
        } else {
          this.remoteClients = [];
        }
      },
      remoteContact(query) {
        if (query !== "" && query.length >= 2) {
          this.loadingRemote = true;
          http
            .get("api/personas/", {
              params: {
                dato: query,
                sin_paginacion: true
              }
            })
            .then(res => {
              this.remoteContacts = res.data.data;
            })
            .catch(err => {
              this.remoteContacts = [];
            });
        } else {
          this.remoteContacts = [];
        }
      },
      remoteProject(query) {
        if (query !== "" && query.length >= 2) {
          this.loadingRemote = true;
          http
            .get("api/proyectos/", {
              params: {
                dato: query,
                sin_paginacion: true
              }
            })
            .then(res => {
              this.remoteProjects = res.data.data;
            })
            .catch(err => {
              this.remoteProjects = [];
            });
        } else {
          this.remoteContacts = [];
        }
      },
      getCountries() {
        http
          .get("/api/pais/", {
            params: {
              sin_paginacion: true
            }
          })
          .then(res => {
            this.countries = res.data.results.data;
          });
      },
      getRegions(id) {
        http
          .get("/api/regiones/", {
            params: {
              sin_paginacion: true,
              id_pais: id
            }
          })
          .then(res => {
            this.regions = res.data.results.data;
          });
      },
      getCities(id) {
        http
          .get("/api/municipios/", {
            params: {
              sin_paginacion: true,
              id_region: id
            }
          })
          .then(res => {
            this.cities = res.data.results.data;
          });
      },
      getCity(id) {
        http.get(`/api/municipios/${id}`).then(res => {
          console.log(res.data.data);
          this.cities = res.data.data;
          this.city = res.data.data.id;
        });
      },
      onChangePais() {
        this.regions = [];
        this.municipalities = [];
        this.persona.region = "";
        this.persona.municipio_id = "";
        this.getRegions();
      },
      onChangeRegion() {
        this.municipalities = [];
        this.persona.municipio_id = "";
        this.getMunicipalities();
      },
      handleEdit() {
        this.action = "edit";
        this.selectedContact = null;
        this.persona = {
          id: this.selectedContactData.id,
          nombre: this.selectedContactData.nombre,
          primerApellido: this.selectedContactData.primerApellido,
          segundoApellido: this.selectedContactData.segundoApellido,
          rut: this.selectedContactData.rut,
          genero: this.selectedContactData.genero,
          estadoCivil: this.selectedContactData.estadoCivil,
          correoElectronico: this.selectedContactData.correoElectronico,
          telefono: this.selectedContactData.telefono,
          telefonoFijo: this.selectedContactData.telefonoFijo,
          municipio_id: this.selectedContactData.municipio.id,
          region: this.selectedContactData.municipio.region.id,
          pais: this.selectedContactData.municipio.region.pais.id,
          fechaNacimiento: this.selectedContactData.fechaNacimiento
        };
        this.getRegions();
      },
      remoteClientChange(val) {
        this.selectedClientData = this.remoteClients.find(item => {
          return item.id === val;
        });
      },
      remoteContactChange(val) {
        this.selectedContactData = this.remoteContacts.find(item => {
          return item.id === val;
        });
      },
      handleAssign() {},
      savePersona() {
        this.$refs.formPersona.validate(valid => {
          if (valid) {
            this.loading = true;
            this.persona.fechaNacimiento = moment(
              this.persona.fechaNacimiento
            ).format("YYYY-MM-DD");
            if (this.action === "add") {
              if (this.selectedClient) {
                http
                  .post("api/personas/", this.persona)
                  .then(res => {
                    let persona_id = res.data.data.id;
                    this.$refs.formPersona.resetFields();
                    http
                      .post("api/proyectoContactos/", {
                        persona_id: persona_id,
                        proyecto_id: this.selectedClientData.id,
                        cargo: "Contacto"
                      })
                      .then(res => {
                        this.loading = false;
                        this.$notify.success("Datos almacenados");
                        this.selectedClient = null;
                      })
                      .catch(err => {
                        this.$notify.error("Error al guardar contacto.");
                        this.loading = false;
                      });
                  })
                  .catch(err => {
                    this.$notify.error(
                      err.response.data && err.response.data.message ?
                      err.response.data.message :
                      "No fue posible guardar los datos."
                    );
                    this.loading = false;
                  });
              } else {
                http
                  .post("api/personas/", this.persona)
                  .then(res => {
                    this.loading = false;
                    this.$notify.success("Datos guardados.");
                    this.$refs.formPersona.resetFields();
                  })
                  .catch(err => {
                    this.$notify.error(
                      err.response.data && err.response.data.message ?
                      err.response.data.message :
                      "No fue posible guardar los datos."
                    );
                    this.loading = false;
                  });
              }
            } else {
              http
                .put("api/personas/" + this.persona.id + "/", this.persona)
                .then(res => {
                  this.loading = false;
                  this.$notify.success("Datos actualizados.");
                  this.$refs.formPersona.resetFields();
                })
                .catch(err => {
                  this.$notify.error(
                    err.response.data && err.response.data.message ?
                    err.response.data.message :
                    "No fue posible guardar los datos."
                  );
                  this.loading = false;
                });
            }
          }
        });
      },
      handleOpenMap() {
        setTimeout(() => {
          this.map = new google.maps.Map(this.$refs.map, {
            center: {
              lat: -26.7003141,
              lng: -69.7481861
            },
            zoom: 13,
            mapTypeId: "roadmap"
          });
          // Create the search box and link it to the UI element.
          let input = this.$refs.pacInput;
          let searchBox = new google.maps.places.SearchBox(input);
          this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

          // Bias the SearchBox results towards current map's viewport.
          this.map.addListener("bounds_changed", () => {
            searchBox.setBounds(this.map.getBounds());
          });

          // Listen for the event fired when the user selects a prediction and retrieve
          // more details for that place.
          searchBox.addListener("places_changed", () => {
            let places = searchBox.getPlaces();

            if (places.length == 0) {
              return;
            }

            // Clear out the old markers.
            if (this.marker !== null) {
              this.marker.setMap(null);
            }

            // For each place, get the icon, name and location.
            let bounds = new google.maps.LatLngBounds();
            places.forEach(place => {
              if (!place.geometry) {
                console.log("Returned place contains no geometry");
                return;
              }

              // Create a marker for each place.
              this.marker = new google.maps.Marker({
                map: this.map,
                title: place.name,
                position: place.geometry.location,
                draggable: true
              });

              this.marker.addListener("dragend", () => {
                this.proyecto.latitud = this.marker.getPosition().lat();
                this.proyecto.longitud = this.marker.getPosition().lng();
              });

              this.proyecto.latitud = place.geometry.location.lat();
              this.proyecto.longitud = place.geometry.location.lng();

              if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
              } else {
                bounds.extend(place.geometry.location);
              }
            });
            this.map.fitBounds(bounds);
          });
        }, 1000);
      },
      saveProyecto(){
            this.$refs.formProyecto.validate(valid=>{
                if(valid){
                    this.loading = true;
                    this.proyecto.fechaInicio = moment(this.proyecto.fechaInicio).format("YYYY-MM-DD");
                    this.proyecto.fechaFin = moment(this.proyecto.fechaFin).format("YYYY-MM-DD");
                    this.proyecto.empresa_id = this.selectedClientData.id
                    if(this.action === 'add'){
                        if(this.selectedContactData){
                            http.post('api/proyectos/', this.proyecto).then(res=>{
                                let proyecto_id = res.data.data.id;
                                this.$refs.formProyecto.resetFields();
                                http.post('api/proyectoContactos/', {
                                    proyecto_id: proyecto_id,
                                    persona_id: this.selectedContactData.id,
                                    cargo: 'Contacto'
                                }).then(res=>{
                                    this.loading = false;
                                    this.$notify.success('Datos almacenados');
                                    this.selectedContactContact = null;
                                }).catch(err=>{
                                    this.$notify.error('Error al guardar contacto.');
                                    this.loading = false;
                                });
                            }).catch(err=>{
                                this.$notify.error(err.response.data && err.response.data.message ? err.response.data.message : 'No fue posible guardar los datos.');
                                this.loading = false;
                            });
                        }else{
                            http.post('api/proyectos/', this.proyecto).then(res=>{
                                this.loading = false;
                                this.$notify.success('Datos guardados.');
                                this.$refs.formProyecto.resetFields();
                            }).catch(err=>{
                               console.log("Errores "+err);
                                this.$notify.error(err.response.data && err.response.data.message ? err.response.data.message : 'No fue posible guardar los datos.');
                                this.loading = false;
                            });
                        }
                    }else{
                        http.put('api/proyectos/'+ this.proyecto.id + '/', this.proyecto).then(res=>{
                            this.loading = false;
                            this.$notify.success('Datos actualizados.');
                            this.$refs.formProyecto.resetFields();
                        }).catch(err=>{
                            this.$notify.error(err.response.data && err.response.data.message ? err.response.data.message : 'No fue posible guardar los datos.');
                            this.loading = false;
                        });
                    }
                }
            });
        },
    }
  };

</script>
<style>
  .map {
    height: 300px;
    width: 100%;
  }

  .controls {
    margin-top: 10px;
    border: 1px solid transparent;
    border-radius: 2px 0 0 2px;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    height: 32px;
    outline: none;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  }

  .pac-input {
    background-color: #fff;
    font-family: Roboto;
    font-size: 15px;
    font-weight: 300;
    margin-left: 12px;
    padding: 0 11px 0 13px;
    text-overflow: ellipsis;
    width: 300px;
  }

  .pac-container {
    z-index: 9999;
  }

  .pac-input:focus {
    border-color: #4d90fe;
  }

</style>
