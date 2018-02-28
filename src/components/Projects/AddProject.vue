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
        <span>Búsqueda de proyectos</span>
        <el-select
                v-model="selectedProject"
                filterable
                clearable
                remote
                reserve-keyword
                placeholder="Buscar proyecto"
                @change="remoteProjectChange"
                :remote-method="remoteProject"
                :loadingRemote="loadingRemote">
          <el-option
                  v-for="item in listProjets"
                  :key="item.id"
                  :label="item.nombre"
                  :value="item.id">
          </el-option>
        </el-select>
        <el-button :disabled="!selectedProject" @click="handleEdit">
          Editar
        </el-button>
      </el-col>
    </el-row>
    <el-row>
      <h3>Detalle - Cliente Empresa</h3>
    </el-row>
    <el-row :gutter="20">
      <el-form label-position="top" :model="proyecto" :rules="proyectoRules" ref="formProyecto">
        <el-col :xs="24" :sm="6">
          <el-form-item label="Nombre" class="fluid-width" prop="nombre">
            <el-input v-model="proyecto.nombre"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="6">
          <el-form-item label="Valor adjudicado" class="fluid-width" prop="valorAdjudicado">
            <el-input-number :controls="false" v-model="proyecto.valorAdjudicado"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="6">
          <el-form-item label="Fecha Inicio" class="fluid-width" prop="fechaInicio">
            <el-date-picker
                    v-model="proyecto.fechaInicio"
                    type="date"
                    format="dd-MM-yyyy"
                    placeholder="Seleccione">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="6">
          <el-form-item label="Fecha Fin" class="fluid-width" prop="fechaFin">
            <el-date-picker
                    v-model="proyecto.fechaFin"
                    type="date"
                    format="dd-MM-yyyy"
                    placeholder="Seleccione">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="9">
          <el-form-item label="Breve Descripción" class="fluid-width" prop="descripcion">
            <el-input type="textarea" v-model="proyecto.descripcion" :rows="6"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="5">
          <el-form-item label="País" class="fluid-width" prop="pais">
            <el-select v-model="proyecto.pais" filterable @change="onChangePais">
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
            <el-select v-model="proyecto.region" filterable :disabled="proyecto.pais === '' || !proyecto.pais" @change="onChangeRegion">
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
            <el-select v-model="proyecto.municipio_id" :disabled="proyecto.region === '' || !proyecto.region">
              <el-option
                      v-for="item in municipalities"
                      :key="item.id"
                      :label="item.nombre"
                      :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="5">
          <el-form-item label="Estado proyecto" class="fluid-width" prop="estado_id">
            <el-select v-model="proyecto.estado_id">
              <el-option
                      v-for="item in estados"
                      :key="item.id"
                      :label="item.nombre"
                      :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="5">
          <el-form-item label="Tipo proyecto" class="fluid-width" prop="tipo_id">
            <el-select v-model="proyecto.tipo_id">
              <el-option
                      v-for="item in tipos"
                      :key="item.id"
                      :label="item.nombre"
                      :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="5">
          <el-form-item label="Empresa" class="fluid-width" prop="empresa_id">
            <el-select
                    v-model="proyecto.empresa_id"
                    filterable
                    clearable
                    remote
                    reserve-keyword
                    placeholder="Buscar empresa"
                    :remote-method="remoteEmpresa"
                    :loadingRemote="loadingRemote">
              <el-option
                      v-for="item in listEmpresas"
                      :key="item.id"
                      :label="item.nombre"
                      :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="6">
          <el-form-item label="Latitud" class="fluid-width" prop="latitud">
            <el-input :disabled="true" v-model="proyecto.latitud">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="6">
          <el-form-item label="Longitud" class="fluid-width" prop="longitud">
            <el-input :disabled="true" v-model="proyecto.longitud">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="6">
          <el-button class="form-item-space" icon="el-icon-location"  @click="mapVisible = true">Seleccionar coordenadas</el-button>
          <el-dialog title="Buscar coordenadas" :visible.sync="mapVisible" @open="handleOpenMap">
            <input ref="pacInput" class="pac-input controls" type="text" placeholder="Buscar ubicación">
            <div class="map" ref="map"></div>
            <br>
            <el-button size="mini" @click="mapVisible = false">Aceptar</el-button>
          </el-dialog>
        </el-col>
      </el-form>
    </el-row>

    <el-row class="m-bottom-2">
      <el-col :xs="24" :sm="12">
        <el-checkbox v-model="add_contact">Asignar contacto</el-checkbox>
      </el-col>
    </el-row>

    <!-- Contact -->
    <el-row v-if="add_contact">
      <h3>Asignar - Proyecto Contacto</h3>
    </el-row>
    <el-row class="m-bottom-2" v-if="add_contact">
      <el-col>
        <span>Búsqueda de Proyecto Contacto</span>
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

    <el-row>
      <el-button type="primary" class="float-right" @click="saveProyecto" :loading="loading">
        Guardar
      </el-button>
    </el-row>
  </div>
</template>

