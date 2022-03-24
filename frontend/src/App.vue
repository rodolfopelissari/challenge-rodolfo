<template>
    <v-app id="app">
        <HeaderApp />
        <ContentApp />
        <FooterApp />
    </v-app>
</template>

<script>
import HeaderApp from '@/components/templates/HeaderApp'
import ContentApp from '@/components/templates/ContentApp'
import FooterApp from '@/components/templates/FooterApp'

export default {
    name: 'App',
    components: {
        HeaderApp,
        ContentApp,
        FooterApp
    }
}
</script>

<style>

</style>
