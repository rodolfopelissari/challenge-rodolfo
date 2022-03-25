import Vue from 'vue'
import Toasted from 'vue-toasted'

Vue.use(Toasted, {
    duration: 5000 //Mensagem dura por 5 segundos na tela...
})

Vue.toasted.register(
    'msgSuccess',
    payload => payload.msg ? payload.msg : 'Operação realizada com sucesso!',
    {
        type: 'success'
    }
)

Vue.toasted.register(
    'msgError',
    payload => payload.msg ? payload.msg : 'Erro inesperado!',
    {
        type: 'error'
    }
)