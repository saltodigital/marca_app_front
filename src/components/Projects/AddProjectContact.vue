<template>
  <div>
    <el-row class="m-bottom-1">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">Inicio</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/projects' }">Proyectos</el-breadcrumb-item>
        <el-breadcrumb-item>Nuevo Contacto Proyecto</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-row class="m-bottom-1">
      <p>Ingreso/Actualización de Clientes Proyecto.</p>
    </el-row>
    <el-row class="m-bottom-2">
      <el-col>
        <span>Búsqueda de cliente contacto</span>
        <el-select
                v-model="selectedClient"
                filterable
                clearable
                remote
                reserve-keyword
                placeholder="Buscar"
                :remote-method="remoteMethod"
                :loadingRemote="loadingRemote">
          <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
          </el-option>
        </el-select>
        <el-button :disabled="!selectedClient" @click="handleEdit">
          Editar
        </el-button>
      </el-col>
    </el-row>
    <el-row>
      <h3>Detalle - Cliente Contacto</h3>
    </el-row>

    <el-row :gutter="20" class="m-bottom-3">
      <el-form label-position="top" :model="persona" :rules="persona_rules" ref="formPersona">
        <el-col :xs="24" :sm="6">
          <el-form-item label="Nombres" class="fluid-width" prop="nombres">
            <el-input v-model="persona.nombres"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="6">
          <el-form-item label="Apellido Materno" class="fluid-width" prop="apellidoMaterno">
            <el-input v-model="persona.apellidoMaterno"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="6">
          <el-form-item label="Apellido Paterno" class="fluid-width" prop="apellidoPaterno">
            <el-input v-model="persona.apellidoPaterno"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="6">
          <el-form-item label="RUT" class="fluid-width" prop="rut">
            <el-input v-model="persona.rut"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="6">
          <el-form-item label="Fecha de nacimiento" class="fluid-width" prop="fechaNacimiento">
            <el-date-picker
                    v-model="persona.fechaNacimiento"
                    type="date"
                    format="dd-MM-yyyy"
                    placeholder="Seleccione">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="6">
          <el-form-item label="Género" class="fluid-width" prop="genero">
            <el-select v-model="persona.genero">
              <el-option
                      v-for="item in generos"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="6">
          <el-form-item label="Estado Civil" class="fluid-width" prop="estadoCivil">
            <el-select v-model="persona.estadoCivil">
              <el-option
                      v-for="item in estadosCivil"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="6">
          <el-form-item label="Correo Electrónico" class="fluid-width" prop="correoElectronico">
            <el-input v-model="persona.correoElectronico">contact</el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="4">
          <el-form-item label="Teléfono Móvil" class="fluid-width" prop="telefonoMovil">
            <el-input v-model="persona.telefonoMovil"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="5">
          <el-form-item label="Teléfono Fijo" class="fluid-width" prop="telefonoFijo">
            <el-input v-model="persona.telefonoFijo"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="5">
          <el-form-item label="País" class="fluid-width" prop="pais">
            <el-select filterable v-model="persona.pais" @change="getEstados">
              <el-option
                      v-for="item in paises"
                      :key="item.id"
                      :label="item.nombre"
                      :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="5">
          <el-form-item label="Estado" class="fluid-width" prop="estado">
            <el-select v-model="persona.estado"
                       @change="getCiudades"
                       :disabled="persona.pais === '' || persona.pais === null">
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
          <el-form-item label="Ciudad" class="fluid-width" prop="cuidad">
            <el-select v-model="persona.ciudad" :disabled="persona.estado === '' || persona.estado === null">
              <el-option
                      v-for="item in ciudades"
                      :key="item.id"
                      :label="item.nombre"
                      :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24">
          <el-button type="primary" @click="createContact">
            Crear contacto
          </el-button>
        </el-col>
      </el-form>
    </el-row>
    <div v-if="contact_created">
      <el-row>
        <h3>Asignar Proyecto</h3>
      </el-row>

      <el-row class="m-bottom-2">
        <el-col>
          <span>Búsqueda de proyectos</span>
          <el-select
                  v-model="selectedClient"
                  filterable
                  clearable
                  remote
                  reserve-keyword
                  placeholder="Buscar"
                  :remote-method="remoteMethod"
                  :loadingRemote="loadingRemote">
            <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
          </el-select>
          <el-button :disabled="!selectedClient" @click="handleEdit">
            Asignar
          </el-button>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-form label-position="top">
          <el-col :xs="24" :sm="8">
            <el-form-item label="Nombre Proyecto" class="fluid-width">
              <el-input></el-input>
            </el-form-item>
            <el-row :gutter="20">
              <el-col :xs="24" :sm="12">
                <el-form-item label="Fecha Inicio" class="fluid-width">
                  <el-date-picker
                          v-model="client_horario.fecha_inicio"
                          type="date"
                          placeholder="Seleccione">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12">
                <el-form-item label="Fecha Termino" class="fluid-width">
                  <el-date-picker
                          v-model="client_horario.fecha_termina"
                          type="date"
                          placeholder="Seleccione">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>

          <el-col :xs="24" :sm="16">
            <el-form-item label="Breve Descripción" class="fluid-width">
              <el-input type="textarea" :rows="6"></el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>

      <el-row>
        <el-button type="primary" class="float-right">
          Guardar
        </el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
    mounted(){
        this.list = this.clients.map(item => {
            return { value: item, label: item };
        });

        this.getPaises();
    },
    data () {
      return{
          persona: {
              nombres: '',
              apellidoMaterno: '',
              apellidoPaterno: '',
              rut: '',
              fechaNacimiento: '',
              genero: '',
              estadoCivil: '',
              correoElectronico: '',
              telefonoFijo: '',
              telefonoMovil: '',
              pais: '',
              estado: '',
              ciudad: ''
          },
          persona_rules: {
              nombres: [
                  {required: true, message: 'Campo requerido'}
              ],
              apellidoMaterno: [
                  {required: true, message: 'Campo requerido'}
              ],
              apellidoPaterno: [
                  {required: true, message: 'Campo requerido'}
              ],
              rut: [
                  {required: true, message: 'Campo requerido'}
              ],
              fechaNacimiento: [
                  {required: true, type: 'date', message: 'Selecciona una fecha válida'}
              ],
              genero: [
                  {required: true, message: 'Seleccione una opción'}
              ],
              estadoCivil: [
                  {required: true, message: 'Seleccione una opción'}
              ],
              correoElectronico: [
                  {required: true, type: 'email', message: 'Escriba un correo válido'}
              ],
              telefonoFijo: [
                  {required: true, message: 'Campo requerido'}
              ],
              telefonoMovil: [
                  {required: true, message: 'Campo requerido'}
              ],
              pais: [
                  {required: true, message: 'Seleccione una opción'}
              ],
              estado: [
                  {required: true, message: 'Seleccione una opción'}
              ],
              ciudad: [
                  {required: true, message: 'Seleccione una opción'}
              ]

          },
          generos: [
              {label: 'Masculino', value: '1'},
              {label: 'Femenino', value: '2'},
          ],
          estadosCivil: [
              {label: 'Casado', value: 'Casado'},
              {label: 'Soltero', value: 'Soltero'},
              {label: 'Divorciado', value: 'Divorciado'},
              {label: 'Viudo', value: 'Viudo'},
              {label: 'Otro', value: 'Otro'},
          ],
          contact_created: false,
          paises: [],
          estados: [],
          ciudades: [],

          client_business: {
              nombre_empresa: '',
              nombre_fantasia: '',
              rut: '',
              fecha_registro: '',
              estado_cliente: '',
              fecha_estado: '',
              pais: '',
              region: '',
              ciudad: '',
              calle: '',
              numero: '',
              latitud: '',
              longitud: '',
              codigo_postal: '',
              ip: '',

          },
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
          selectedClient: null,
          selectedClientContact: null,
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
          status: [{
              value: 'Option1',
              label: 'Option1'
          }, {
              value: 'Option2',
              label: 'Option2'
          }, {
              value: 'Option3',
              label: 'Option3'
          }],
          countries: [],
          regions: [],
          cities: [],
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
          ]
      }
    },
    methods: {
        remoteMethod(query) {
            if (query !== '') {
                this.loadingRemote = true;
                setTimeout(() => {
                    this.loadingRemote = false;
                    this.options = this.list.filter(item => {
                        return item.label.toLowerCase()
                            .indexOf(query.toLowerCase()) > -1;
                    });
                }, 200);
            } else {
                this.options = [];
            }
        },
        handleEdit(){
            this.action = 'edit';
            this.selectedClient = null;
        },
        getPaises(){
            http.get('api/pais/').then(res=>{
                this.paises = res.data.data;
            });
        },
        getEstados(){
            http.get('api/regiones/', {id: this.persona.pais}).then(res=>{
                this.estados = res.data.data;
            });
        },
        getCiudades(){
            http.get('api/municipios/', {id: this.persona.estado}).then(res=>{
                this.estados = res.data.data;
            });
        },
        createContact(){
            this.$refs.formPersona.validate(valid=>{
               if(valid){
                   this.$message.success('ok');
               }
            });
        }
    }
}
</script>