<template>
  <div>
    <div v-if="!usuarioAutenticado()">      
      <InicioComponent></InicioComponent>
    </div>
    <div v-else>
      <LoginComponent></LoginComponent>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import router from './router';
import LoginComponent from './components/LoginComponent.vue';
import InicioComponent from './components/InicioComponent.vue';

export default {
  components: {
    LoginComponent,
    InicioComponent,
  },
  router,
  data() {
    return {
      message: '',
    };
  },
  methods: {
    usuarioAutenticado: function() {
      return !!localStorage.getItem('token'); // Verifica si el token está presente
    }
  },
  mounted() {
    // Hacer una solicitud al backend al cargar el componente
    axios.get('/test') // Cambiado a una ruta absoluta que coincide con la configuración de tu servidor
      .then(response => {
        this.message = response.data.message;
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  },
};
</script>

<style scoped>

</style>
