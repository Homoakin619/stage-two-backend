import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User'
import Organisation from 'App/Models/Organisation'
import { HttpStatusCodeEnum } from 'App/Helpers/StatusCodes'

test.group('User Registration', (group) => {
  group.setup(async () => {
    await Database.beginGlobalTransaction()
  })

  group.teardown(async () => {
    await Database.rollbackGlobalTransaction()
  }) 


  test('should return 201 if registration is successful and default organisation is created', async ({ client, assert }) => {
    const response = await client.post('/auth/register').json({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      phone: '1234567890'
    })

    response.assertStatus(HttpStatusCodeEnum.CREATED)
    response.assertBodyContains({
      status: 'success',
      message: 'Registration successful',
    })
    response.assertBodyContains({
      data: {
        accessToken: response.body().data.accessToken,
      }
    })

    const user = await User.findBy('email', 'john.doe@example.com')
    const organisation = await Organisation.findBy('name', "John's Organisation")
    
    assert.isNotNull(user)
    assert .isNotNull(organisation)
  })

  test('should return 422 if validation fails', async ({ client }) => {
    const response = await client.post('/auth/register').json({})
    response.assertStatus(HttpStatusCodeEnum.UNPROCESSABLE_ENTITY)
  }) 

})
