import {createRouter, createWebHistory} from "vue-router";
import my from "../views/my/index.vue";
import topicEdit from "../views/topic-edit/index.vue";

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
            component: my
        },
        {
            path: '/register',
            component: () => import('../views/register/index.vue')
        },
        {
            path: '/topic/edit',
            component: topicEdit
        }
    ]
})

export default router