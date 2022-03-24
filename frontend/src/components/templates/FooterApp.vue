<template>
    <v-footer class="footer-app" app dark :color="azulPadrao">
        <v-row justify="center" class="text-center text-body-2">
            <v-col>
                <span>Desenvolvido por <strong>Rodolfo Pelissari</strong></span>
            </v-col>
        </v-row>
    </v-footer>
</template>

<script>
import { azulPadrao } from '@/config/global'

export default {
    name: 'FooterApp',
    data() {
        return {
            azulPadrao
        }
    }
}
</script>

<style>

</style>