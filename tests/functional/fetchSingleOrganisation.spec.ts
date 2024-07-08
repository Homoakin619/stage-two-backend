import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import { UserFactory } from 'Database/factories/UserFactory'
import User from 'App/Models/User'
import { OrganisationActions } from 'App/Actions/OrganisationAction'
import { OrganisationFactory } from 'Database/factories/OrganisationFactory'

test.group('FetchSingleOrganisationController', (group) => {
  let user: User
  
  let orgId: string
  let secondOrgId: string

  group.setup(async () => {
    await Database.beginGlobalTransaction()

    user = await UserFactory.create()
    
    
    const organisation = await OrganisationFactory.create()
    orgId = organisation.orgId

    const organisation2 = await OrganisationFactory.create()
    secondOrgId = organisation2.orgId

    await OrganisationActions.addUserToOrganisation({
      orgId: organisation.id,
      userId: user.id,
    })
  })

  group.teardown(async () => {
    await Database.rollbackGlobalTransaction()
  })

  test('should return 200 and organisation data if organisation is found', async ({ client, assert }) => {
    const response = await client
      .get(`/api/organisations/${orgId}`)
      .loginAs(user)
      .send()


    response.assertStatus(200)
    assert.equal(response.body().status, 'success')
    assert.equal(response.body().message, 'Organisation fetched successfully')
    assert.equal(response.body().data.orgId, orgId)
  })

  test('should return 404 if organisation is not found', async ({ client, assert }) => {
    const fakeOrgId = '123e4567-e89b-12d3-a456-426614174002'
    const response = await client
      .get(`/api/organisations/${fakeOrgId}`)
      .loginAs(user)
      .send()

    response.assertStatus(404)
    assert.equal(response.body().status, 'Bad Request')
    assert.equal(response.body().message, 'Organisation record not found')
    assert.isUndefined(response.body().data)
  })

  test('should return 404 if user not in organisation', async ({ client, assert }) => {
    
    const response = await client
      .get(`/api/organisations/${secondOrgId}`)
      .loginAs(user)
      .send()

    response.assertStatus(404)
    assert.equal(response.body().status, 'Bad Request')
    assert.equal(response.body().message, 'Organisation record not found')
    assert.isUndefined(response.body().data)
  })

})
