module.exports = app => {
    
    const { existsOrError, notExistsOrError, validarEmail, validarCPF } = app.config.globalFunctions

    const paginacao = 10

    const get = async (req, res) => {
        const pg = parseInt(req.query.page) || 1
        const cc = await app.db('alunos')
            .count('alu_ra')
            .then()

        const c = Object.values(cc[0])[0] //Dessa forma pega o resultado do count executado no SQL acima

        app.db('alunos')
            .select(
                'alu_nome',
                'alu_email',
                'alu_ra',
                'alu_cpf'
            )
            .orderBy('alu_nome')
            .limit(paginacao)
            .offset((pg * paginacao) - paginacao)
            .then(alu => res.json({
                data: alu,
                page: pg,
                pagination: paginacao,
                count: c
            }))
            .catch(e => res.status(500).send(e))
    }

    const getByRA = (req, res) => {
        app.db('alunos')
            .select(
                'alu_nome',
                'alu_email',
                'alu_ra',
                'alu_cpf'
            )
            .where({
                alu_ra: req.params.ra
            })
            .first()
            .then(alu => res.json(alu))
            .catch(e => res.status(500).send(e))
    }

    const save = async (req, res) => {
        const p = { ...req.body }

        try {
            existsOrError(p.alu_nome, 'Nome não informado.')
            existsOrError(p.alu_email, 'E-mail não informado.')
        } catch (e) {
            return res.status(400).send(e)
        }

        if (!validarEmail(p.alu_email)) {
            return res.status(400).send('E-mail informado não é válido.')
        }

        if (req.params.ra) {
            //PUT, faz um update
            try {
                notExistsOrError(p.alu_ra, 'RA não pode ser editado.')
                notExistsOrError(p.alu_cpf, 'CPF não pode ser editado.')
            } catch(e) {
                return res.status(400).send(e)
            }

            app.db('alunos')
                .update({ //RA e CPF não pode alterar
                    alu_nome: p.alu_nome,
                    alu_email: p.alu_email
                })
                .where({
                    alu_ra: req.params.ra
                })
                .then(r => {
                    if (r) {
                        res.status(204).send()
                    } else {
                        res.status(400).send('Nenhum aluno encontrado para alterar.')
                    }
                })
                .catch(e => res.status(500).send(e))
        } else {
            //POST, faz um insert
            try {
                existsOrError(p.alu_ra, 'RA não informado.')
                existsOrError(p.alu_cpf, 'CPF não informado.')
            } catch (e) {
                return res.status(400).send(e)
            }

            if (!validarCPF(p.alu_cpf)) {
                return res.status(400).send('CPF informado não é válido.')
            }

            const a = await app.db('alunos')
                .where({
                    alu_ra: p.alu_ra
                })
                .first()

            if (a) {
                return res.status(400).send('Já existe um aluno com o mesmo RA informado.')
            } else {
                app.db('alunos')
                    .insert(p)
                    .then(r => res.json(r))
                    .catch(e => res.status(500).send(e))
            }
        }
    }

    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('alunos')
                .where({ 
                    alu_ra: req.params.ra
                })
                .del()
            
            try {
                existsOrError(rowsDeleted, 'Não existe nenhum aluno com este RA para excluir.')
            } catch(e) {
                return res.status(400).send(e)
            }

            res.status(204).send()
        } catch(e) {
            res.status(500).send(e)
        }
    }

    return {
        get,
        getByRA,
        save,
        remove
    }
}