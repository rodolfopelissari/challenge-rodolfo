<template>
    <v-navigation-drawer v-if="menuVisible" app dark :permanent="menuVisible" :color="azulPadrao">
        <v-list>
            <v-list-item v-for="(menu, i) in mostrarMenus" :key="i" link @click="openPage(menu.to)">
                <v-list-item-title>{{ menu.text }}</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
import { azulPadrao } from '@/config/global'
import { mapState } from 'vuex'

export default {
    name: 'MenuApp',
    computed: mapState(['menuVisible', 'user']),
    data() {
        return {
            azulPadrao,
            mostrarMenus: [],
            menus: [
                {
                    text: 'Início',
                    to: 'homePage',
                    requiresAdmin: false
                },
                {
                    text: 'Usuários',
                    to: 'listagemUsuarios',
                    requiresAdmin: true
                },
                {
                    text: 'Alunos',
                    to: 'listagemAlunos',
                    requiresAdmin: false
                }
            ]
        }
    },
    methods: {
        openPage(namePage) {
            this.$router.push({
                name: namePage
            })
        }
    },
    mounted() {
        if (this.user.usr_admin) {
            this.mostrarMenus = this.menus
        } else {
            this.menus.forEach(el => {
                if (!el.requiresAdmin) {
                    this.mostrarMenus.push(el)
                }
            })
        }
    }
}
</script>

<style>

</style>