const loginController = require('../../controllers/login.controller')
const loginModel = require('../../models/Login')
const httpMocks = require('node-mocks-http')

const newUser = require('../mock-data/new-user.json')

jest.mock('../../models/Login')

let req, res, next

beforeEach(() => {
  req = httpMocks.createRequest()
  res = httpMocks.createResponse()
  next = jest.fn()
  req.body = newUser
})

describe('login.Controller.loginUser', () => {
  it('should have a loginUser funtion', () => {
    expect(typeof loginController.loginUser).toBe('function')
  })
  it('should validate email and password and ', async () => {
    loginModel.create.mockReturnValue(newUser)
    await loginController.loginUser(req, res, next)
    expect(res.statusCode).toBe(201)
    expect(res._isEndCalled()).toBeTruthy()
  })
})
