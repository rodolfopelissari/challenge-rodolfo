const app = require('express')()

const db = require('./config/db.js')
app.db = db

const port = 3000

app.listen(port, () => {
    console.log('Backend executando...')
})
