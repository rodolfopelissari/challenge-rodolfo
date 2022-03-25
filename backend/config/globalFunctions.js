const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    
    function existsOrError(value, msg) {
        if (!value) {
            throw msg
        }
    
        if (typeof value === 'string' && !value.trim()) {
            throw msg
        }
    
        if (Array.isArray(value) && value.length === 0) {
            throw msg
        }
    }

    function existsBoolOrError(value, flag, msg) {
        if (!value.hasOwnProperty(flag)) {
            throw msg
        }
    }
        
    function equalsOrError(valueA, valueB, msg) {
        if (valueA != valueB) {
            throw msg
        }
    }

    function validarEmail(email) {
        let usuario = email.substring(0, email.indexOf("@"))
        let dominio = email.substring(email.indexOf("@")+ 1, email.length)
            
        if ((usuario.length >= 1) && (dominio.length >= 3) && (usuario.search("@") == -1) && (dominio.search("@") == -1) && (usuario.search(" ") == -1) && (dominio.search(" ") == -1) &&
            (dominio.search(".") != -1) && (dominio.indexOf(".") >= 1) && (dominio.lastIndexOf(".") < dominio.length -1)) {
            return true
        }
        else {
            return false
        }
    }

    function encryptPassword(password) {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }

    const userAdmin = middleware => {
        return (req, res, next) => {
            if (req.user.usr_admin) {
                middleware(req, res, next)
            } else {
                res.status(401).send('Usuário não é administrador.')
            }
        }
    }

    return {
        existsOrError,
        existsBoolOrError,
        equalsOrError,
        validarEmail,
        encryptPassword,
        userAdmin
    }
}