const app = require('express')()
const consign = require('consign')

const db = require('./config/db.js')
app.db = db

consign()
    .then('./config/middlewares.js')
    .then('./config/globalFunctions.js')
    .then('./api')
    .then('./config/routes.js')
    .into(app)

const port = 3000

app.listen(port, () => {
    console.log('Backend executando...')
})
