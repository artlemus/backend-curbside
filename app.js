<<<<<<< HEAD
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
=======
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
>>>>>>> d7fd8e2f9d2354ab2becfe3d5034400d794d1eb0

app.use((error, req, res, next) => {
  res.status(500).json({ message: error.message })
})
<<<<<<< HEAD
=======

>>>>>>> d7fd8e2f9d2354ab2becfe3d5034400d794d1eb0
app.get('/', (req, res) => {
  res.send('API Running')
})

module.exports = app
<<<<<<< HEAD
=======
// app.use('/api/restaurants/account/new', require('./route/api/login'))
// app.use('/api/v1/restaurant-registration/', require('./route/api/registration')
// )
>>>>>>> d7fd8e2f9d2354ab2becfe3d5034400d794d1eb0
