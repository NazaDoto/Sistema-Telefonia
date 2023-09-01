<template>
  <div class="color-fondo">
    <!-- <LoginComponent v-if="!usuarioAutenticado()"></LoginComponent> -->
    <router-view></router-view>
    <PieComponent/>
    <!-- <RegisterComponent/> -->
  </div>
</template>

<script>
//import axios from 'axios';
// import LoginComponent from "./components/LoginComponent.vue";
//  import NavbarComponent from "./components/NavbarComponent.vue";
// import RegisterComponent from './components/RegisterComponent.vue';
import PieComponent from './components/PieComponent.vue';

export default {
  components: {
    PieComponent,
    // LoginComponent,
    // NavbarComponent,
    // RegisterComponent,
  },
  data() {
    return {
      message: "",
    };
  },
  methods: {
    checkAuthentication() {
    const isAuthenticated = !!localStorage.getItem("token");/* Agrega aquí tu lógica para verificar si el usuario está autenticado */
    if (!isAuthenticated) {
      this.$router.push("/login");
    } 
  },
  },
  mounted() {
  this.checkAuthentication();
  },
};
</script>

<style scoped>
</style>
