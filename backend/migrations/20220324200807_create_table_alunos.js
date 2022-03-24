
exports.up = function(knex) {
    return knex.schema.createTable('alunos', table => {
        table.string('alu_nome', 150).notNull()
        table.string('alu_email', 250).notNull()
        table.string('alu_ra', 50).primary().notNull()
        table.string('alu_cpf', 11).notNull()
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('alunos')
};