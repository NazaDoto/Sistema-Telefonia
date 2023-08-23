<template>
  <div class="todo">
    <NavbarComponent></NavbarComponent>
    <div class="container mt-4 mb-2">
      <h1 class="text-center">Bienvenid@, {{ leerUsuario() }}</h1>
      <router-link v-if="esAdmin()" class="btn btn-success" to="/register">Crear Usuario</router-link>
      <router-view name="register"></router-view>
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
    esAdmin(){
      return (localStorage.getItem("usuario") == "admin");
    }
  },
};
</script>
  
<style scoped>
@media screen and (max-width: 992px) {}
</style>