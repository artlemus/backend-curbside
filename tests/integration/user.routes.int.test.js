const User = require('../../models/User')
const userRoutes = require('../../routes/user.routes')
const request = require('supertest')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()

jest.mock('../../models/User')

let server

const user1 = {
  email: 'test@test1.com',
  password: 'qwerty1234',
  owner: true
}

beforeEach(async () => {
  await User.deleteMany({})
})

// creates connection to test database
beforeAll(async (done) => {
  await mongoose.createConnection(process.env.TEST_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })

  app.use(express.json({ extended: false }))
  app.use('/api/v1', userRoutes)

  server = app.listen(3000, () => {
    console.log('server is running')
    done()
  })
})
// closes connection after each test
afterAll(async () => {
  await server.close()
  await mongoose.disconnect()
})

// Tests
test('should register user and return 201 response code ', async () => {
  await request(server).post('/create').send({
    email: 'test@test1.com',
    password: 'qwerty1234',
    owner: true
  })
  expect(201)
})

test('should return 422 response on already existing user', async () => {
  await request(server).post('/create').send({
    email: 'test@test1.com',
    password: 'qwerty1234',
    owner: true
  })
  expect(422)
})

test('should login user and return 201 response code ', async () => {
  await request(server).post('/login').send({
    email: user1.email,
    password: user1.password,
    owner: user1.owner
  })
  expect(201)
})
test('should return 400 response code for incomplete fields', async () => {
  await request(server).post('/login').send({
    email: user1.email
  })
  expect(400)
})
test('should return 422 response code for incomplete fields', async () => {
  await request(server).post('/login').send({
    email: 'user@test1.com',
    password: 'qwerty1234',
    owner: true
  })
  expect(422)
})
