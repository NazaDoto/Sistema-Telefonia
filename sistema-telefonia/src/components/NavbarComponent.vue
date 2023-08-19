<template>
  <div class="">
    <nav class="navbar navbar-dark navbar-expand-lg bg-dark" id="sidebarMenu">
      <div class="container-fluid">
        <a href="/" class="navbar-brand">Inicio</a>
        <!-- <router-link class="navbar-brand" to="/home" exact
          ><i class="fas fa-chart-area fa-fw me-3"></i><span>Inicio</span>
        </router-link> -->
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link" to="/baf"
                ><i class="fas fa-chart-area fa-fw me-3"></i><span>BAF</span>
              </router-link>
            </li>

            <li>
              <router-link to="/portabilidad" class="nav-link"
                ><i class="fas fa-chart-area fa-fw me-3"></i
                ><span>Portabilidad</span>
              </router-link>
            </li>

            <li>
              <a href="#" class="nav-link" @click="cerrarSesion"
                ><i class="fas fa-chart-area fa-fw me-3"></i
                ><span>Salir</span></a
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
    
  </div>
</template>
  
  <script>
import { RouterLink } from "vue-router"; // Asegúrate de tener la importación correcta

export default {
  name: "BarraLateral",
  methods: {
    cerrarSesion() {
      localStorage.removeItem("token"); // Elimina el token del almacenamiento local
      location.reload(); // Redirige a la página de inicio de sesión
    },
  },
  components: {
    "router-link": RouterLink, // Asigna 'router-link' al componente RouterLink
  },
};
</script>
  
  <style scoped>
.sidebar {
  width: 250px;
  background-color: #333;
  color: white;
  padding: 20px;
}

.nav-link {
  color: white;
}

.nav-link.active {
  background-color: #555;
}
</style>
  