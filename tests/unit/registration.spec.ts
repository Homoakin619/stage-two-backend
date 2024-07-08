import { test } from '@japa/runner'
import sinon from "sinon"
import UserRegistrationController from 'App/Controllers/Http/UserRegistrationController'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { UserActions } from 'App/Actions/UserAction'
import { OrganisationActions } from 'App/Actions/OrganisationAction'
import User from 'App/Models/User'
import Organisation from 'App/Models/Organisation'


test.group('User Registration Controller', (group) => {
  
  let sandbox: sinon.SinonSandbox

  group.setup(async () => {
    sandbox = sinon.createSandbox()
  })

  group.teardown(async () => {
    sandbox.restore()
  }) 

  group.each.teardown = () => {
    sandbox.restore()
  }


  test('should return 422 if validation fails', async ({assert}) => {
    const controller = new UserRegistrationController()

    const request = {
      validate: sandbox.stub().throws({ messages: { errors: ['Validation failed'] } }),
      body: sandbox.stub().returns({})
    }
    const response = {
      status: sandbox.stub().returnsThis(),
      send: sandbox.stub()
    }
    const auth = {}

    const ctx = { request, response, auth } as unknown as HttpContextContract

    await controller.handle(ctx)

    assert.isTrue(response.status.calledWith(422))
    sandbox.restore()
    
  })

  test('should return 201 if registration is successful', async ({assert}) => {
    const controller = new UserRegistrationController()

    const user = new User()
    user.fill({ id: 1, email: 'john.doe@example.com', firstName: 'John', lastName: 'Doe' })
    sandbox.stub(UserActions, 'createUser').resolves(user)

    const organisation = new Organisation()
    organisation.fill({ id: 1, name: "John's Organisation" })
    sandbox.stub(OrganisationActions, 'getOrganisationRecord').resolves(null)
    sandbox.stub(OrganisationActions, 'createOrganisation').resolves(organisation)
    sandbox.stub(OrganisationActions, 'addUserToOrganisation').resolves()

    const request = {
      validate: sandbox.stub().resolves(),
      body: sandbox.stub().returns({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123',
        phone: '1234567890'
      })
    }
    const response = {
      status: sandbox.stub().returnsThis(),
      send: sandbox.stub()
    }
    const auth = {
      use: sandbox.stub().returns({
        attempt: sandbox.stub().resolves({
          token: 'jwt-token'
        })
      })
    }

    const ctx = { request, response, auth } as unknown as HttpContextContract

    await controller.handle(ctx)

    assert.isTrue(response.status.calledWith(201))
    assert.isTrue(response.send.calledWith({
      status: 'success',
      message: 'Registration successful',
      data: {
        accessToken: 'jwt-token',
        user: user.forClient()
      }
    }))

    sandbox.restore()
  })

  

  test('should return 500 if an error occurs during registration', async ({assert}) => {
    const controller = new UserRegistrationController()

    sandbox.stub(UserActions, 'createUser').throws(new Error('Simulated error'))

    const request = {
      validate: sandbox.stub().resolves(),
      body: sandbox.stub().returns({
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane.doe@example.com',
        password: 'password123',
        phone: '0987654321'
      })
    }

    const response = {
      status: sandbox.stub().returnsThis(),
      send: sandbox.stub()
    }
    const auth = {}

    const ctx = { request, response, auth } as unknown as HttpContextContract

    await controller.handle(ctx)

    assert.isTrue(response.status.calledWith(500))
    assert.isTrue(response.send.calledWith({
      status: 'Error',
      message: 'Error Occured Creating User',
      statusCode: 500
    }))
    sandbox.restore()
  })
})
