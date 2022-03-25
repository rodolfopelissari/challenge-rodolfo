<template>
    <div class="home-page">
        <PageTitle title="Seja bem vindo" :subTitle="user.usr_email" />

        //ver isso: componente HomePage...
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