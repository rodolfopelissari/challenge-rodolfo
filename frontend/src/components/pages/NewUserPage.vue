<template>
    <div class="new-user-page">
        <PageTitle title="Cadastrar novo usuário" subTitle="Criar um novo usuário para acessar o sistema" />
        
        <v-container fill-height class="flex-column">
            <v-row align="center" justify="center">
                <v-card elevation="4" class="text-center mx-2" width="650px" max-width="650px">
                    <v-card-text>
                        <v-form>
                            <v-text-field v-model="user.usr_email" label="E-mail" :color="azulPadrao"></v-text-field>
                            <v-text-field v-model="user.usr_senha" label="Senha" :color="azulPadrao" type="password"></v-text-field>
                            <v-text-field v-model="user.usr_senha_confirmacao" label="Confirme sua senha" :color="azulPadrao" type="password"></v-text-field>
                            <v-checkbox v-model="user.usr_admin" label="Administrador?" :color="azulPadrao" class="ml-2"></v-checkbox>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn class="ml-2 mb-2" @click="postUser" :color="azulPadrao" dark>Cadastrar</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn class="mr-2 mb-2" @click="openLogin" :color="azulPadrao" dark outlined>Login</v-btn>
                    </v-card-actions>
                </v-card>
            </v-row>
            <br>
        </v-container>
    </div>
</template>

<script>
import PageTitle from '@/components/templates/PageTitle'
import { azulPadrao, baseApiUrl, showError } from '@/config/global'
import { mapState } from 'vuex'
import axios from 'axios'

export default {
    name: 'NewUserPage',
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
        postUser() {
            const body = { ...this.user }
            if (!body.usr_admin) {
                body.usr_admin = false
            }
            axios.post(`${baseApiUrl}/novo_usuario`, body)
                .then(() => {
                    this.$toasted.global.msgSuccess()
                    this.$router.push({
                        name: 'loginPage'
                    })
                })
                .catch(showError)
        },
        openLogin() {
            this.$router.push({
                name: 'loginPage'
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