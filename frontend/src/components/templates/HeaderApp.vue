<template>
    <v-app-bar class="app-bar" app dark :color="azulPadrao">
        <v-toolbar-title class="ml-5">Challenge Full-Stack</v-toolbar-title>
    </v-app-bar>
</template>

<script>
import { azulPadrao } from '@/config/global'

export default {
    name: 'HeaderApp',
    data() {
        return {
            azulPadrao
        }
    }
}
</script>

<style>

</style>