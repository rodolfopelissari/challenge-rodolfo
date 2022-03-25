<template>
    <v-navigation-drawer v-if="menuVisible" app dark :permanent="menuVisible" :color="azulPadrao">
        <v-list>
            <v-list-item v-for="(menu, i) in menus" :key="i" link @click="openPage(menu.to)">
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
    computed: mapState(['menuVisible']),
    data() {
        return {
            azulPadrao,
            menus: [
                {
                    text: 'Início',
                    to: 'homePage'
                },
                {
                    text: 'Usuários',
                    to: 'listagemUsuarios'
                },
                {
                    text: 'Alunos',
                    to: 'listagemAlunos'
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
    }
}
</script>

<style>

</style>