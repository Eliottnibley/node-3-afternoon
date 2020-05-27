require('dotenv').config();

const express = require('express')
const massive = require('massive')
const ctlr = require('./products_controller')

const app = express()

const {SERVER_PORT, CONNECTION_STRING} = process.env

massive({
  connectionString: CONNECTION_STRING,
  ssl: {rejectUnauthorized: false}
})
.then(dbInstance => {
  app.set('db', dbInstance)
})
.catch(err => console.log(err))

app.use(express.json())

app.get('/api/products', ctlr.getAll)
app.get('/api/products/:id', ctlr.getOne)
app.put('/api/products/:id', ctlr.update)
app.post('/api/products', ctlr.create)
app.delete('/api/products/:id', ctlr.delete)

app.listen(SERVER_PORT, () => console.log(`Server running on port ${SERVER_PORT}`))

