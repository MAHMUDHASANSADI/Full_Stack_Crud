import { defineStore } from 'pinia'
import api from '../api'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: localStorage.getItem("token") || null,
    }),

    getters: {
        isAuthenticated: (state) => !!state.token
    },

    actions: {
        async login(form) {
            const res = await api.post('/login', form)
            this.token = res.data.token
            this.user = res.data.user

            localStorage.setItem("token", this.token)
        },

        async register(form) {
            await api.post('/register', form)
        },

        async logout() {
            await api.post('/logout')
            this.token = null
            this.user = null
            localStorage.removeItem("token")
        }
    }
})
