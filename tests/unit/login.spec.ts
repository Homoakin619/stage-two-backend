import { test } from '@japa/runner'
import sinon from 'sinon'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserAuthenticationController from 'App/Controllers/Http/UserAuthenticationController'
import { UserActions } from 'App/Actions/UserAction'
import Hash from '@ioc:Adonis/Core/Hash'
import { HttpStatusCodeEnum } from 'App/Helpers/StatusCodes'
import appConfig from 'Config/appConfig'
import User from 'App/Models/User'

test.group('UserAuthenticationController', (group) => {
    let sandbox: sinon.SinonSandbox

    group.setup(() => {
        sandbox = sinon.createSandbox()
    })

    group.teardown(() => {
        sandbox.restore()
    })

    test('should authenticate user and return access token', async ({ assert }) => {
        const controller = new UserAuthenticationController()
        const user = new User()
        user.fill({
            userId: 'user-id',
            email: 'john.doe@example.com',
            password: 'password123',
            firstName: "john",
            lastName: "doe",
            phone: "09123456789"
        })
        
        sandbox.stub(UserActions, 'getUserRecord').resolves(user)

        sandbox.stub(Hash, 'verify').resolves(true)
        sandbox.stub(appConfig, 'tokenExpiryTimeFrame').value(60)
        const authStub = {
            use: sandbox.stub().returnsThis(),
            attempt: sandbox.stub().resolves({ token: 'access-token' })
        }

        const request = {
            validate: sandbox.stub().resolves(),
            body: sandbox.stub().returns({ email: 'john.doe@example.com', password: 'password123' })
        }

        const response = {
            status: sandbox.stub().returnsThis(),
            send: sandbox.stub()
        }

        const ctx = { request, response, auth: authStub } as unknown as HttpContextContract

        await controller.handle(ctx)

        assert.isTrue(response.status.calledWith(HttpStatusCodeEnum.OK))
        assert.isTrue(response.send.calledWith({
            status: 'success',
            message: 'Login successful',
            data: {
                accessToken: 'access-token',
                user: { 
                    userId: 'user-id',
                    email: 'john.doe@example.com',
                    firstName: "john",
                    lastName: "doe",
                    phone: "09123456789" }
            }
        }))
    })

    test('should return 422 if validation fails', async ({ assert }) => {
        const controller = new UserAuthenticationController()

        const request = {
            validate: sandbox.stub().throws({ messages: { errors: ['Validation failed'] } })
        }

        const response = {
            status: sandbox.stub().returnsThis(),
            send: sandbox.stub()
        }

        const ctx = { request, response, auth: {} } as unknown as HttpContextContract

        await controller.handle(ctx)

        assert.isTrue(response.status.calledWith(HttpStatusCodeEnum.UNPROCESSABLE_ENTITY))
    })

    test('should return 401 if authentication fails', async ({ assert }) => {
        const controller = new UserAuthenticationController()

        sandbox.stub(UserActions, 'getUserRecord').resolves(null)

        const request = {
            validate: sandbox.stub().resolves(),
            body: sandbox.stub().returns({ email: 'john.doe@example.com', password: 'password123' })
        }

        const response = {
            status: sandbox.stub().returnsThis(),
            send: sandbox.stub()
        }

        const ctx = { request, response, auth: {} } as unknown as HttpContextContract

        await controller.handle(ctx)

        assert.isTrue(response.status.calledWith(HttpStatusCodeEnum.UNAUTHORIZED))
        assert.isTrue(response.send.calledWith({
            status: 'Bad Request',
            message: 'Authentication failed',
            statusCode: HttpStatusCodeEnum.UNAUTHORIZED
        }))
    })

    test('should return 500 if an error occurs', async ({ assert }) => {
        const controller = new UserAuthenticationController()

        sandbox.stub(UserActions, 'getUserRecord').throws(new Error('Simulated error'))

        const request = {
            validate: sandbox.stub().resolves(),
            body: sandbox.stub().returns({ email: 'john.doe@example.com', password: 'password123' })
        }

        const response = {
            status: sandbox.stub().returnsThis(),
            send: sandbox.stub()
        }

        const ctx = { request, response, auth: {} } as unknown as HttpContextContract

        await controller.handle(ctx)

        assert.isTrue(response.status.calledWith(HttpStatusCodeEnum.INTERNAL_SERVER_ERROR))
        assert.isTrue(response.send.calledWith({
            status: 'Error',
            message: 'Error Occured',
            statusCode: HttpStatusCodeEnum.INTERNAL_SERVER_ERROR
        }))
    })
})
