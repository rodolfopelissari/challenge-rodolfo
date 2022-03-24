module.exports = app => {

    // Rotas abertas (sem proteção do token do usuário)
    app.put('/login', app.api.usuarios.login)
    app.put('/validar_token', app.api.usuarios.validarToken)
    app.post('/novo_usuario', app.api.usuarios.novoUsuario)

    // Rotas protegidas pelo token do usuário
    //ver isso:
}