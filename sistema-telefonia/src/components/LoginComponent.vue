<template>
  <div class="fondo">
    <form @submit.prevent="login">
      <div>
        <label for="username">Usuario</label>
        <input class="form-control mb-3" type="text" v-model="username" required />
      </div>
      <div>
        <label for="password">Contraseña</label>
        <input class="form-control mb-5" type="password" v-model="password" required />
      </div>
      <div>
        <button type="submit" class="btn btn-primary">Iniciar sesión</button>
      </div>
    </form>
  </div>
</template>
  
  <script>
import axios from "axios";

export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post("/login", {
          username: this.username,
          password: this.password,
        });

        const token = response.data.token;
        localStorage.setItem("token", token); // Almacena el token en el almacenamiento local
        this.$router.push("/home"); // Redirige a la pantalla principal
      } catch (error) {
        console.error("Error de inicio de sesión:", error);
      }
    },
  },
};
</script>

<style scoped>
.fondo{
  height: 50vh;
  background-color: aquamarine;
  display: flex;
  justify-content: center;
  align-items: center;
}
.titulo{
  display:block;

}
</style>