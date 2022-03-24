
exports.up = function(knex) {
    return knex.schema.createTable('usuarios', table => {
        table.string('usr_email', 250).primary().notNull()
        table.string('usr_senha', 250).notNull()
        table.boolean('usr_admin').notNull()
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('usuarios')
};