const mongoose = require('mongoose')
const config = require('config')
const db = config.get('mongoURI')

async function connect () {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    })
    console.log('MongoDB Connected...')
  } catch (err) {
    console.error('Error connecting to mongodb')
  }
}

module.exports = { connect }
