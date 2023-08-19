import { createRouter, createWebHistory } from 'vue-router';
import InicioComponent from './components/InicioComponent.vue';
import BafComponent from './components/BafComponent.vue';
import PortabilidadComponent from './components/PortabilidadComponent.vue';

const routes = [{
        path: '/home',
        component: InicioComponent,
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
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    linkExactActiveClass: "active",
});

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // Verifica si el usuario está autenticado, si no, redirige a /login
        if (token) {
            next('/');
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;