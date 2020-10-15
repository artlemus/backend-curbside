const userRoutes = require('./routes/user.routes')
const express = require('express')
var cors = require('cors')
const mongodbConnect = require('./mongoDB/mongodb.connect')
const app = express()

mongodbConnect.connect()
app.use(cors())
app.options('*', cors())
app.use(express.json({ extended: false }))
app.use('/api/v1', userRoutes)

app.use((error, req, res, next) => {
  res.status(500).json({ message: error.message })
})
app.get('/', (req, res) => {
  res.send('API Running')
})

module.exports = app
