<template>
  <div class="todo">
    <NavbarComponent></NavbarComponent>
    <div class="container mt-4 mb-2">
      <h1 class="text-center">Bienvenid@, {{ leerUsuario() }}</h1>
      <div v-if="esAdmin()" class="container">
        <router-link class="btn btn-success" to="/register">Crear Usuario</router-link>

      </div>
      <div v-else class="container text-center">
        <div class="row g-3 div-forms border">

          <div class="col-md-6">
            <h2 class="titulo-div-forms mb-2">BAF</h2>
            <router-link class="btn btn-success" to="/baf">Cargar Cliente</router-link><br>
            <router-link class="btn btn-success" to="/bafinformes">Informes</router-link>
          </div>
        </div>
        <div class="row g-3 div-forms border mt-4">
          <div class="col-md-6">
            <h2 class="titulo-div-forms mb-2">Portabilidad</h2>
            <router-link class="btn btn-success" to="/portabilidad">Cargar Cliente</router-link><br>
            <router-link class="btn btn-success" to="/portinformes">Informes</router-link>
          </div>

        </div>

      </div>
    </div>
  </div>
</template>
  
<script>
import NavbarComponent from "./NavbarComponent.vue";
import { RouterLink } from "vue-router";
export default {
  components: {
    NavbarComponent,
    "router-link": RouterLink,
  },
  methods: {
    leerUsuario() {
      return localStorage.getItem("nombre");
    },
    esAdmin() {
      return (localStorage.getItem("usuario") == "admin");
    }
  },
};
</script>
  
<style scoped>

.titulo-div-forms {
    margin: auto;
}

.div-forms {
    margin: auto;
    padding: 20px;
    border-color: black !important;
    border-radius: 5px !important;
    justify-content: center !important;
}

.btn{
  display: block;
  
}

@media screen and (min-width: 992px) {
  .col-md-6{
    display: block !important;
  }
  .btn {
    margin: auto;
    display: block !important;
}
.div-forms{
  width: 40%;
  display: inline-flex !important;
  margin:20px;

}

}
</style>