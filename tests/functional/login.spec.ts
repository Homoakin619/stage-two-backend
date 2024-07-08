import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'
import { HttpStatusCodeEnum } from 'App/Helpers/StatusCodes'

test.group('User Authentication', (group) => {
  group.setup(async () => {
    await Database.beginGlobalTransaction()
  })

  group.teardown(async () => {
    await Database.rollbackGlobalTransaction()
  })

  test('should return 422 if validation fails', async ({ client }) => {
    const response = await client.post('/auth/login').json({})
    response.assertStatus(HttpStatusCodeEnum.UNPROCESSABLE_ENTITY)
  })

  test('should return 401 if user does not exist', async ({ client }) => {
    const response = await client.post('/auth/login').json({
      email: 'nonexistent@example.com',
      password: 'password123',
    })
    response.assertStatus(HttpStatusCodeEnum.UNAUTHORIZED)
  })

  test('should return 401 if password is incorrect', async ({ client }) => {
    const user = await User.create({
      email: 'james@king.com',
      password: await Hash.make('correct_password'),
      firstName: "james",
      lastName: "king",
      phone: "09012345678"
    })

    const response = await client.post('/auth/login').json({
      email: user.email,
      password: 'wrong_password',
    })
    response.assertStatus(HttpStatusCodeEnum.UNAUTHORIZED)
  })

  test('should return 200 if credentials are correct and token is generated', async ({ client }) => {
    const user = await User.create({
      email: 'test@example.com',
      password: 'password123',
      firstName: "james",
      lastName: "king",
      phone: "09012345678"
    })

    const response = await client.post('/auth/login').json({
      email: user.email,
      password: 'password123',
    })

    response.assertStatus(HttpStatusCodeEnum.OK)
    response.assertBodyContains({
        data: {
          accessToken: response.body().data.accessToken,
        },
      })
  })


})
