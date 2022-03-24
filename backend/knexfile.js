const { db } = require('./.env')

module.exports = {
    client: 'mysql2',
    connection: db,
    pool: {
        min: 2,
        max: 10
    }
}
