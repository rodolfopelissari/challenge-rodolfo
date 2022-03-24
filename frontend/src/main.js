import Vue from 'vue'
import App from './App.vue'

import vuetify from '@/config/vuetify'
import router from '@/config/router'
import store from '@/config/store'

Vue.config.productionTip = false

new Vue({
    vuetify,
    router,
    store,
    render: h => h(App)
}).$mount('#app')
