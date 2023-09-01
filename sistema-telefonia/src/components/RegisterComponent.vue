<template>
  <div>
    <NavbarComponent></NavbarComponent>
    <div class="container mt-4 mb-2">

      <div class="row g-3 mt-4 div-forms border">
        <h1 class="text-center">Registro de Empleado</h1>
        <form @submit.prevent="registrarUsuario">
          <div class="row g-3 div-forms border">
            <h4 class="titulo-div-forms mb-2">Datos Personales</h4>
            <div class="col-md-6">
              <input class="form-control" type="text" id="username" v-model="usuario.usuario" placeholder="Nombre de Usuario" required>
            </div>
            <div class="col-md-6">
              <input class="form-control" type="password" id="password" v-model="usuario.contraseña" placeholder="Contraseña" required>
            </div>
            <div class="col-md-6">
              <input class="form-control" type="text" id="nombre" v-model="usuario.nombre" placeholder="Nombre">
            </div>
            <div class="col-md-6">
              <input class="form-control" type="text" id="apellido" v-model="usuario.apellido" placeholder="Apellido">
            </div>
            <div class="col-md-6">
              <input class="form-control" type="email" id="email" v-model="usuario.email" placeholder="Correo">
            </div>
            <div class="col-md-6">
              <input class="form-control" type="number" id="telefono" v-model="usuario.telefono" placeholder="Teléfono">
            </div>
          </div>

          <div>
            <button class="btn btn-success botones mt-3" type="submit">Registrar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
  
<script>
import axios from "axios";
import NavbarComponent from './NavbarComponent.vue';
import Swal from 'sweetalert2';
export default {
  components: {
    NavbarComponent,
  },
  data() {
    return {
      usuario: {
        usuario: '',
        contraseña: '',
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
      },
    };
  },
  methods: {
    resetForm() {
      this.usuario.usuario = '';
      this.usuario.contraseña = '';
      this.usuario.nombre = '';
      this.usuario.apellido = '';
      this.usuario.email = '';
      this.usuario.telefono = '';
    },
    registrarUsuario() {
      // Realizar una solicitud HTTP POST al servidor Express
      axios.post('/register', this.usuario)
        .then(response => {
          this.mensaje = response.data.message;
          Swal.fire({
            icon: 'success',
            text: 'Usuario agregado correctamente!'
          });
          this.resetForm();
        })
        .catch(error => {
          console.error('Error al registrar usuario:', error);
          this.mensaje = 'Error al registrar usuario';
        });
    },
    esAdmin() {
      if (localStorage.getItem("usuario") != "admin") {
        this.$router.push("/");
      }
    }
  },
  mounted() {
    this.esAdmin();
  },
};
</script>
  
<style>
.div-forms {
  margin: auto;
  padding: 20px;
  border-color: black !important;
  border-radius: 5px !important;
  justify-content: center !important;
}

.botones {
  width: 40%;
}

/* Estilos CSS si es necesario */
</style>
  