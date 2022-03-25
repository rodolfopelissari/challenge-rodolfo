import Vue from 'vue'

export const userKey = '__challenge_rodolfo'
export const baseApiUrl = 'http://localhost:3000' // Daria pra colocar uma variável "produção" pra trocar o localhost pro servidor de produção por exemplo
export const azulPadrao = 'rgb(92, 103, 184)'

export function showError(e) {
    if (e && e.response && e.response.data) {
        if (e.response.data.sqlMessage) {
            Vue.toasted.global.msgError({ msg: e.response.data.sqlMessage})
        } else {
            Vue.toasted.global.msgError({ msg: e.response.data })
        }
    } else if (typeof e === 'string') {
        Vue.toasted.global.msgError({ msg: e })
    } else {
        Vue.toasted.global.msgError()
    }
}

export function formatarBoolTexto(b) {
    return b ? 'Sim' : 'Não'
}

export default {
    userKey,
    baseApiUrl,
    azulPadrao,
    showError,
    formatarBoolTexto
}