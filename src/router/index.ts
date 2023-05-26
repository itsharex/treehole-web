import {createRouter, createWebHistory} from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: () => import('../views/home/index.vue')
        },
        {
            path: '/login',
            component: () => import('../views/login/index.vue')
        },
        {
            path: '/my',
            component: () => import('../views/my/index.vue')
        }
    ]
})

export default router