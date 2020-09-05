const express = require('express')
const connectDB = require('./config/db')

const app = express()

connectDB()

app.use(express.json({ extended: false }))

app.get('/', (req, res) => {
  res.send('API Running')
})

app.use('/api/restaurants/account/new', require('./routes/api/login'))
app.use(
  '/api/v1/restaurant-registration/',
  require('./routes/api/registration')
)

// app.use('/api/restaurants/account/new', require('./routes/api/profile'));
// app.use('/api/restaurants/account/new', require('./routes/api/auth'));
// app.use('/api/restaurants/account/new', require('./routes/api/posts'));

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
