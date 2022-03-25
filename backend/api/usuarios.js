const bcrypt = require('bcrypt-nodejs')
const jwt = require('jwt-simple')
const { authSecret } = require('../.env')

module.exports = app => {
    
    const { existsOrError, equalsOrError, existsBoolOrError, validarEmail, encryptPassword } = app.config.globalFunctions
    
    const login = async (req, res) => {
        if (!req.body.email || !req.body.senha) {
            return res.status(400).send('E-mail e senha devem ser informados.')
        }

        const usr = await app.db('usuarios')
            .where({
                usr_email: req.body.email
            })
            .first()

        if (usr) {
            const isMatch = bcrypt.compareSync(req.body.senha, usr.usr_senha)
            if (isMatch) {

                //Geração do token do usuário pra armazenar no navegador (válido por 24 horas)
                const now = Math.floor(new Date() / 1000) //milisegundos
                const payload = {
                    usr_email: usr.usr_email,
                    usr_admin: usr.usr_admin,
                    iat: now,
                    exp: now + (60 * 60 * 24 * 1) //segundos, minutos, horas, dias = da forma como está aí, representa 1 dia em milésimos de segundos
                }

                //Retorna as informações do usuário para fazer o acesso no frontend
                return res.json({
                    ...payload,
                    token: jwt.encode(payload, authSecret) //Aqui gera o token do objeto com as informações do usuário, usando o authSecret do .env
                })
            } else {
                return res.status(400).send('Usuário e/ou senha inválidos.')
            }
        } else {
            return res.status(400).send('Usuário não encontrado.')
        }
    }
    
    const validarToken = (req, res) => {
        const userData = req.body || null
        try {
            if (userData) {
                const token = jwt.decode(userData.token, authSecret)
                if (new Date(token.exp * 1000) > new Date()) {
                    return res.send(true)
                }
            }
        } catch(e) {
            //problema com o token, pode ignorar
        }

        res.send(false)
    }

    const save = async (req, res) => {
        const p = { ...req.body }
        try {
            existsOrError(p.usr_email, 'E-mail deve ser informado.')
            existsOrError(p.usr_senha, 'Senha deve ser informada.')
            equalsOrError(p.usr_senha, p.usr_senha_confirmacao, 'Senhas informadas não conferem.')
            existsBoolOrError(p, 'usr_admin', 'Não informado se o usuário é administrador.')
        } catch(e) {
            return res.status(400).send(e)
        }

        //Antes de criar, valida se é um e-mail válido
        if (!validarEmail(p.usr_email)) {
            return res.status(400).send('E-mail informado não é válido.')
        }

        //Verificar se o usuário já existe (pelo e-mail pois é a pk da tabela, poderia deixar dar o erro no insert, mas assim mostra a mensagem correta pro usuário)
        const usr = await app.db('usuarios')
            .where({
                usr_email: p.usr_email
            })
            .first()

        if (usr) {
            return res.status(400).send('Usuário já está cadastrado no sistema.')
        }
        
        //Passando as validações, segue com a inclusão
        await app.db('usuarios')
            .insert({
                usr_email: p.usr_email,
                usr_senha: encryptPassword(p.usr_senha), //Criptografa a senha pra armazenar no banco de dados
                usr_admin: p.usr_admin
            })
            .then(() => res.send('Usuário criado com sucesso!'))
            .catch(e => res.status(500).send(e))
    }

    const paginacao = 10

    const get = async (req, res) => {
        const pg = parseInt(req.query.page) || 1
        const cc = await app.db('usuarios')
            .count('usr_email')
            .then()
        
        const c = Object.values(cc[0])[0] //Dessa forma pega o resultado do count executado no SQL acima

        app.db('usuarios')
            .select(
                'usr_email',
                'usr_admin'
            )
            .orderBy('usr_email')
            .limit(paginacao)
            .offset((pg * paginacao) - paginacao)
            .then(usr => res.json({
                data: usr,
                page: pg,
                pagination: paginacao,
                count: c
            }))
            .catch(e => res.status(500).send(e))
    }

    return {
        login,
        validarToken,
        save,
        get
    }
}