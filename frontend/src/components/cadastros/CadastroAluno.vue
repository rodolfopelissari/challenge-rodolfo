<template>
    <div class="cadastro-aluno">
        <PageTitle title="Cadastro de alunos" :subTitle="mode == 'insert' ? 'Cadastre um novo aluno' : `Edite o aluno com o RA ${pAluno}`" />

        <v-layout align-center justify-center>
            <v-flex>
                <v-card>
                    <v-card-text>
                        <v-form>
                            <v-text-field v-model="aluno.alu_nome" label="Nome" :color="azulPadrao"></v-text-field>
                            <v-text-field v-model="aluno.alu_email" label="E-mail" :color="azulPadrao"></v-text-field>
                            <v-text-field v-model="aluno.alu_ra" label="Registro Acadêmico" :color="azulPadrao" :disabled="mode == 'edit'"></v-text-field>
                            <v-text-field v-model="aluno.alu_cpf" label="CPF" :color="azulPadrao" :disabled="mode == 'edit'"></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn class="ml-2 mb-2" @click="saveAluno" :color="azulPadrao" dark>Salvar</v-btn>
                        <v-btn class="ml-2 mb-2" @click="cancel" :color="azulPadrao" outlined dark>Cancelar</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
import PageTitle from '@/components/templates/PageTitle'
import { azulPadrao, baseApiUrl, showError } from '@/config/global'
import { mapState } from 'vuex'
import axios from 'axios'

export default {
    name: 'CadastroAluno',
    computed: mapState(['user']),
    components: {
        PageTitle
    },
    props: ['pAluno'],
    data() {
        return {
            azulPadrao,
            mode: '',
            aluno: {}
        }
    },
    methods: {
        saveAluno() {
            const method = this.mode == 'edit' ? 'put' : 'post'
            const id = this.mode == 'edit' ? `/${this.pAluno}` : ''

            const body = { ...this.aluno }
            if (method == 'put') {
                delete body.alu_ra
                delete body.alu_cpf
            } 
            
            axios[method](`${baseApiUrl}/alunos${id}`, body)
                .then(() => {
                    this.$toasted.global.msgSuccess()
                    this.cancel()
                })
                .catch(showError)
        },
        cancel() {
            this.$router.push({
                name: 'listagemAlunos'
            })
        }
    },
    mounted() {
        if (this.user.usr_admin) {
            if (this.pAluno != '') {
                this.mode = 'edit'

                axios.get(`${baseApiUrl}/alunos/${this.pAluno}`)
                    .then(r => this.aluno = r.data)
                    .catch(showError)
            } else {
                this.mode = 'insert'
            }
        } else {
            this.cancel()
        }
    }
}
</script>

<style>

</style>