<script>
import moment from 'moment';
export default {
    mounted(){
        this.getCountries();
        this.getEstados();
        this.getTipos();
    },
    watch: {
        regionLoaded: function (val) {
            this.getMunicipalities();
        }
    },
    data () {
      return{
          add_contact: false,
          selectedContactContact: null,
          remoteContacts: [],
          selectedContactData: null,

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
              estado_id: null,
              tipo_id: null,

              pais: null,
              region: null
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
          loadingRemote: false,
          listProjets: [],
          selectedProjectData: null,
          selectedProject: null,
          action: 'add',
          loading: false,
          countries: [],
          regions: [],
          municipalities: [],
          regionLoaded: false,

          listEmpresas: [],

          tipos: [],
          estados: [],
          mapVisible: false,
          map: null,
          marker: null
      }
    },
    methods: {
        remoteProject(query) {
            if (query !== '' && query.length >= 2) {
                this.loadingRemote = true;
                http.get('api/proyectos/', {
                    params: {
                        dato: query,
                        sin_paginacion: true
                    }
                }).then(res=>{
                    this.listProjets = res.data.data;
                }).catch(err=>{
                    this.listProjets = [];
                });
            } else {
                this.listProjets = [];
            }
        },
        remoteEmpresa(query) {
            if (query !== '' && query.length >= 2) {
                this.loadingRemote = true;
                http.get('api/empresas/', {
                    params: {
                        dato: query,
                        sin_paginacion: true
                    }
                }).then(res=>{
                    this.listEmpresas = res.data.data;
                }).catch(err=>{
                    this.listEmpresas = [];
                });
            } else {
                this.listEmpresas = [];
            }
        },
        remoteProjectChange(val){
            this.selectedProjectData = this.listProjets.find((item)=>{
                return item.id === val;
            });
        },
        handleEdit(){
            this.action = 'edit';
            this.selectedProject = null;
            console.log(this.selectedProjectData);
            this.proyecto = {
                id: this.selectedProjectData.id,
                nombre: this.selectedProjectData.nombre,
                descripcion: this.selectedProjectData.descripcion,
                valorAdjudicado: this.selectedProjectData.valorAdjudicado,
                latitud: this.selectedProjectData.latitud,
                longitud: this.selectedProjectData.longitud,
                fechaInicio: this.selectedProjectData.fechaInicio,
                fechaFin: this.selectedProjectData.fechaFin,
                municipio_id: this.selectedProjectData.municipio.id,
                region: this.selectedProjectData.municipio.region.id,
                pais: this.selectedProjectData.municipio.region.pais.id,
                empresa_id: this.selectedProjectData.empresa.id,
                //estado_id: this.selectedProjectData.estado.id,
                //tipo_id: this.selectedProjectData.tipo.id,
            };
            this.getRegions();
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
                    id_pais: this.proyecto.pais
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
                    id_region: this.proyecto.region
                }
            }).then(res=>{
                this.municipalities = res.data.results.data;
            });
        },
        onChangePais(){
            this.regions = [];
            this.municipalities = [];
            this.proyecto.region = '';
            this.proyecto.municipio_id = '';
            this.getRegions();
        },
        onChangeRegion(){
            this.municipalities = [];
            this.proyecto.municipio_id = '';
            this.getMunicipalities();
        },
        getEstados(){
            http.get('api/estados/', {
                params: {
                    sin_paginacion: true
                }
            }).then(res=>{
                this.estados = res.data.results.data;
            });
        },
        getTipos(){
            http.get('api/tipos/', {
                params: {
                    sin_paginacion: true
                }
            }).then(res=>{
                this.tipos = res.data.results.data;
            });
        },
        handleOpenMap(){
            setTimeout(()=>{
                this.map = new google.maps.Map(this.$refs.map, {
                    center: {lat: -26.7003141, lng: -69.7481861},
                    zoom: 13,
                    mapTypeId: 'roadmap'
                });
                // Create the search box and link it to the UI element.
                let input = this.$refs.pacInput;
                let searchBox = new google.maps.places.SearchBox(input);
                this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

                // Bias the SearchBox results towards current map's viewport.
                this.map.addListener('bounds_changed', () => {
                    searchBox.setBounds(this.map.getBounds());
                });

                // Listen for the event fired when the user selects a prediction and retrieve
                // more details for that place.
                searchBox.addListener('places_changed', () => {
                    let places = searchBox.getPlaces();

                    if (places.length == 0) {
                        return;
                    }

                    // Clear out the old markers.
                    if(this.marker !== null){
                        this.marker.setMap(null);
                    }

                    // For each place, get the icon, name and location.
                    let bounds = new google.maps.LatLngBounds();
                    places.forEach( (place) => {
                        if (!place.geometry) {
                            console.log("Returned place contains no geometry");
                            return;
                        }

                        // Create a marker for each place.
                        this.marker = new google.maps.Marker({
                            map: this.map,
                            title: place.name,
                            position: place.geometry.location,
                            draggable: true,
                        });

                        this.marker.addListener('dragend', ()=>{
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
                    if(this.action === 'add'){
                        if(this.selectedContactContact){
                            http.post('api/proyectos/', this.proyecto).then(res=>{
                                let proyecto_id = res.data.data.id;
                                this.$refs.formProyecto.resetFields();
                                http.post('api/proyectoContactos/', {
                                    proyecto_id: proyecto_id,
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
                            http.post('api/proyectos/', this.proyecto).then(res=>{
                                this.loading = false;
                                this.$notify.success('Datos guardados.');
                                this.$refs.formProyecto.resetFields();
                            }).catch(err=>{
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
        remoteContactChange(val){
            this.selectedContactData = this.remoteContacts.find((item)=>{
                return item.id === val;
            });
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
    }
}
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
  .pac-container{
    z-index: 9999;
  }

  .pac-input:focus {
    border-color: #4d90fe;
  }
</style>