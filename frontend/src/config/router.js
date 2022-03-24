import Vue from 'vue'
import VueRouter from 'vue-router'

import HomePage from '@/components/pages/HomePage'
import LoginPage from '@/components/pages/LoginPage'
import NewUserPage from '@/components/pages/NewUserPage'

Vue.use(VueRouter)

const routes = [
    {
        name: 'homePage',
        path: '/',
        component: HomePage
    },
    {
        name: 'loginPage',
        path: '/login',
        component: LoginPage
    },
    {
        name: 'newUserPage',
        path: '/novo_usuario',
        component: NewUserPage
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
