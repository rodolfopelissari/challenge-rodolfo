<template>
    <v-app-bar class="app-bar" app dark :color="azulPadrao">
        <v-btn v-if="isUserVisible" dark :color="azulPadrao" @click="setMenu">Menu</v-btn>
        <v-toolbar-title class="ml-5">Challenge Full-Stack</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn v-if="isUserVisible" dark :color="azulPadrao" @click="logout">Sair</v-btn>
    </v-app-bar>
</template>

<script>
import { azulPadrao, userKey } from '@/config/global'
import { mapState } from 'vuex'

export default {
    name: 'HeaderApp',
    computed: mapState(['isUserVisible']),
    data() {
        return {
            azulPadrao
        }
    },
    methods: {
        logout() {
            localStorage.removeItem(userKey)
            this.$store.commit('setUser', null)
            this.$router.push( {
                name: 'loginPage'
            })
        },
        setMenu() {
            this.$store.commit('setMenuVisible')
        }
    }
}
</script>

<style>

</style>