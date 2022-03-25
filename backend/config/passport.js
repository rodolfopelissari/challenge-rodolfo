const { authSecret } = require('../.env')
const passport = require('passport')
const passportJwt = require('passport-jwt')
const { Strategy, ExtractJwt } = passportJwt

module.exports = app => {
    const params = {
        secretOrKey: authSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }

    const strategy = new Strategy(params, (payload, done) => {
        app.db('usuarios')
            .where({
                usr_email: payload.usr_email //Pega o email do token de autenticação (payload)
            })
            .first()
            .then(usr => done(null, usr ? { ...payload } : false))
            .catch(e => done(e, false))
    })

    passport.use(strategy)

    return {
        authenticate: () => passport.authenticate('jwt', { session: false })
    }
}