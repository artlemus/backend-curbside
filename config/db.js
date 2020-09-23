const mongoose = require('mongoose')
const db = require('./keys').mongoURI

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
