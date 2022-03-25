<template>
    <div>
        <MenuApp v-if="isUserVisible" />
        <v-main>
            <v-container>
                <router-view></router-view>
            </v-container>
        </v-main>
    </div>
</template>

<script>
import MenuApp from '@/components/templates/MenuApp'
import { mapState } from 'vuex'

export default {
    name: 'ContentApp',
    computed: mapState(['isUserVisible']),
    components: {
        MenuApp
    }
}
</script>

<style>

</style>