<template>
  <div>
    <NavbarComponent></NavbarComponent>
    <div id="content">
      
      <router-view>
      </router-view>
      
    </div>
    
  </div>
</template>
  
  <script>
import NavbarComponent from "./NavbarComponent.vue";
import router from "../router";
export default {
  components: {
    NavbarComponent,
  },
  router,
  methods: {},
};
</script>
  
<style scoped>
#content {
  margin-left: 250px; /* Ajusta esto para el espacio del sidebar */
  padding: 20px;
}
</style>