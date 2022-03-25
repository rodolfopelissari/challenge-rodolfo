<template>
    <div class="listagem-usuarios">
        <PageTitle title="Listagem de usuários" subTitle="Segue abaixo a listagem dos usuários cadastrados no sistema" />
        
        <v-layout align-center justify-center>
            <v-flex>
                <v-card>
                    <v-card-text>
                        <v-data-table hide-default-footer :headers="colunas" :items="usuarios" no-data-text="Nenhum usuário cadastrado" :items-per-page="-1">
                            <template v-slot:[`item.usr_admin`]="{ item }">
                                {{ formatarBoolTexto(item.usr_admin) }}
                            </template>
                        </v-data-table>
                        <div class="text-center">
                            <v-pagination v-model="page" :length="maxPage" v-if="maxPage > 1" :color="azulPadrao"></v-pagination>
                        </div>
                    </v-card-text>
                    <div class="text-center">
                        <v-btn class="mb-3" outlined dark :color="azulPadrao" @click="loadUsuarios">
                            Atualizar
                        </v-btn>
                    </div>
                </v-card>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
import PageTitle from '@/components/templates/PageTitle'
import { azulPadrao, baseApiUrl, showError, formatarBoolTexto } from '@/config/global'
import axios from 'axios'

export default {
    name: 'ListagemUsuarios',
    components: {
        PageTitle
    },
    data() {
        return {
            azulPadrao,
            formatarBoolTexto,
            usuarios: [],
            page: 1,
            maxPage: 1,
            colunas: [
                {
                    text: 'E-mail',
                    value: 'usr_email'
                },
                {
                    text: 'Administrador?',
                    value: 'usr_admin'
                }
            ]
        }
    },
    methods: {
        loadUsuarios() {
            axios.get(`${baseApiUrl}/usuarios?page=${this.page}`)
                .then(r => {
                    this.usuarios = r.data.data
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
    },
    watch: {
        page() {
            this.loadUsuarios()
        }
    },
    mounted() {
        this.loadUsuarios()
    }
}
</script>

<style>

</style>