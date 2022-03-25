<template>
    <div class="home-page">
        <PageTitle title="Seja bem vindo" :subTitle="user.usr_email" />

        <div>
            <br>
            <p>Selecione uma opção no menu ao lado</p>
            <br>
            <p><strong>Funcionamento:</strong></p>
            <li>Se o usuário for administrador, ele irá conseguir visualizar os usuários e visualizar, criar, editar e excluir os alunos</li>
            <li>Se o usuário não for administrador, ele irá apenas visualizar os alunos</li>
        </div>
    </div>
</template>

<script>
import PageTitle from '@/components/templates/PageTitle'
import { mapState } from 'vuex'

export default {
    name: 'HomePage',
    computed: mapState(['user']),
    components: {
        PageTitle
    }
}
</script>

<style>

</style>