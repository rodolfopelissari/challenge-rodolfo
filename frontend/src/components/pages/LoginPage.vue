<template>
    <div class="login-page">
        <PageTitle title="Login" subTitle="Informe um e-mail e senha para entrar no sistema" />

        <v-container fill-height class="flex-column">
            <v-row align="center" justify="center">
                <v-card elevation="4" class="text-center mx-2" width="500px" max-width="500px">
                    <v-card-text>
                        <v-form>
                            <v-text-field v-model="user.email" label="E-mail" :color="azulPadrao"></v-text-field>
                            <v-text-field v-model="user.senha" label="Senha" :color="azulPadrao" type="password"></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn class="ml-2 mb-2" @click="login" :color="azulPadrao" dark>Entrar</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn class="mr-2 mb-2" @click="openNewUser" :color="azulPadrao" dark outlined>Cadastre-se</v-btn>
                    </v-card-actions>
                </v-card>
            </v-row>
            <br>
        </v-container>
    </div>
</template>

<script>
import PageTitle from '@/components/templates/PageTitle'
import { azulPadrao, baseApiUrl, userKey, showError } from '@/config/global'
import { mapState } from 'vuex'
import axios from 'axios'

export default {
    name: 'LoginPage',
    computed: mapState(['isUserVisible']),
    components: {
        PageTitle
    },
    data() {
        return {
            azulPadrao,
            user: {}
        }
    },
    methods: {
        login() {
            axios.put(`${baseApiUrl}/login`, this.user)
                .then(res => {
                    this.$store.commit('setUser', res.data)
                    localStorage.setItem(userKey, JSON.stringify(res.data))
                    this.$router.push({
                        name: 'homePage'
                    })
                })
                .catch(showError)
        },
        openNewUser() {
            this.$router.push({
                name: 'newUserPage'
            })
        }
    },
    mounted() {
        if (this.isUserVisible) {
            this.$router.push({
                name: 'homePage'
            })
        }
    }
}
</script>

<style>

</style>