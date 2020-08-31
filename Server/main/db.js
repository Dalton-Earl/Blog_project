const { Pool } = rquire('pg')

const database = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '',
    post: 5432
})

module.exports = database