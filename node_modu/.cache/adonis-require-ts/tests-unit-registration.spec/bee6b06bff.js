"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const runner_1 = require("@japa/runner");
const sinon_1 = __importDefault(require("sinon"));
const UserRegistrationController_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Controllers/Http/UserRegistrationController"));
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
const UserAction_1 = global[Symbol.for('ioc.use')]("App/Actions/UserAction");
const OrganisationAction_1 = global[Symbol.for('ioc.use')]("App/Actions/OrganisationAction");
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
const Organisation_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Organisation"));
runner_1.test.group('User Registration Controller', (group) => {
    let dbTransaction;
    let sandbox;
    group.setup(async () => {
        dbTransaction = await Database_1.default.beginGlobalTransaction();
        sandbox = sinon_1.default.createSandbox();
    });
    group.teardown(async () => {
        await Database_1.default.rollbackGlobalTransaction();
        sandbox.restore();
    });
    group.each.teardown = () => {
        sandbox.restore();
    };
    (0, runner_1.test)('should return 422 if validation fails', async ({ assert }) => {
        const controller = new UserRegistrationController_1.default();
        const request = {
            validate: sandbox.stub().throws({ messages: { errors: ['Validation failed'] } }),
            body: sandbox.stub().returns({})
        };
        const response = {
            status: sandbox.stub().returnsThis(),
            send: sandbox.stub()
        };
        const auth = {};
        const ctx = { request, response, auth };
        await controller.handle(ctx);
        assert.isTrue(response.status.calledWith(422));
    });
    (0, runner_1.test)('should return 201 if registration is successful', async ({ assert }) => {
        const controller = new UserRegistrationController_1.default();
        const user = new User_1.default();
        user.fill({ id: 1, email: 'john.doe@example.com', firstName: 'John', lastName: 'Doe' });
        sandbox.stub(UserAction_1.UserActions, 'createUser').resolves(user);
        const organisation = new Organisation_1.default();
        organisation.fill({ id: 1, name: "John's Organisation" });
        sandbox.stub(OrganisationAction_1.OrganisationActions, 'getOrganisationRecord').resolves(null);
        sandbox.stub(OrganisationAction_1.OrganisationActions, 'createOrganisation').resolves(organisation);
        sandbox.stub(OrganisationAction_1.OrganisationActions, 'addUserToOrganisation').resolves();
        const request = {
            validate: sandbox.stub().resolves(),
            body: sandbox.stub().returns({
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@example.com',
                password: 'password123',
                phone: '1234567890'
            })
        };
        const response = {
            status: sandbox.stub().returnsThis(),
            send: sandbox.stub()
        };
        const auth = {
            use: sandbox.stub().returns({
                attempt: sandbox.stub().resolves({
                    token: 'jwt-token'
                })
            })
        };
        const ctx = { request, response, auth };
        await controller.handle(ctx);
        assert.isTrue(response.status.calledWith(201));
        assert.isTrue(response.send.calledWith({
            status: 'success',
            message: 'Registration successful',
            data: {
                accessToken: 'jwt-token',
                user: user.forClient()
            }
        }));
    });
    (0, runner_1.test)('should return 500 if an error occurs during registration', async ({ assert }) => {
        const controller = new UserRegistrationController_1.default();
        sandbox.stub(UserAction_1.UserActions, 'createUser').throws(new Error('Simulated error'));
        const request = {
            validate: sandbox.stub().resolves(),
            body: sandbox.stub().returns({
                firstName: 'Jane',
                lastName: 'Doe',
                email: 'jane.doe@example.com',
                password: 'password123',
                phone: '0987654321'
            })
        };
        const response = {
            status: sandbox.stub().returnsThis(),
            send: sandbox.stub()
        };
        const auth = {};
        const ctx = { request, response, auth };
        await controller.handle(ctx);
        assert.isTrue(response.status.calledWith(500));
        assert.isTrue(response.send.calledWith({
            status: 'Error',
            message: 'Error Occured Creating User',
            statusCode: 500
        }));
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0cmF0aW9uLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZWdpc3RyYXRpb24uc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHlDQUFtQztBQUNuQyxrREFBeUI7QUFDekIsdUlBQXdGO0FBRXhGLDJGQUFpRDtBQUNqRCw2RUFBb0Q7QUFDcEQsNkZBQW9FO0FBRXBFLGlGQUFrQztBQUNsQyxpR0FBa0Q7QUFHbEQsYUFBSSxDQUFDLEtBQUssQ0FBQyw4QkFBOEIsRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO0lBQ25ELElBQUksYUFBYSxDQUFBO0lBQ2pCLElBQUksT0FBMkIsQ0FBQTtJQUUvQixLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxFQUFFO1FBQ3JCLGFBQWEsR0FBRyxNQUFNLGtCQUFRLENBQUMsc0JBQXNCLEVBQUUsQ0FBQTtRQUN2RCxPQUFPLEdBQUcsZUFBSyxDQUFDLGFBQWEsRUFBRSxDQUFBO0lBQ2pDLENBQUMsQ0FBQyxDQUFBO0lBRUYsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLElBQUksRUFBRTtRQUN4QixNQUFNLGtCQUFRLENBQUMseUJBQXlCLEVBQUUsQ0FBQTtRQUMxQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUE7SUFDbkIsQ0FBQyxDQUFDLENBQUE7SUFFRixLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxHQUFHLEVBQUU7UUFDekIsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFBO0lBQ25CLENBQUMsQ0FBQTtJQUdELElBQUEsYUFBSSxFQUFDLHVDQUF1QyxFQUFFLEtBQUssRUFBRSxFQUFDLE1BQU0sRUFBQyxFQUFFLEVBQUU7UUFDL0QsTUFBTSxVQUFVLEdBQUcsSUFBSSxvQ0FBMEIsRUFBRSxDQUFBO1FBRW5ELE1BQU0sT0FBTyxHQUFHO1lBQ2QsUUFBUSxFQUFFLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxRQUFRLEVBQUUsRUFB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QUE7UUFDRCxNQUFNLElBQUksR0FBRyxFQUFFLENBQUE7UUFFZixNQUFNLEdBQUcsR0FBRyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFvQyxDQUFBO1FBRXpFLE1BQU0sVUFBVSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUU1QixNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7UUFDOUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztZQUNyQyxNQUFNLEVBQUUsT0FBTztZQUNmLE9BQU8sRUFBRSw2QkFBNkI7WUFDdEMsVUFBVSxFQUFFLEdBQUc7U0FDaEIsQ0FBQyxDQUFDLENBQUE7SUFDTCxDQUFDLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdGVzdCB9IGZyb20gJ0BqYXBhL3J1bm5lcidcbmltcG9ydCBzaW5vbiBmcm9tIFwic2lub25cIlxuaW1wb3J0IFVzZXJSZWdpc3RyYXRpb25Db250cm9sbGVyIGZyb20gJ0FwcC9Db250cm9sbGVycy9IdHRwL1VzZXJSZWdpc3RyYXRpb25Db250cm9sbGVyJ1xuaW1wb3J0IHsgSHR0cENvbnRleHRDb250cmFjdCB9IGZyb20gJ0Bpb2M6QWRvbmlzL0NvcmUvSHR0cENvbnRleHQnXG5pbXBvcnQgRGF0YWJhc2UgZnJvbSAnQGlvYzpBZG9uaXMvTHVjaWQvRGF0YWJhc2UnXG5pbXBvcnQgeyBVc2VyQWN0aW9ucyB9IGZyb20gJ0FwcC9BY3Rpb25zL1VzZXJBY3Rpb24nXG5pbXBvcnQgeyBPcmdhbmlzYXRpb25BY3Rpb25zIH0gZnJvbSAnQXBwL0FjdGlvbnMvT3JnYW5pc2F0aW9uQWN0aW9uJ1xuaW1wb3J0IEhhc2ggZnJvbSAnQGlvYzpBZG9uaXMvQ29yZS9IYXNoJ1xuaW1wb3J0IFVzZXIgZnJvbSAnQXBwL01vZGVscy9Vc2VyJ1xuaW1wb3J0IE9yZ2FuaXNhdGlvbiBmcm9tICdBcHAvTW9kZWxzL09yZ2FuaXNhdGlvbidcbmltcG9ydCBhcHBDb25maWcgZnJvbSAnQ29uZmlnL2FwcENvbmZpZydcblxudGVzdC5ncm91cCgnVXNlciBSZWdpc3RyYXRpb24gQ29udHJvbGxlcicsIChncm91cCkgPT4ge1xuICBsZXQgZGJUcmFuc2FjdGlvblxuICBsZXQgc2FuZGJveDogc2lub24uU2lub25TYW5kYm94XG5cbiAgZ3JvdXAuc2V0dXAoYXN5bmMgKCkgPT4ge1xuICAgIGRiVHJhbnNhY3Rpb24gPSBhd2FpdCBEYXRhYmFzZS5iZWdpbkdsb2JhbFRyYW5zYWN0aW9uKClcbiAgICBzYW5kYm94ID0gc2lub24uY3JlYXRlU2FuZGJveCgpXG4gIH0pXG5cbiAgZ3JvdXAudGVhcmRvd24oYXN5bmMgKCkgPT4ge1xuICAgIGF3YWl0IERhdGFiYXNlLnJvbGxiYWNrR2xvYmFsVHJhbnNhY3Rpb24oKVxuICAgIHNhbmRib3gucmVzdG9yZSgpXG4gIH0pIFxuXG4gIGdyb3VwLmVhY2gudGVhcmRvd24gPSAoKSA9PiB7XG4gICAgc2FuZGJveC5yZXN0b3JlKClcbiAgfVxuXG5cbiAgdGVzdCgnc2hvdWxkIHJldHVybiA0MjIgaWYgdmFsaWRhdGlvbiBmYWlscycsIGFzeW5jICh7YXNzZXJ0fSkgPT4ge1xuICAgIGNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgVXNlclJlZ2lzdHJhdGlvbkNvbnRyb2xsZXIoKVxuXG4gICAgY29uc3QgcmVxdWVzdCA9IHtcbiAgICAgIHZhbGlkYXRlOiBzYW5kYm94LnN0dWIoKS50aHJvd3MoeyBtZXNzYWdlczogeyBlcnJvcnM6IFsnVmFsaWRhdGlvbiBmYWlsZWQnXSB9IH0pLFxuICAgICAgYm9keTogc2FuZGJveC5zdHViKCkucmV0dXJucyh7fSlcbiAgICB9XG4gICAgY29uc3QgcmVzcG9uc2UgPSB7XG4gICAgICBzdGF0dXM6IHNhbmRib3guc3R1YigpLnJldHVybnNUaGlzKCksXG4gICAgICBzZW5kOiBzYW5kYm94LnN0dWIoKVxuICAgIH1cbiAgICBjb25zdCBhdXRoID0ge31cblxuICAgIGNvbnN0IGN0eCA9IHsgcmVxdWVzdCwgcmVzcG9uc2UsIGF1dGggfSBhcyB1bmtub3duIGFzIEh0dHBDb250ZXh0Q29udHJhY3RcblxuICAgIGF3YWl0IGNvbnRyb2xsZXIuaGFuZGxlKGN0eClcblxuICAgIGFzc2VydC5pc1RydWUocmVzcG9uc2Uuc3RhdHVzLmNhbGxlZFdpdGgoNDIyKSlcbiAgICBcbiAgfSlcblxuICB0ZXN0KCdzaG91bGQgcmV0dXJuIDIwMSBpZiByZWdpc3RyYXRpb24gaXMgc3VjY2Vzc2Z1bCcsIGFzeW5jICh7YXNzZXJ0fSkgPT4ge1xuICAgIGNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgVXNlclJlZ2lzdHJhdGlvbkNvbnRyb2xsZXIoKVxuXG4gICAgY29uc3QgdXNlciA9IG5ldyBVc2VyKClcbiAgICB1c2VyLmZpbGwoeyBpZDogMSwgZW1haWw6ICdqb2huLmRvZUBleGFtcGxlLmNvbScsIGZpcnN0TmFtZTogJ0pvaG4nLCBsYXN0TmFtZTogJ0RvZScgfSlcbiAgICBzYW5kYm94LnN0dWIoVXNlckFjdGlvbnMsICdjcmVhdGVVc2VyJykucmVzb2x2ZXModXNlcilcblxuICAgIGNvbnN0IG9yZ2FuaXNhdGlvbiA9IG5ldyBPcmdhbmlzYXRpb24oKVxuICAgIG9yZ2FuaXNhdGlvbi5maWxsKHsgaWQ6IDEsIG5hbWU6IFwiSm9obidzIE9yZ2FuaXNhdGlvblwiIH0pXG4gICAgc2FuZGJveC5zdHViKE9yZ2FuaXNhdGlvbkFjdGlvbnMsICdnZXRPcmdhbmlzYXRpb25SZWNvcmQnKS5yZXNvbHZlcyhudWxsKVxuICAgIHNhbmRib3guc3R1YihPcmdhbmlzYXRpb25BY3Rpb25zLCAnY3JlYXRlT3JnYW5pc2F0aW9uJykucmVzb2x2ZXMob3JnYW5pc2F0aW9uKVxuICAgIHNhbmRib3guc3R1YihPcmdhbmlzYXRpb25BY3Rpb25zLCAnYWRkVXNlclRvT3JnYW5pc2F0aW9uJykucmVzb2x2ZXMoKVxuXG4gICAgY29uc3QgcmVxdWVzdCA9IHtcbiAgICAgIHZhbGlkYXRlOiBzYW5kYm94LnN0dWIoKS5yZXNvbHZlcygpLFxuICAgICAgYm9keTogc2FuZGJveC5zdHViKCkucmV0dXJucyh7XG4gICAgICAgIGZpcnN0TmFtZTogJ0pvaG4nLFxuICAgICAgICBsYXN0TmFtZTogJ0RvZScsXG4gICAgICAgIGVtYWlsOiAnam9obi5kb2VAZXhhbXBsZS5jb20nLFxuICAgICAgICBwYXNzd29yZDogJ3Bhc3N3b3JkMTIzJyxcbiAgICAgICAgcGhvbmU6ICcxMjM0NTY3ODkwJ1xuICAgICAgfSlcbiAgICB9XG4gICAgY29uc3QgcmVzcG9uc2UgPSB7XG4gICAgICBzdGF0dXM6IHNhbmRib3guc3R1YigpLnJldHVybnNUaGlzKCksXG4gICAgICBzZW5kOiBzYW5kYm94LnN0dWIoKVxuICAgIH1cbiAgICBjb25zdCBhdXRoID0ge1xuICAgICAgdXNlOiBzYW5kYm94LnN0dWIoKS5yZXR1cm5zKHtcbiAgICAgICAgYXR0ZW1wdDogc2FuZGJveC5zdHViKCkucmVzb2x2ZXMoe1xuICAgICAgICAgIHRva2VuOiAnand0LXRva2VuJ1xuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBjb25zdCBjdHggPSB7IHJlcXVlc3QsIHJlc3BvbnNlLCBhdXRoIH0gYXMgdW5rbm93biBhcyBIdHRwQ29udGV4dENvbnRyYWN0XG5cbiAgICBhd2FpdCBjb250cm9sbGVyLmhhbmRsZShjdHgpXG5cbiAgICBhc3NlcnQuaXNUcnVlKHJlc3BvbnNlLnN0YXR1cy5jYWxsZWRXaXRoKDIwMSkpXG4gICAgYXNzZXJ0LmlzVHJ1ZShyZXNwb25zZS5zZW5kLmNhbGxlZFdpdGgoe1xuICAgICAgc3RhdHVzOiAnc3VjY2VzcycsXG4gICAgICBtZXNzYWdlOiAnUmVnaXN0cmF0aW9uIHN1Y2Nlc3NmdWwnLFxuICAgICAgZGF0YToge1xuICAgICAgICBhY2Nlc3NUb2tlbjogJ2p3dC10b2tlbicsXG4gICAgICAgIHVzZXI6IHVzZXIuZm9yQ2xpZW50KClcbiAgICAgIH1cbiAgICB9KSlcbiAgfSlcblxuICBcblxuICB0ZXN0KCdzaG91bGQgcmV0dXJuIDUwMCBpZiBhbiBlcnJvciBvY2N1cnMgZHVyaW5nIHJlZ2lzdHJhdGlvbicsIGFzeW5jICh7YXNzZXJ0fSkgPT4ge1xuICAgIGNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgVXNlclJlZ2lzdHJhdGlvbkNvbnRyb2xsZXIoKVxuXG4gICAgc2FuZGJveC5zdHViKFVzZXJBY3Rpb25zLCAnY3JlYXRlVXNlcicpLnRocm93cyhuZXcgRXJyb3IoJ1NpbXVsYXRlZCBlcnJvcicpKVxuXG4gICAgY29uc3QgcmVxdWVzdCA9IHtcbiAgICAgIHZhbGlkYXRlOiBzYW5kYm94LnN0dWIoKS5yZXNvbHZlcygpLFxuICAgICAgYm9keTogc2FuZGJveC5zdHViKCkucmV0dXJucyh7XG4gICAgICAgIGZpcnN0TmFtZTogJ0phbmUnLFxuICAgICAgICBsYXN0TmFtZTogJ0RvZScsXG4gICAgICAgIGVtYWlsOiAnamFuZS5kb2VAZXhhbXBsZS5jb20nLFxuICAgICAgICBwYXNzd29yZDogJ3Bhc3N3b3JkMTIzJyxcbiAgICAgICAgcGhvbmU6ICcwOTg3NjU0MzIxJ1xuICAgICAgfSlcbiAgICB9XG5cbiAgICBjb25zdCByZXNwb25zZSA9IHtcbiAgICAgIHN0YXR1czogc2FuZGJveC5zdHViKCkucmV0dXJuc1RoaXMoKSxcbiAgICAgIHNlbmQ6IHNhbmRib3guc3R1YigpXG4gICAgfVxuICAgIGNvbnN0IGF1dGggPSB7fVxuXG4gICAgY29uc3QgY3R4ID0geyByZXF1ZXN0LCByZXNwb25zZSwgYXV0aCB9IGFzIHVua25vd24gYXMgSHR0cENvbnRleHRDb250cmFjdFxuXG4gICAgYXdhaXQgY29udHJvbGxlci5oYW5kbGUoY3R4KVxuXG4gICAgYXNzZXJ0LmlzVHJ1ZShyZXNwb25zZS5zdGF0dXMuY2FsbGVkV2l0aCg1MDApKVxuICAgIGFzc2VydC5pc1RydWUocmVzcG9uc2Uuc2VuZC5jYWxsZWRXaXRoKHtcbiAgICAgIHN0YXR1czogJ0Vycm9yJyxcbiAgICAgIG1lc3NhZ2U6ICdFcnJvciBPY2N1cmVkIENyZWF0aW5nIFVzZXInLFxuICAgICAgc3RhdHVzQ29kZTogNTAwXG4gICAgfSkpXG4gIH0pXG59KVxuIl19