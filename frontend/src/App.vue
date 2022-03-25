<template>
    <v-app id="app">
        <HeaderApp />
        <LoadingPage v-if="validatingToken" />
        <ContentApp v-else />
        <FooterApp />
    </v-app>
</template>

<script>
import HeaderApp from '@/components/templates/HeaderApp'
import LoadingPage from '@/components/pages/LoadingPage'
import ContentApp from '@/components/templates/ContentApp'
import FooterApp from '@/components/templates/FooterApp'
import { userKey, baseApiUrl } from '@/config/global'
import axios from 'axios'

export default {
    name: 'App',
    components: {
        HeaderApp,
        LoadingPage,
        ContentApp,
        FooterApp
    },
    data() {
        return {
            validatingToken: true
        }
    },
    methods: {
        async validateToken() {
            this.validatingToken = true

            const json = localStorage.getItem(userKey)
            const userData = JSON.parse(json)
            this.$store.commit('setUser', null)

            if (!userData) {
                this.validatingToken = false
                if (this.$route.name != 'newUserPage') {
                    this.$router.push({ name: 'loginPage' })
                }
                return
            }

            const res = await axios.put(`${baseApiUrl}/validar_token`, userData)
            if (res.data) {
                this.$store.commit('setUser', userData)
            } else {
                localStorage.removeItem(userKey)
                if (this.$route.name != 'newUserPage') {
                    this.$router.push({ name: 'loginPage' })
                }
            }

            this.validatingToken = false
        }
    },
    created() {
        this.validateToken()
    }
}
</script>

<style>

</style>
