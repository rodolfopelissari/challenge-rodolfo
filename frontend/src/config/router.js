import Vue from 'vue'
import VueRouter from 'vue-router'

import HomePage from '@/components/pages/HomePage'
import LoginPage from '@/components/pages/LoginPage'
import NewUserPage from '@/components/pages/NewUserPage'
import ListagemUsuarios from '@/components/listagens/ListagemUsuarios'
import ListagemAlunos from '@/components/listagens/ListagemAlunos'

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
    },
    {
        name: 'listagemUsuarios',
        path: '/listagem_usuarios',
        component: ListagemUsuarios
    },
    {
        name: 'listagemAlunos',
        path: '/listagem_alunos',
        component: ListagemAlunos
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
