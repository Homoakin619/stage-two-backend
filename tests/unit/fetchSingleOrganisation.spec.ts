import {test} from '@japa/runner'
import sinon from 'sinon'
import FetchSingleOrganisationController from 'App/Controllers/Http/FetchSingleOrganisationController'
import { UserActions } from 'App/Actions/UserAction'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import  User  from 'App/Models/User'

test.group('FetchSingleOrganisationController', (group) => {
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


  test('should return 200 and organisation data if organisation is found', async ({ assert }) => {
    const controller = new FetchSingleOrganisationController()

    const fakeUser = { userId: '123e4567-e89b-12d3-a456-426614174000' } as User
    const orgId = '123e4567-e89b-12d3-a456-426614174001'
    const fakeOrganisations = [{ orgId: '123e4567-e89b-12d3-a456-426614174001', name: 'Test Org', description:"a random organisation" }]

    sandbox.stub(UserActions, 'fetchUserOrganisations').resolves(fakeOrganisations)

    const request = {
      param: sandbox.stub().returns(orgId)
    }

    const response = {
      status: sandbox.stub().returnsThis(),
      send: sandbox.stub()
    }

    const auth = {
      user: fakeUser
    }

    const ctx = { request, response, auth } as unknown as HttpContextContract

    await controller.handle(ctx)

    assert.isTrue(response.status.calledWith(200))
    assert.isTrue(response.send.calledWith({
      status: "success",
      message: "Organisation fetched successfully",
      data: fakeOrganisations[0]
    }))
    sandbox.restore()
  })

  test('should return 404 if organisation is not found', async ({ assert }) => {
    const controller = new FetchSingleOrganisationController()

    const fakeUser = { userId: '123e4567-e89b-12d3-a456-426614174000' } as User
    const orgId = '123e4567-e89b-12d3-a456-426614174001'
    const fakeOrganisations = [{ orgId: '123e4567-e89b-12d3-a456-426614174002', name: 'Other Org', description: "nice description" }]

    sandbox.stub(UserActions, 'fetchUserOrganisations').resolves(fakeOrganisations)

    const request = {
      param: sandbox.stub().returns(orgId)
    }

    const response = {
      status: sandbox.stub().returnsThis(),
      send: sandbox.stub()
    }

    const auth = {
      user: fakeUser
    }

    const ctx = { request, response, auth } as unknown as HttpContextContract

    await controller.handle(ctx)

    assert.isTrue(response.status.calledWith(404))
    assert.isTrue(response.send.calledWith({
      status: "Bad Request",
      message: "Organisation record not found",
      data: undefined
    }))
    sandbox.restore()
  })

  test('should return 500 if an error occurs', async ({ assert }) => {
    const controller = new FetchSingleOrganisationController()

    const fakeUser = { userId: '123e4567-e89b-12d3-a456-426614174000' } as User
    const orgId = '123e4567-e89b-12d3-a456-426614174001'

    sandbox.stub(UserActions, 'fetchUserOrganisations').throws(new Error('Simulated error'))

    const request = {
      param: sandbox.stub().returns(orgId)
    }

    const response = {
      status: sandbox.stub().returnsThis(),
      send: sandbox.stub()
    }

    const auth = {
      user: fakeUser
    }

    const ctx = { request, response, auth } as unknown as HttpContextContract

    await controller.handle(ctx)

    assert.isTrue(response.status.calledWith(500))
    assert.isTrue(response.send.calledWith({
      status: "Error",
      message: "Error Occured Fetching Organisation",
      statusCode: 500
    }))

    sandbox.restore()
  })
})
