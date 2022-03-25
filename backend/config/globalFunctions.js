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

    function notExistsOrError(value, msg) {
        try {
            existsOrError(value, msg)
        } catch(e) {
            return
        }
        throw msg
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

    function validarCPF(cpf) {
        //https://irias.com.br/blog/como-validar-cpf-cnpj-em-node-js/
        if (cpf.length == 11) { //CPF
            let vCpf = cpf
            let v1 = 0
            let v2 = 0
            let aux = false
            
            for (var i = 1; vCpf.length > i; i++) {
                if (vCpf[i - 1] != vCpf[i]) {
                    aux = true
                }
            }
            
            if (aux == false) {
                return false
            }
            
            for (var i = 0, p = 10; (vCpf.length - 2) > i; i++, p--) {
                v1 += vCpf[i] * p
            }

            v1 = ((v1 * 10) % 11);
            
            if (v1 == 10) {
                v1 = 0
            }
            
            if (v1 != vCpf[9]) {
                return false
            }
            
            for (var i = 0, p = 11; (vCpf.length - 1) > i; i++, p--) {
                v2 += vCpf[i] * p
            }
            
            v2 = ((v2 * 10) % 11);
            
            if (v2 == 10) {
                v2 = 0
            }
            
            if (v2 != vCpf[10]) {
                return false
            } else {
                return true
            }
        } else {
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
        notExistsOrError,
        existsBoolOrError,
        equalsOrError,
        validarEmail,
        validarCPF,
        encryptPassword,
        userAdmin
    }
}