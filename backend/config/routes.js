module.exports = app => {
    const { userAdmin } = app.config.globalFunctions

    // Rotas abertas (sem proteção do token do usuário)
    app.put('/login', app.api.usuarios.login)
    app.put('/validar_token', app.api.usuarios.validarToken)
    app.post('/novo_usuario', app.api.usuarios.novoUsuario)

    // Rotas protegidas pelo token do usuário
    app.route('/usuarios')
        .all(app.config.passport.authenticate())
        .get(userAdmin(app.api.usuarios.get)) //Somente usuários administradores fazem get nos usuários
}