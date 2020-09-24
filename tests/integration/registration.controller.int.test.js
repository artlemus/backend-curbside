const request = require('supertest')
const app = require('../../app')
const newUser = require('../mock-data/new-user.json')

const registrationUrl = '/api/accounts/new/'

describe(registrationUrl, () => {
  it('should return 500 on POST for already existing users' + registrationUrl, async () => {
    const res = await request(app).post(registrationUrl).send(newUser)
    expect(res.statusCode).toBe(500)
  })
})
