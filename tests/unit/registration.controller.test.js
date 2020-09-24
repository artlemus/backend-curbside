const registrationController = require('../../controllers/registration.controller')
const registrationModel = require('../../models/Registration')
const httpMocks = require('node-mocks-http')
const newUser = require('../mock-data/new-user.json')

jest.mock('../../models/registration')

let req, res, next

beforeEach(() => {
  req = httpMocks.createRequest()
  res = httpMocks.createResponse()
  next = jest.fn()
  req.body = newUser
})

describe('registrationController.registerUser', () => {
  it('should have a createUser Function', () => {
    expect(typeof registrationController.registerUser).toBe('function')
  })
  it('should return 201', async () => {
    registrationModel.create.mockReturnValue(newUser)
    await registrationController.registerUser(req, res, next)
    expect(res.statusCode).toBe(201)
    expect(res._isEndCalled()).toBeTruthy()
  })
  it('should return json body in response', async () => {
    registrationModel.create.mockReturnValue(newUser)
    await registrationController.registerUser(req, res, next)
    expect(res._getJSONData()).toStrictEqual(newUser)
  })
  it('should handle errors', async () => {
    registrationModel.findOne.mockReturnValue(newUser)
    await registrationController.registerUser(req, res, next)
    expect(res.statusCode).toBe(422)
    expect(res._isEndCalled()).toBeTruthy()
  })
})
