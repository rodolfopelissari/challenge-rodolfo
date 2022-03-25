<template>
    <div class="listagem-alunos">
        <PageTitle title="Listagem de alunos" subTitle="Segue abaixo a listagem dos alunos cadastrados no sistema" />
        
        <v-layout align-center justify-center>
            <v-flex>
                <v-card>
                    <v-card-text>
                        <v-data-table hide-default-footer :headers="mostrarColunas" :items="alunos" no-data-text="Nenhum aluno cadastrado" :items-per-page="-1">
                            <template v-slot:[`item.alu_cpf`]="{ item }">
                                {{ formatarCPF(item.alu_cpf) }}
                            </template>
                            <template v-slot:[`item.btnAcoes`]="{ item }">
                                <v-btn class="mr-2" @click="editAluno(item)" x-small :color="azulPadrao" dark>Editar</v-btn>
                                <v-btn x-small @click="dialogRemoveAluno(item)" outlined color="red" dark>Remover</v-btn>
                            </template>
                        </v-data-table>
                        <div class="text-center">
                            <v-pagination v-model="page" :length="maxPage" v-if="maxPage > 1" :color="azulPadrao"></v-pagination>
                        </div>
                    </v-card-text>
                    <div class="text-center">
                        <v-btn class="mb-3 mr-3" v-if="user.usr_admin" outlined dark :color="azulPadrao" @click="newAluno">
                            Novo aluno
                        </v-btn>
                        <v-btn class="mb-3" outlined dark :color="azulPadrao" @click="loadAlunos">
                            Atualizar
                        </v-btn>
                    </div>
                </v-card>
            </v-flex>
        </v-layout>

        <v-dialog v-model="dialogExclusao" max-width="400px">
            <v-card>
                <v-card-title>
                    <span class="text-h6">Deseja excluir o aluno <strong>{{ RAExclusao }}</strong></span>
                </v-card-title>
                <v-card-actions>
                    <v-btn class="ml-2 mb-2 mr-2" @click="removeAluno" :color="azulPadrao" dark>Sim</v-btn>
                    <v-btn class="ml-2 mb-2" @click="cancelDialogExclusao" color="red" outlined dark>Não</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import PageTitle from '@/components/templates/PageTitle'
import { mapState } from 'vuex'
import { azulPadrao, baseApiUrl, showError, formatarCPF } from '@/config/global'
import axios from 'axios'

//ver isso: adicionar um campo pra filtrar os alunos (rota no backend)

export default {
    name: 'ListagemAlunos',
    computed: mapState(['user']),
    components: {
        PageTitle
    },
    data() {
        return {
            azulPadrao,
            formatarCPF,
            dialogExclusao: false,
            RAExclusao: '',
            alunos: [],
            page: 1,
            maxPage: 1,
            mostrarColunas: [],
            colunas: [
                {
                    text: 'Registro Acadêmico',
                    value: 'alu_ra',
                    requiresAdmin: false
                },
                {
                    text: 'Nome',
                    value: 'alu_nome',
                    requiresAdmin: false
                },
                {
                    text: 'CPF',
                    value: 'alu_cpf',
                    requiresAdmin: false
                },
                {
                    text: 'Ações',
                    value: 'btnAcoes',
                    requiresAdmin: true
                }
            ]
        }
    },
    methods: {
        loadAlunos() {
            axios.get(`${baseApiUrl}/alunos?page=${this.page}`)
                .then(r => {
                    this.alunos = r.data.data
                    if (r.data.pagination > r.data.count) {
                        this.maxPage = 1
                    } else {
                        const i = r.data.count / r.data.pagination
                        if (Number.isInteger(i)) {
                            this.maxPage = i
                        } else {
                            this.maxPage = Math.trunc(i) +1
                        }
                    }
                })
                .catch(showError)
        },
        dialogRemoveAluno(aluno) {
            this.RAExclusao = aluno.alu_ra
            this.dialogExclusao = true
        },
        cancelDialogExclusao() {
            this.RAExclusao = ''
            this.dialogExclusao = false
        },
        async removeAluno() {
            axios.delete(`${baseApiUrl}/alunos/${this.RAExclusao}`)
                .then(() => {
                    this.$toasted.global.msgSuccess()
                    this.cancelDialogExclusao()
                    this.loadAlunos()
                })
                .catch(showError)
        },
        editAluno(aluno) {
            const ra = aluno.alu_ra
            this.$router.push({
                name: 'cadastroAluno',
                params: {
                    pAluno: ra
                }
            })
        },
        newAluno() {
            this.$router.push({
                name: 'cadastroAluno',
                params: {
                    pAluno: ''
                }
            })
        }
    },
    watch: {
        page() {
            this.loadAlunos()
        }
    },
    mounted() {
        this.loadAlunos()
        if (this.user.usr_admin) {
            this.mostrarColunas = this.colunas
        } else {
            this.colunas.forEach(el => {
                if (!el.requiresAdmin) {
                    this.mostrarColunas.push(el)
                }
            })
        }
    }
}
</script>

<style>

</style>