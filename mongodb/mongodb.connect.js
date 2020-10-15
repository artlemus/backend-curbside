const mongoose = require('mongoose')
require('dotenv').config()

async function connect () {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    return console.log('MongoDB succesfully connected')
  } catch (err) {
    return console.error('Error connecting to mongodb')
  }
}

module.exports = {
  connect
}
