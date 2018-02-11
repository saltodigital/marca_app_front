<template>
  <div>
    <el-row class="m-bottom-1">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">Inicio</el-breadcrumb-item>
        <el-breadcrumb-item>Nuevo Trabajador</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-row class="m-bottom-1">
      <p>Ingreso/Actualización de Trabajador.</p>
    </el-row>
    <el-row class="m-bottom-2">
      <el-col :span="6" :xs="24">
        <el-form :inline="true">
          <el-form-item label="Búsqueda de Trabajador">
            <el-select v-model="search" filterable remote placeholder="Buscar" :remote-method="getWorker" :loading="selectLoading">
              <el-option v-for="item in workers" :key="item.id" :label="item.nombre + ' ' + item.primerApellido + ' ' + item.segundoApellido"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="6" :xs="24">
        <el-button @click="edit" icon="el-icon-edit" type="primary">
          Editar
        </el-button>
        <el-button @click="reset" v-if="editForm" icon="fa fa-refresh" type="info">
          Reestablecer
        </el-button>
      </el-col>
      </el-col>
    </el-row>
    <el-row>
      <h3>Detalle - Trabajador</h3>
    </el-row>
    <el-row :gutter="20" class="m-bottom-2">
      <el-form label-position="top" ref="form" :rules="rules" :model="form">
        <el-card class="m-bottom-2">
          <div slot="header">
            <strong>Datos Generales</strong>
          </div>
          <el-col :xs="24" :sm="12">
            <el-form-item label="Nombres" class="fluid-width" prop="names">
              <el-input v-model="form.names"> </el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12">
            <el-form-item label="Apellido Paterno" class="fluid-width" prop="first_last_name">
              <el-input v-model="form.first_last_name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12">
            <el-form-item label="Apellido Materno" class="fluid-width" prop="second_last_name">
              <el-input v-model="form.second_last_name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="6">
            <el-form-item label="Rut" class="fluid-width" prop="rut">
              <el-input v-model="form.rut"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="6">
            <el-form-item label="Fecha de Nacimiento" class="fluid-width" prop="birthday">
              <el-date-picker type="date" format="dd-MM-yyyy" v-model="form.birthday">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="6">
            <el-form-item label="Estado Civil" class="fluid-width" prop="civil_status">
              <el-select v-model="form.civil_status">
                <el-option v-for="item in [{value: 'C', label: 'Casado'}, {value: 'S', label: 'Soltero'}, {value: 'O', label: 'Otro'}]" :key="item.value"
                  :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="6">
            <el-form-item label="Genero" class="fluid-width" prop="gender">
              <el-select v-model="form.gender">
                <el-option v-for="item in [{value: '1', label: 'Masculino'}, {value: '2', label: 'Femenino'}]" :key="item.value" :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="6">
            <el-form-item label="Correo Electrónico" class="fluid-width" prop="email">
              <el-input v-model="form.email"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="6">
            <el-form-item label="Teléfono Fijo" class="fluid-width" prop="phone">
              <el-input v-model="form.phone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="6">
            <el-form-item label="Teléfono Movil 1" class="fluid-width" prop="cellphone_one">
              <el-input v-model="form.cellphone_one"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="6">
            <el-form-item label="País" class="fluid-width" prop="country">
              <el-select v-model="form.country" placeholder="Selecccione su Nacionalidad" @input="getRegions(form.country)">
                <el-option v-for="country in countries" :key="country.id" :label="country.nombre" :value="country.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="6">
            <el-form-item label="Región" class="fluid-width" prop="region">
              <el-select v-model="form.region" placeholder="Selecccione su Región" :disabled="form.country ? false : true" @input="getCities(form.region)">
                <el-option v-for="region in regions" :key="region.id" :label="region.nombre" :value="region.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="6">
            <el-form-item label="Ciudad" class="fluid-width" prop="city">
              <el-select filterable v-model="form.city" :disabled="form.region ? false : true">
                <el-option v-for="city in cities" :key="city.id" :label="city.nombre" :value="city.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-card>

        <el-card class="m-bottom-2">
          <div slot="header">
            <strong>Otros Datos</strong>
          </div>
        <el-col :xs="24" :sm="6">
            <el-form-item label="Nacionalidad" class="fluid-width" prop="nationality">
              <el-input v-model="form.nationality"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="6">
            <el-form-item label="Teléfono Movil 2" class="fluid-width" prop="cellphone_two">
              <el-input v-model="form.cellphone_two"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="6">
            <el-form-item label="Cargo" class="fluid-width" prop="position">
              <el-input v-model="form.position"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="6">
            <el-form-item label="Descripción Cargo" class="fluid-width" prop="position_description">
              <el-input v-model="form.position_description"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="6">
            <el-form-item label="Nombre Calle" class="fluid-width" prop="street">
              <el-input v-model="form.street"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="6">
            <el-form-item label="Número" class="fluid-width" prop="number">
              <el-input v-model="form.number"></el-input>
            </el-form-item>
          </el-col>
        </el-card>

        <el-card v-if="!editForm">
          <div slot="header">
            <strong>Datos de Usuario</strong>
          </div>
          <el-col :xs="24" :sm="6">
            <el-form-item label="Nombre de Usuario" class="fluid-width" prop="username">
              <el-input v-model="form.username"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="6">
            <el-form-item label="Contraseña" class="fluid-width" prop="password">
              <el-input v-model="form.password"></el-input>
            </el-form-item>
          </el-col>
        </el-card>
      </el-form>

    </el-row>

    <el-row class="m-bottom-2">
      <el-col :xs="24" :sm="12">
        <el-checkboxcontacto</el-checkbox>
          <el-checkboxhorario</el-checkbox>
      </el-col>
    </el-row>

    <el-row class="m-bottom-2">
      <el-col>
        <el-button type="primary" class="float-right" @click="save('form')" v-if="!editForm" :loading="store">
          Guardar
        </el-button>
        <el-button type="primary" class="float-right" @click="update('form')" v-else :loading="store">
          Editar
        </el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import moment from "moment";
  export default {
    component: "NewEmployee",
    data() {
      return {
        countries: [],
        regions: [],
        cities: [],
        workers: [],
        worker: [],
        search: "",
        editForm: false,
        selectLoading: false,
        store: false,
        rules: {
          names: [{
            required: true,
            message: "Campo requerido"
          }],
          first_last_name: [{
            required: true,
            message: "Campo requerido"
          }],
          second_last_name: [{
            required: true,
            message: "Campo requerido"
          }],
          rut: [{
            required: true,
            message: "Campo requerido"
          }],
          gender: [{
            required: true,
            message: "Campo requerido"
          }],
          civil_status: [{
            required: true,
            message: "Campo requerido"
          }],
          birthday: [{
            required: true,
            message: "Campo requerido"
          }],
          email: [{
            required: true,
            type: "email",
            message: "Campo requerido"
          }],
          cellphone_one: [{
            required: true,
            message: "Campo requerido"
          }],
          cellphone_two: [{
            required: false,
            message: "Campo requerido"
          }],
          phone: [{
            required: true,
            message: "Campo requerido"
          }],
          country: [{
            required: true,
            message: "Campo requerido"
          }],
          position: [{
            required: false,
            message: "Campo requerido"
          }],
          nationality: [{
            required: false,
            message: "Campo requerido"
          }],
          region: [{
            required: true,
            message: "Campo requerido"
          }],
          city: [{
            required: true,
            message: "Campo requerido"
          }],
          password: [{
            required: true,
            message: "Campo requerido"
          }],
          username: [{
            required: true,
            message: "Campo requerido"
          }]
        },
        form1: {
          names: "Cesar",
          first_last_name: "Ramirez",
          second_last_name: "Muñoz",
          rut: "1237565111",
          gender: "2",
          civil_status: "S",
          birthday: "1993-05-07",
          email: "cesar@email.com",
          cellphone_one: "122345111",
          cellphone_two: "",
          phone: "12356543",
          country: 18,
          region: 50,
          city: 21,
          position: "",
          position_description: "",
          nationality: "",
          street: "",
          number: "",
          username: "cesaramirez",
          password: "secret123"
        },
        form: {
          id: null,
          names: "",
          first_last_name: "",
          second_last_name: "",
          rut: "",
          gender: "",
          civil_status: "",
          birthday: "",
          email: "",
          cellphone_one: "",
          cellphone_two: "",
          phone: "",
          country: "",
          region: "",
          city: "",
          position: "",
          position_description: "",
          nationality: "",
          street: "",
          number: "",
          username: "",
          password: ""
        }
      };
    },
    mounted() {
      this.getCountries();
    },
    watch: {
      "form.birthday": function (n) {
        this.form.birthday = moment(n).format("YYYY-MM-DD");
      }
    },
    methods: {
      save(formName) {
        this.$refs[formName].validate(valid => {
          if (!valid) return;
          this.store = true
          const persona = {
            nombre: this.form.names,
            primerApellido: this.form.first_last_name,
            segundoApellido: this.form.second_last_name,
            rut: this.form.rut,
            genero: this.form.gender,
            estadoCivil: this.form.civil_status,
            correoElectronico: this.form.email,
            telefono: this.form.cellphone_one,
            telefonoFijo: this.form.phone,
            municipio_id: this.form.city,
            fechaNacimiento: this.form.birthday
          };
          const usuario = {
            first_name: this.form.names,
            last_name: `${this.form.first_last_name} ${this.form.second_last_name}`,
            email: this.form.email,
            password: this.form.password,
            username: this.form.username,
            persona_id: "",
            cargo_id: 7
          };
          http
            .post("/api/personas/", persona)
            .then(res => {
              usuario.persona_id = res.data.data.id;
              http
                .post("/api/users/", usuario)
                .then(res => {
                  console.log(res.data);
                  this.form = {}
                  this.resetForm('form')
                  this.$notify({
                    title: 'Exito',
                    message: res.data.message,
                    type: 'success'
                  });
                  this.store = false
                })
                .catch(e => {
                  console.log(e);
                  this.store = false
                });
            })
            .catch(e => {
              console.log(e);
              this.store = false
            });
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
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
      getWorker(query) {
        this.selectLoading = true
        if (query !== "" && query.length >= 2) {
          http
            .get("api/personas/", {
              params: {
                dato: query,
                sin_paginacion: true
              }
            })
            .then(res => {
              this.workers = res.data.data;
              this.selectLoading = false
            })
            .catch(err => {
              this.worlers = [];
            });
        } else {
          this.workers = [];
        }
      },
      edit() {
        this.worker = this.workers.find(item => {
          return item.id === this.search;
        });
        this.form = {
          id: this.worker.id,
          names: this.worker.nombre,
          first_last_name: this.worker.primerApellido,
          second_last_name: this.worker.segundoApellido,
          rut: this.worker.rut,
          gender: this.worker.genero,
          civil_status: this.worker.estadoCivil,
          email: this.worker.correoElectronico,
          cellphone_one: this.worker.telefono,
          phone: this.worker.telefonoFijo,
          city: this.worker.municipio.id,
          region: this.worker.municipio.region.id,
          country: this.worker.municipio.region.pais.id,
          birthday: this.worker.fechaNacimiento
        };
        this.getRegions(this.worker.municipio.region.pais.id);
        this.getCities(this.worker.municipio.region.id);
        this.editForm = true
      },
      update(formName) {
        this.$refs[formName].validate(valid => {
          if (!valid) return;
          this.store = true
          const persona = {
            nombre: this.form.names,
            primerApellido: this.form.first_last_name,
            segundoApellido: this.form.second_last_name,
            rut: this.form.rut,
            genero: this.form.gender,
            estadoCivil: this.form.civil_status,
            correoElectronico: this.form.email,
            telefono: this.form.cellphone_one,
            telefonoFijo: this.form.phone,
            municipio_id: this.form.city,
            fechaNacimiento: this.form.birthday
          };
          http
            .put(`/api/personas/${this.form.id}/`, persona)
            .then(res => {
              this.form = {}
              this.resetForm('form')
              this.$notify({
                title: 'Exito',
                message: res.data.message,
                type: 'success'
              });
              this.store = false
            })
            .catch(e => {
              console.log(e);
              this.store = false
            });
        });

      },
      reset() {
        this.editForm = false
        this.search = ""
        this.form = {}
        this.resetForm('form')
      }
    }
  };

</script>
