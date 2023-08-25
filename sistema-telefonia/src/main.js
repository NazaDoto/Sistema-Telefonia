import axios from 'axios';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

axios.defaults.baseURL = 'http://localhost:3500';
const app = createApp(App);
app.use(router);
app.mount('#app');