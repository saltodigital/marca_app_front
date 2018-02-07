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
      <el-col>
        <span>Búsqueda de Trabajador</span>
        <el-select
                filterable
                clearable
                remote
                reserve-keyword
                placeholder="Buscar">
          <el-option></el-option>
        </el-select>
        <el-button>
          Editar
        </el-button>
      </el-col>
    </el-row>
    <el-row>
      <h3>Detalle - Trabajador</h3>
    </el-row>
    <el-row :gutter="20" class="m-bottom-2">
      <el-form label-position="top" ref="formEmpresa">
        <el-col :xs="24" :sm="6">
          <el-form-item label="Nombres" class="fluid-width" prop="names">
            <el-input></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="6">
          <el-form-item label="Apellido Paterno" class="fluid-width" prop="first_last_name">
            <el-input></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="6">
          <el-form-item label="Apellido Materno" class="fluid-width" prop="second_last_name">
            <el-input></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="6">
          <el-form-item label="Rut" class="fluid-width" prop="rut">
            <el-input></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="6">
          <el-form-item label="Fecha de Nacimiento" class="fluid-width" prop="birthday">
            <el-date-picker
                    type="date"
                    format="dd-MM-yyyy">
            </el-date-picker>
          </el-form-item>
        <el-col :xs="24" :sm="6">
          <el-form-item label="Nacionalidad" class="fluid-width" prop="nationality">
            <el-select>
              <el-option>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        </el-col>
        <el-col :xs="24" :sm="6">
          <el-form-item label="Estado Civil" class="fluid-width" prop="civil_status">
            <el-input></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="6">
          <el-form-item label="Genero" class="fluid-width" prop="gender">
            <el-input></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="5">
          <el-form-item label="Correo Electrónico" class="fluid-width" prop="email">
            <el-input></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="5">
          <el-form-item label="Teléfono Fijo" class="fluid-width" prop="phone">
            <el-input></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="5">
          <el-form-item label="Teléfono Movil 1" class="fluid-width" prop="cellphone_one">
            <el-input></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="5">
          <el-form-item label="Teléfono Movil 2" class="fluid-width" prop="cellphone_two">
            <el-input></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="4">
          <el-form-item label="Cargo" class="fluid-width" prop="position">
            <el-input></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="6">
          <el-form-item label="Descripción Cargo" class="fluid-width" prop="position_description">
            <el-input></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="6">
          <el-form-item label="País" class="fluid-width" prop="country">
            <el-input></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="6">
          <el-form-item label="Región" class="fluid-width" prop="region">
            <el-input></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="6">
          <el-form-item label="Ciudad" class="fluid-width" prop="city">
            <el-input></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="6">
          <el-form-item label="Nombre Calle" class="fluid-width" prop="street">
            <el-input></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="6">
          <el-form-item label="Número" class="fluid-width" prop="number">
            <el-input></el-input>
          </el-form-item>
        </el-col>
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
        <el-button type="primary" class="float-right">
          Guardar
        </el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    component: 'NewEmployee'
  }
</script>
