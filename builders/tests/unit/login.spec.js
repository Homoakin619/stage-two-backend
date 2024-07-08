"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const runner_1 = require("@japa/runner");
const sinon_1 = __importDefault(require("sinon"));
const UserAuthenticationController_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Controllers/Http/UserAuthenticationController"));
const UserAction_1 = global[Symbol.for('ioc.use')]("App/Actions/UserAction");
const Hash_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Hash"));
const StatusCodes_1 = global[Symbol.for('ioc.use')]("App/Helpers/StatusCodes");
const appConfig_1 = __importDefault(global[Symbol.for('ioc.use')]("Config/appConfig"));
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
runner_1.test.group('UserAuthenticationController', (group) => {
    let sandbox;
    group.setup(() => {
        sandbox = sinon_1.default.createSandbox();
    });
    group.teardown(() => {
        sandbox.restore();
    });
    (0, runner_1.test)('should authenticate user and return access token', async ({ assert }) => {
        const controller = new UserAuthenticationController_1.default();
        const user = new User_1.default();
        user.fill({
            userId: 'user-id',
            email: 'john.doe@example.com',
            password: 'password123',
            firstName: "john",
            lastName: "doe",
            phone: "09123456789"
        });
        sandbox.stub(UserAction_1.UserActions, 'getUserRecord').resolves(user);
        sandbox.stub(Hash_1.default, 'verify').resolves(true);
        sandbox.stub(appConfig_1.default, 'tokenExpiryTimeFrame').value(60);
        const authStub = {
            use: sandbox.stub().returnsThis(),
            attempt: sandbox.stub().resolves({ token: 'access-token' })
        };
        const request = {
            validate: sandbox.stub().resolves(),
            body: sandbox.stub().returns({ email: 'john.doe@example.com', password: 'password123' })
        };
        const response = {
            status: sandbox.stub().returnsThis(),
            send: sandbox.stub()
        };
        const ctx = { request, response, auth: authStub };
        await controller.handle(ctx);
        assert.isTrue(response.status.calledWith(StatusCodes_1.HttpStatusCodeEnum.OK));
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
                    phone: "09123456789"
                }
            }
        }));
    });
    (0, runner_1.test)('should return 422 if validation fails', async ({ assert }) => {
        const controller = new UserAuthenticationController_1.default();
        const request = {
            validate: sandbox.stub().throws({ messages: { errors: ['Validation failed'] } })
        };
        const response = {
            status: sandbox.stub().returnsThis(),
            send: sandbox.stub()
        };
        const ctx = { request, response, auth: {} };
        await controller.handle(ctx);
        assert.isTrue(response.status.calledWith(StatusCodes_1.HttpStatusCodeEnum.UNPROCESSABLE_ENTITY));
    });
    (0, runner_1.test)('should return 401 if authentication fails', async ({ assert }) => {
        const controller = new UserAuthenticationController_1.default();
        sandbox.stub(UserAction_1.UserActions, 'getUserRecord').resolves(null);
        const request = {
            validate: sandbox.stub().resolves(),
            body: sandbox.stub().returns({ email: 'john.doe@example.com', password: 'password123' })
        };
        const response = {
            status: sandbox.stub().returnsThis(),
            send: sandbox.stub()
        };
        const ctx = { request, response, auth: {} };
        await controller.handle(ctx);
        assert.isTrue(response.status.calledWith(StatusCodes_1.HttpStatusCodeEnum.UNAUTHORIZED));
        assert.isTrue(response.send.calledWith({
            status: 'Bad Request',
            message: 'Authentication failed',
            statusCode: StatusCodes_1.HttpStatusCodeEnum.UNAUTHORIZED
        }));
    });
    (0, runner_1.test)('should return 500 if an error occurs', async ({ assert }) => {
        const controller = new UserAuthenticationController_1.default();
        sandbox.stub(UserAction_1.UserActions, 'getUserRecord').throws(new Error('Simulated error'));
        const request = {
            validate: sandbox.stub().resolves(),
            body: sandbox.stub().returns({ email: 'john.doe@example.com', password: 'password123' })
        };
        const response = {
            status: sandbox.stub().returnsThis(),
            send: sandbox.stub()
        };
        const ctx = { request, response, auth: {} };
        await controller.handle(ctx);
        assert.isTrue(response.status.calledWith(StatusCodes_1.HttpStatusCodeEnum.INTERNAL_SERVER_ERROR));
        assert.isTrue(response.send.calledWith({
            status: 'Error',
            message: 'Error Occured',
            statusCode: StatusCodes_1.HttpStatusCodeEnum.INTERNAL_SERVER_ERROR
        }));
    });
});
//# sourceMappingURL=login.spec.js.map