import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import Tasks from '../pages/Tasks.vue'

const routes = [
    { path: '/', redirect: '/tasks' },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    {
        path: '/tasks',
        component: Tasks,
        meta: { requiresAuth: true } // 🔒 Protected route
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// Navigation guard
router.beforeEach((to, from, next) => {
    const auth = useAuthStore()

    if (to.meta.requiresAuth && !auth.isAuthenticated) {
        next('/login') // redirect to login if not authenticated
    } else {
        next() // allow navigation
    }
})

export default router
