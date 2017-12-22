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
      <el-form label-position="top" :model="client_contact">
        <el-col :xs="24" :sm="5">
          <el-upload
                  class="avatar-uploader"
                  action="/"
                  :show-file-list="false"
                  :on-change="beforeImageUpload"
                  :auto-upload="false"
                  :on-success="handleImageSuccess">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-col>
        <el-col :xs="24" :sm="6">
          <el-form-item label="Nombre" class="fluid-width" prop="nombre">
            <el-input v-model="client_contact.nombre"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="6">
          <el-form-item label="Apellido Materno" class="fluid-width" prop="apellido_materno">
            <el-input v-model="client_contact.apellido_materno"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="6">
          <el-form-item label="Apellido Paterno" class="fluid-width" prop="apellido_paterno">
            <el-input v-model="client_contact.apellido_paterno"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="6">
          <el-form-item label="RUT" class="fluid-width" prop="rut">
            <el-input v-model="client_contact.rut"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="6">
          <el-form-item label="Fecha de nacimiento" class="fluid-width" prop="fecha_nacimiento">
            <el-date-picker
                    v-model="client_contact.fecha_nacimiento"
                    type="date"
                    placeholder="Seleccione">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="6">
          <el-form-item label="Género" class="fluid-width" prop="genero">
            <el-select v-model="client_contact.genero">
              <el-option
                      v-for="item in [{label: 'Masculino', value: 'masculino'},{label: 'Femenino', value: 'femenino'}]"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="6">
          <el-form-item label="Nacionalidad" class="fluid-width" prop="nacionalidad">
            <el-input v-model="client_contact.nacionalidad"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="6">
          <el-form-item label="Estado Civil" class="fluid-width" prop="estado_civil">
            <el-select v-model="client_contact.estado_civil">
              <el-option
                      v-for="item in [{label: 'Soltero', value: 'soltero'},{label: 'Casado', value: 'casado'}]"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="6">
          <el-form-item label="Correo Electrónico" class="fluid-width" prop="correo_electronico">
            <el-input v-model="client_contact.correo_electronico">contact</el-input>
          </el-form-item>
        </el-col>

        <el-col :xs="24" :sm="6">
          <el-form-item label="Teléfono Fijo" class="fluid-width" prop="telefono_fijo">
            <el-input v-model="client_contact.telefono_fijo"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="6">
          <el-form-item label="Teléfono Móvil 1" class="fluid-width" prop="telefono_movil_1">
            <el-input v-model="client_contact.telefono_movil_1"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="6">
          <el-form-item label="Teléfono Móvil 2" class="fluid-width" prop="telefono_movil_2">
            <el-input v-model="client_contact.telefono_movil_2"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="6">
          <el-form-item label="Cargo Informado" class="fluid-width" prop="cargo_informado">
            <el-select v-model="client_contact.cargo_informado">
              <el-option
                      v-for="item in []"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
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
</template>

<script>
export default {
    mounted(){
        this.list = this.clients.map(item => {
            return { value: item, label: item };
        });
        /*
        http.get('api/pais/').then(res=>{
            console.log(res);
        });*/
    },
    data () {
      return{
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
          ],
          imageUrl: null
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
        handleImageSuccess(res, file) {
            console.log(file);
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeImageUpload(file, fileList) {
            console.log(file);
            this.imageUrl = URL.createObjectURL(file.raw);
        }
    }
}
</script>