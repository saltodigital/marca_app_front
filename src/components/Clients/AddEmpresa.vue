<template>
  <div>
    <el-row class="m-bottom-1">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">Inicio</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/clients' }">Clientes</el-breadcrumb-item>
        <el-breadcrumb-item>Nuevo Cliente Empresa</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-row class="m-bottom-1">
      <p>Ingreso/Actualización de Clientes Empresa.</p>
    </el-row>
    <el-row class="m-bottom-2">
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
        <el-button :disabled="!selectedClient" @click="handleEdit">
          Editar
        </el-button>
      </el-col>
    </el-row>
    <el-row>
      <h3>Detalle - Cliente Empresa</h3>
    </el-row>
    <el-row :gutter="20" class="m-bottom-2">
      <el-card class="p-bottom-2">
        <el-form label-position="top" :model="empresa" :rules="empresaRules" ref="formEmpresa">
          <el-col :xs="24" :sm="6">
            <el-form-item label="Nombre empresa" class="fluid-width" prop="nombre">
              <el-input v-model="empresa.nombre"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="6">
            <el-form-item label="Nombre fantasia" class="fluid-width" prop="nombre_fantasia">
              <el-input v-model="empresa.nombre_fantasia"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="6">
            <el-form-item label="RUT" class="fluid-width" prop="rut">
              <el-input v-model="empresa.rut"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="6">
            <el-form-item label="Correo Electrónico" class="fluid-width" prop="correoElectronico">
              <el-input v-model="empresa.correoElectronico"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="6">
            <el-form-item label="Estado del cliente" class="fluid-width" prop="estado_cliente">
              <el-select v-model="empresa.estado_cliente">
                <el-option
                        v-for="item in [{value: '1', label: 'Activo'}, {value: '2', label: 'Inactivo'}]"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="6">
            <el-form-item label="Fecha Estado del Proyecto" class="fluid-width" prop="fecha_estado">
              <el-date-picker
                      v-model="empresa.fecha_estado"
                      type="date"
                      format="dd-MM-yyyy"
                      placeholder="Seleccione">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="6">
            <el-form-item label="Teléfono" class="fluid-width" prop="telefono">
              <el-input v-model="empresa.telefono"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="6">
            <el-form-item label="Teléfono Fijo" class="fluid-width" prop="telefonoFijo">
              <el-input v-model="empresa.telefonoFijo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="6">
            <el-form-item label="País" class="fluid-width" prop="pais">
              <el-select filterable v-model="empresa.pais" @change="onChangePais">
                <el-option
                        v-for="item in countries"
                        :key="item.id"
                        :label="item.nombre"
                        :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="6">
            <el-form-item label="Región" class="fluid-width" prop="region">
              <el-select filterable v-model="empresa.region" :disabled="empresa.pais === '' || !empresa.pais" @change="onChangeRegion">
                <el-option
                        v-for="item in regions"
                        :key="item.id"
                        :label="item.nombre"
                        :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="6">
            <el-form-item label="Ciudad" class="fluid-width" prop="municipio_id">
              <el-select filterable v-model="empresa.municipio_id" :disabled="empresa.region === '' || !empresa.region">
                <el-option
                        v-for="item in municipalities"
                        :key="item.id"
                        :label="item.nombre"
                        :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="6">
            <el-form-item label="Nombre Calle" class="fluid-width" prop="direccion">
              <el-input placeholder="Buscar calle..." v-model="empresa.direccion">
                <el-button slot="append" icon="el-icon-location"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="6">
            <el-form-item label="Número" class="fluid-width" prop="numero">
              <el-input v-model="empresa.numero"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="6">
            <el-form-item label="Latitude" class="fluid-width" prop="latitud">
              <el-input v-model="empresa.latitud"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="6">
            <el-form-item label="Longitud" class="fluid-width" prop="longitud">
              <el-input v-model="empresa.longitud"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="6">
            <el-form-item label="Código Postal" class="fluid-width" prop="codigo_postal">
              <el-input v-model="empresa.codigo_postal"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="6">
            <el-form-item label="IP" class="fluid-width" prop="ip">
              <el-input v-model="empresa.ip"></el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </el-card>
    </el-row>

    <el-row class="m-bottom-2">
      <el-col :xs="24" :sm="12">
        <el-checkbox v-model="add_contact">Asignar contacto</el-checkbox>
        <el-checkbox v-model="add_schedule">Asignar horario</el-checkbox>
      </el-col>
    </el-row>

    <!-- Contact -->
    <el-row v-if="add_contact">
      <h3>Asignar - Cliente Contacto</h3>
    </el-row>
    <el-row class="m-bottom-2" v-if="add_contact">
      <el-col>
        <span>Búsqueda de Cliente Contacto</span>
        <el-select
                v-model="selectedContactContact"
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
        <el-button type="primary" class="float-right" @click="saveEmpresa" :loading="loading">
          Guardar
        </el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
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

          empresa: {
              id: null,
              nombre: '',
              rut: '',
              direccion: '',
              correoElectronico: '',
              telefono: '',
              telefonoFijo: '',
              municipio_id: '',
              field: 'Empresa',
              region: '',
              pais: '',

              nombre_fantasia: '',
              fecha_registro: '',
              estado_cliente: '',
              fecha_estado: '',
              ciudad: '',
              numero: '',
              latitud: '',
              longitud: '',
              codigo_postal: '',
              ip: '',
          },
          empresaRules: {
              nombre: [
                  {required: true, message: 'Campo requerido'}
              ],
              rut: [
                  {required: true, message: 'Campo requerido'}
              ],
              direccion: [
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
                    id_pais: this.empresa.pais
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
                    id_region: this.empresa.region
                }
            }).then(res=>{
                this.municipalities = res.data.results.data;
            });
        },
        onChangePais(){
            this.regions = [];
            this.municipalities = [];
            this.empresa.region = '';
            this.empresa.municipio_id = '';
            this.getRegions();
        },
        onChangeRegion(){
            this.municipalities = [];
            this.empresa.municipio_id = '';
            this.getMunicipalities();
        },
        handleEdit(){
            this.action = 'edit';
            this.selectedClient = null;
            this.empresa = {
                id: this.selectedClientData.id,
                nombre: this.selectedClientData.nombre,
                rut: this.selectedClientData.rut,
                direccion: this.selectedClientData.direccion,
                correoElectronico: this.selectedClientData.correoElectronico,
                telefono: this.selectedClientData.telefono,
                telefonoFijo: this.selectedClientData.telefonoFijo,
                municipio_id: this.selectedClientData.municipio.id,
                region: this.selectedClientData.municipio.region.id,
                pais: this.selectedClientData.municipio.region.pais.id,
                field: 'Empresa'
            };
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
        saveEmpresa(){
            this.$refs.formEmpresa.validate(valid=>{
               if(valid){
                   this.loading = true;
                   this.empresa.field = "Empresa";
                   if(this.action === 'add'){
                       if(this.selectedContactContact){
                           http.post('api/empresas/', this.empresa).then(res=>{
                               let empresa_id = res.data.data.id;
                               this.$refs.formEmpresa.resetFields();
                               http.post('api/empresaContactos/', {
                                   empresa_id: empresa_id,
                                   persona_id: this.selectedContactContact,
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
                           http.post('api/empresas/', this.empresa).then(res=>{
                               this.loading = false;
                               this.$notify.success('Datos guardados.');
                               this.$refs.formEmpresa.resetFields();
                           }).catch(err=>{
                               this.$notify.error(err.response.data && err.response.data.message ? err.response.data.message : 'No fue posible guardar los datos.');
                               this.loading = false;
                           });
                       }
                   }else{
                       http.put('api/empresas/'+ this.empresa.id + '/', this.empresa).then(res=>{
                           this.loading = false;
                           this.$notify.success('Datos actualizados.');
                           this.$refs.formEmpresa.resetFields();
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
