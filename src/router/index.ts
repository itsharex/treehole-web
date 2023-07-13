import {createRouter, createWebHistory} from "vue-router";
import my from "../views/my/index.vue";
import topicEdit from "../views/topic-edit/index.vue";
import {isLogin} from "../utils/auth";

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

router.beforeEach(async (to, from) => {
    if (to.path === '/topic/edit' && !isLogin()) {
        return '/login'
    }
    // if (to.path === '/login' && isLogin()) {
    //     return '/'
    // }
    // if (to.path === '/register' && isLogin()) {
    //     return '/'
    // }
    return true
})

router.afterEach(async (to, from) => {
    return true
})

export default router