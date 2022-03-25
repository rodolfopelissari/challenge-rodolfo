import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    //Variáveis expostas em toda a aplicação
    state: {
        user: null,
        isUserVisible: false,
        menuVisible: true
    },
    mutations: {
        setUser(state, user) {
            state.user = user
            if (user) {
                axios.defaults.headers.common['Authorization'] = `bearer ${user.token}`
                state.isUserVisible = true
            } else {
                delete axios.defaults.headers.common['Authorization']
                state.isUserVisible = false
            }
        },
        setMenuVisible(state) {
            state.menuVisible = !state.menuVisible
        }
  }
})
