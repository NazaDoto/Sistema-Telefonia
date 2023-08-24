import { createRouter, createWebHistory } from 'vue-router';
import InicioComponent from './components/InicioComponent.vue';
import BafComponent from './components/BafComponent.vue';
import PortabilidadComponent from './components/PortabilidadComponent.vue';
import LoginComponent from './components/LoginComponent.vue';
import RegisterComponent from './components/RegisterComponent.vue';
import BafInformesComponent from './components/BafInformesComponent.vue';
import PortInformesComponent from './components/PortInformesComponent.vue';

const routes = [{
        path: '/',
        component: InicioComponent,
        meta: { requiresAuth: true },
    },
    {
        path: '/baf',
        component: BafComponent,
        meta: { requiresAuth: true },
    },
    {
        path: '/portabilidad',
        component: PortabilidadComponent,
        meta: { requiresAuth: true },
    },
    {
        path: '/login',
        component: LoginComponent,
    },
    {
        path: '/register',
        component: RegisterComponent,
    },
    {
        path: "/bafinformes",
        component: BafInformesComponent,
    },
    {
        path: "/portinformes",
        component: PortInformesComponent,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    linkActiveClass: "active",
    linkExactActiveClass: "active",
});

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // Verifica si el usuario está autenticado, si no, redirige a /login
        if (!token) {
            next('/login');
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;