import {createRouter, createWebHistory} from "vue-router";
import my from "../views/my/index.vue";
import topicEdit from "../views/topic-edit/index.vue";
import {isLogin} from "../utils/auth";
import TopicDetail from "../views/topic-detail/index.vue";
import Home from "../views/home/index.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: Home,
        },
        {
            path: '/login',
            component: () => import('../views/login/index.vue'),
            meta: {
                ignoreCache: true
            }
        },
        {
            path: '/my',
            component: my,
            meta: {
                requireAuth: true
            }
        },
        {
            path: '/register',
            component: () => import('../views/register/index.vue'),
            meta: {
                ignoreCache: true
            }
        },
        {
            path: '/topic/:id',
            component: TopicDetail,
            meta: {
                requireAuth: true
            }
        }
    ]
})

router.beforeEach((to, from) => {
    if (to.meta.requireAuth && !isLogin()) {
        return {
            path: '/login',
            query: {
                redirect: to.path
            }
        }
    }
    return true
})

export default router