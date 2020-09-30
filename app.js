const express = require('express')
const userRoutes = require('./routes/user.routes')
const app = express()
const mongoDB = require('./config/db')

mongoDB.connect()
var cors = require('cors')
app.use(cors())
app.options('*', cors())

app.use(express.json({ extended: false }))

app.use('/api/v1/', userRoutes)

app.use((error, req, res, next) => {
  res.status(500).json({ message: error.message })
})

app.get('/', (req, res) => {
  res.send('API Running')
})

module.exports = app
// app.use('/api/restaurants/account/new', require('./route/api/login'))
// app.use('/api/v1/restaurant-registration/', require('./route/api/registration')
// )
