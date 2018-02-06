<template>
  <div>
    <el-row class="m-bottom-1">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">Inicio</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/clients' }">Clientes</el-breadcrumb-item>
        <el-breadcrumb-item>Nuevo Cliente Contacto</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-row class="m-bottom-1">
      <p>Ingreso/Actualización de Clientes Contacto.</p>
    </el-row>

    <el-row class="m-bottom-2">
      <el-col>
        <span>Búsqueda de Cliente Contacto</span>
        <el-select
                v-model="selectedContact"
                filterable
                clearable
                remote
                reserve-keyword
                placeholder="Buscar"
                @change="remoteContactChange"
                :remote-method="remoteContact"
                :loadingRemote="loadingRemote">
          <el-option
                  v-for="item in remoteContacts"
                  :key="item.id"
                  :label="item.nombre + ' ' + item.primerApellido"
                  :value="item.id">
          </el-option>
        </el-select>
        <el-button :disabled="!selectedContact" @click="handleEdit">
          Editar
        </el-button>
      </el-col>
    </el-row>
    <el-row>
      <h3>Detalle - Cliente Empresa</h3>
    </el-row>
    <el-row :gutter="20" class="m-bottom-2">
      <el-form label-position="top" :model="persona" :rules="personaRules" ref="formPersona">
        <el-col :xs="24" :sm="6">
          <el-form-item label="Nombre" class="fluid-width" prop="nombre">
            <el-input v-model="persona.nombre"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="6">
          <el-form-item label="Primer Apellido" class="fluid-width" prop="primerApellido">
            <el-input v-model="persona.primerApellido"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="6">
          <el-form-item label="Segundo Apellido" class="fluid-width" prop="segundoApellido">
            <el-input v-model="persona.segundoApellido"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="6">
          <el-form-item label="RUT" class="fluid-width" prop="rut">
            <el-input v-model="persona.rut"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="6">
          <el-form-item label="Genero" class="fluid-width" prop="genero">
            <el-select v-model="persona.genero">
              <el-option
                      v-for="item in [{value: '1', label: 'Masculino'}, {value: '2', label: 'Femenino'}]"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="6">
          <el-form-item label="Estado civil" class="fluid-width" prop="estadoCivil">
            <el-select v-model="persona.estadoCivil">
              <el-option
                      v-for="item in [{value: 'C', label: 'Casado'}, {value: 'S', label: 'Soltero'}, {value: 'O', label: 'Otro'}]"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="6">
          <el-form-item label="Correo Electrónico" class="fluid-width" prop="correoElectronico">
            <el-input v-model="persona.correoElectronico"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="6">
          <el-form-item label="Teléfono" class="fluid-width" prop="telefono">
            <el-input v-model="persona.telefono"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="6">
          <el-form-item label="Teléfono Fijo" class="fluid-width" prop="telefonoFijo">
            <el-input v-model="persona.telefonoFijo"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="5">
          <el-form-item label="Fecha de Nacimiento" class="fluid-width" prop="fechaNacimiento">
            <el-date-picker
                    v-model="persona.fechaNacimiento"
                    type="date"
                    format="dd-MM-yyyy"
                    placeholder="Seleccione">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="5">
          <el-form-item label="País" class="fluid-width" prop="pais">
            <el-select filterable v-model="persona.pais" @change="onChangePais">
              <el-option
                      v-for="item in countries"
                      :key="item.id"
                      :label="item.nombre"
                      :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="5">
          <el-form-item label="Región" class="fluid-width" prop="region">
            <el-select filterable v-model="persona.region" :disabled="persona.pais === '' || !persona.pais" @change="onChangeRegion">
              <el-option
                      v-for="item in regions"
                      :key="item.id"
                      :label="item.nombre"
                      :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="5">
          <el-form-item label="Ciudad" class="fluid-width" prop="municipio_id">
            <el-select filterable v-model="persona.municipio_id" :disabled="persona.region === '' || !persona.region">
              <el-option
                      v-for="item in municipalities"
                      :key="item.id"
                      :label="item.nombre"
                      :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>

    <el-row class="m-bottom-2">
      <el-col :xs="24" :sm="12">
        <el-checkbox v-model="add_contact">Asignar a contacto</el-checkbox>
        <el-checkbox v-model="add_schedule">Asignar horario</el-checkbox>
      </el-col>
    </el-row>

    <!-- Contact -->
    <el-row v-if="add_contact">
      <h3>Asignar - Cliente Contacto</h3>
    </el-row>
    <el-row class="m-bottom-2" v-if="add_contact">
      <el-col>
        <span>Búsqueda de cliente Empresa</span>
        <el-select
                v-model="selectedClient"
                filterable
                clearable
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
    <!-- End Contact -->

    <!-- Schedule -->
    <el-row v-if="add_schedule">
      <h3>Horario del Cliente</h3>
    </el-row>
    <el-row :gutter="20" v-if="add_schedule">
      <el-form label-position="top">
        <el-col :xs="24" :sm="5">
          <el-form-item label="Nombre Condición">
            <el-input></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="4">
          <el-form-item label="Fecha Inicio" class="fluid-width">
            <el-date-picker
                    v-model="client_horario.fecha_inicio"
                    type="date"
                    placeholder="Seleccione">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="4">
          <el-form-item label="Fecha Termino" class="fluid-width">
            <el-date-picker
                    v-model="client_horario.fecha_termina"
                    type="date"
                    placeholder="Seleccione">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="3">
          <el-form-item label="Hora Inicio" class="fluid-width">
            <el-time-select
                    v-model="client_horario.hora_inicio"
                    placeholder="Seleccione">
            </el-time-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="3">
          <el-form-item label="Hora Fin" class="fluid-width">
            <el-time-select
                    v-model="client_horario.hora_fin"
                    placeholder="Seleccione">
            </el-time-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="5">
          <el-form-item label="Días">
            <el-select
                    v-model="client_horario.dias"
                    multiple
                    collapse-tags
                    placeholder="Seleccione">
              <el-option
                      v-for="item in dias"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <el-row class="m-bottom-1" v-if="add_schedule">
      <p>Vista Horario - Jornada Diaria y especial de asignaciones del cliente.</p>
    </el-row>
    <el-row class="m-bottom-2" v-if="add_schedule">
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
    <!-- Schedule -->

    <el-row class="m-bottom-2">
      <el-col>
        <el-button type="primary" class="float-right" @click="savePersona" :loading="loading">
          Guardar
        </el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import moment from 'moment';
    export default {
        data () {
            return{
                loading: false,
                add_contact: false,
                add_schedule: false,
                remoteClients: [],
                remoteContacts: [],
                selectedClient: null,
                selectedContact: null,
                selectedClientData: null,
                selectedContactData: null,

                persona: {
                    id: null,
                    nombre: '',
                    primerApellido: '',
                    segundoApellido: '',
                    rut: '',
                    genero: null,
                    estadoCivil: null,
                    correoElectronico: '',
                    telefono: '',
                    telefonoFijo: '',
                    municipio_id: '',
                    region: '',
                    pais: '',
                    fechaNacimiento: ''
                },
                personaRules: {
                    nombre: [
                        {required: true, message: 'Campo requerido'}
                    ],
                    primerApellido: [
                        {required: true, message: 'Campo requerido'}
                    ],
                    segundoApellido: [
                        {required: true, message: 'Campo requerido'}
                    ],
                    rut: [
                        {required: true, message: 'Campo requerido'}
                    ],
                    genero: [
                        {required: true, message: 'Campo requerido'}
                    ],
                    estadoCivil: [
                        {required: true, message: 'Campo requerido'}
                    ],
                    fechaNacimiento: [
                        {required: true, message: 'Campo requerido'}
                    ],
                    correoElectronico: [
                        {required: true, type: 'email', message: 'Campo requerido'}
                    ],
                    telefono: [
                        {required: true, message: 'Campo requerido'}
                    ],
                    telefonoFijo: [
                        {required: true, message: 'Campo requerido'}
                    ],
                    pais: [
                        {required: true, message: 'Campo requerido'}
                    ],
                    region: [
                        {required: true, message: 'Campo requerido'}
                    ],
                    municipio_id: [
                        {required: true, message: 'Campo requerido'}
                    ]
                },
                regionLoaded: false,

                client_contact: {
                    nombre: '',
                    apellido_materno: '',
                    apellido_paterno: '',
                    rut: '',
                    fecha_nacimiento: '',
                    genero: '',
                    nacionalidad: '',
                    estado_civil: '',
                    correo_electronico: '',
                    telefono_fijo: '',
                    telefono_movil_1: '',
                    telefono_movil_2: '',
                    cargo_informado: ''
                },
                client_horario: {
                    nombre: '',
                    fecha_inicio: '',
                    fecha_termina: '',
                    hora_inicio: '',
                    hora_fin: '',
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
                action: 'add',
                countries: [],
                regions: [],
                municipalities: [],
                dias: [
                    {
                        label: 'Lunes',
                        value: 'Lunes'
                    },
                    {
                        label: 'Martes',
                        value: 'Martes'
                    },
                    {
                        label: 'Miércoles',
                        value: 'Miércoles'
                    },
                    {
                        label: 'Jueves',
                        value: 'Jueves'
                    },
                    {
                        label: 'Viernes',
                        value: 'Viernes'
                    },
                    {
                        label: 'Sábado',
                        value: 'Sábado'
                    },
                    {
                        label: 'Domingo',
                        value: 'Domingo'
                    }
                ],
                tableData: [
                    {nombre: 'Jornada laboral 1	', cantidad_horas: 8.5, inicial: '09:00 AM', final: '18:30 PM', jornada: 'Lunes; Martes; Miércoles; Jueves.', fecha_inicio: '01/01/16', fecha_final: '02/01/17'},
                    {nombre: 'Jornada laboral 2', cantidad_horas: 7.5, inicial: '09:00 AM', final: '17:30 PM', jornada: 'Viernes.', fecha_inicio: '01/01/16', fecha_final: '02/01/16'},
                    {nombre: 'Colación', cantidad_horas: 1, inicial: '13:00 AM', final: '15:00 PM', jornada: 'Lunes; Martes; Miércoles; Jueves.', fecha_inicio: '01/01/16', fecha_final: '02/01/17'},
                    {nombre: '17 Septiembre	', cantidad_horas: 5, inicial: '09:00 AM', final: '15:00 PM', jornada: 'Jueves', fecha_inicio: '17/09/16', fecha_final: '17/09/16'},
                ],
            }
        },
        mounted(){
            this.getCountries();
        },
        watch: {
            regionLoaded: function (val) {
                this.getMunicipalities();
            }
        },
        methods: {
            remoteClient(query) {
                if (query !== '' && query.length >= 2) {
                    this.loadingRemote = true;
                    http.get('api/empresas/', {
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
            remoteContact(query) {
                if (query !== '' && query.length >= 2) {
                    this.loadingRemote = true;
                    http.get('api/personas/', {
                        params: {
                            dato: query,
                            sin_paginacion: true
                        }
                    }).then(res=>{
                        this.remoteContacts = res.data.data;
                    }).catch(err=>{
                        this.remoteContacts = [];
                    });
                } else {
                    this.remoteContacts = [];
                }
            },
            getCountries(){
                http.get('api/pais/', {
                    params: {
                        sin_paginacion: true
                    }
                }).then(res=>{
                    this.countries = res.data.results.data;
                });
            },
            getRegions(){
                http.get('api/regiones/', {
                    params: {
                        sin_paginacion: true,
                        id_pais: this.persona.pais
                    }
                }).then(res=>{
                    this.regions = res.data.results.data;
                    this.regionLoaded = !this.regionLoaded;
                });
            },
            getMunicipalities(){
                http.get('api/municipios/', {
                    params: {
                        sin_paginacion: true,
                        id_region: this.persona.region
                    }
                }).then(res=>{
                    this.municipalities = res.data.results.data;
                });
            },
            onChangePais(){
                this.regions = [];
                this.municipalities = [];
                this.persona.region = '';
                this.persona.municipio_id = '';
                this.getRegions();
            },
            onChangeRegion(){
                this.municipalities = [];
                this.persona.municipio_id = '';
                this.getMunicipalities();
            },
            handleEdit(){
                this.action = 'edit';
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
                console.log(this.selectedContactData);
                this.getRegions();
            },
            remoteClientChange(val){
                this.selectedClientData = this.remoteClients.find((item)=>{
                    return item.id === val;
                });
            },
            remoteContactChange(val){
                this.selectedContactData = this.remoteContacts.find((item)=>{
                    return item.id === val;
                });
            },
            handleAssign(){

            },
            savePersona(){
                this.$refs.formPersona.validate(valid=>{
                    if(valid){
                        this.loading = true;
                        this.persona.fechaNacimiento = moment(this.persona.fechaNacimiento).format("YYYY-MM-DD");
                        if(this.action === 'add'){
                            if(this.selectedClient){
                                http.post('api/personas/', this.persona).then(res=>{
                                    let persona_id = res.data.data.id;
                                    this.$refs.formPersona.resetFields();
                                    http.post('api/empresaContactos/', {
                                        persona_id: persona_id,
                                        empresa_id: this.selectedClientData.id,
                                        cargo: 'Empresa'
                                    }).then(res=>{
                                        this.loading = false;
                                        this.$notify.success('Datos almacenados');
                                        this.selectedClient = null;
                                    }).catch(err=>{
                                        this.$notify.error('Error al guardar contacto.');
                                        this.loading = false;
                                    });
                                }).catch(err=>{
                                    this.$notify.error(err.response.data && err.response.data.message ? err.response.data.message : 'No fue posible guardar los datos.');
                                    this.loading = false;
                                });
                            }else{
                                http.post('api/personas/', this.persona).then(res=>{
                                    this.loading = false;
                                    this.$notify.success('Datos guardados.');
                                    this.$refs.formPersona.resetFields();
                                }).catch(err=>{
                                    this.$notify.error(err.response.data && err.response.data.message ? err.response.data.message : 'No fue posible guardar los datos.');
                                    this.loading = false;
                                });
                            }
                        }else{
                            http.put('api/personas/'+ this.persona.id + '/', this.persona).then(res=>{
                                this.loading = false;
                                this.$notify.success('Datos actualizados.');
                                this.$refs.formPersona.resetFields();
                            }).catch(err=>{
                                this.$notify.error(err.response.data && err.response.data.message ? err.response.data.message : 'No fue posible guardar los datos.');
                                this.loading = false;
                            });
                        }
                    }
                });
            }
        }
    }
</script>