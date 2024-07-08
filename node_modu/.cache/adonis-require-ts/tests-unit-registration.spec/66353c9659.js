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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0cmF0aW9uLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZWdpc3RyYXRpb24uc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHlDQUFtQztBQUNuQyxrREFBeUI7QUFDekIsdUlBQXdGO0FBRXhGLDJGQUFpRDtBQUNqRCw2RUFBb0Q7QUFDcEQsNkZBQW9FO0FBRXBFLGlGQUFrQztBQUNsQyxpR0FBa0Q7QUFHbEQsYUFBSSxDQUFDLEtBQUssQ0FBQyw4QkFBOEIsRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO0lBQ25ELElBQUksYUFBYSxDQUFBO0lBQ2pCLElBQUksT0FBMkIsQ0FBQTtJQUUvQixLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxFQUFFO1FBQ3JCLGFBQWEsR0FBRyxNQUFNLGtCQUFRLENBQUMsc0JBQXNCLEVBQUUsQ0FBQTtRQUN2RCxPQUFPLEdBQUcsZUFBSyxDQUFDLGFBQWEsRUFBRSxDQUFBO0lBQ2pDLENBQUMsQ0FBQyxDQUFBO0lBRUYsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLElBQUksRUFBRTtRQUN4QixNQUFNLGtCQUFRLENBQUMseUJBQXlCLEVBQUUsQ0FBQTtRQUMxQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUE7SUFDbkIsQ0FBQyxDQUFDLENBQUE7SUFZRixJQUFBLGFBQUksRUFBQyx1Q0FBdUMsRUFBRSxLQUFLLEVBQUUsRUFBQyxNQUFNLEVBQUMsRUFBRSxFQUFFO1FBQy9ELE1BQU0sVUFBVSxHQUFHLElBQUksb0NBQTBCLEVBQUUsQ0FBQTtRQUVuRCxNQUFNLE9BQU8sR0FBRztZQUNkLFFBQVEsRUFBRSxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsUUFBUSxFQUFFLEVBQUUsTUFBTSxFQUFFLENBQUMsbUJBQW1CLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDaEYsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxPQUFPLENB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QTtRQUV6RSxNQUFNLFVBQVUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUE7UUFFNUIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO1FBQzlDLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7WUFDckMsTUFBTSxFQUFFLE9BQU87WUFDZixPQUFPLEVBQUUsNkJBQTZCO1lBQ3RDLFVBQVUsRUFBRSxHQUFHO1NBQ2hCLENBQUMsQ0FBQyxDQUFBO0lBQ0wsQ0FBQyxDQUFDLENBQUE7QUFDSixDQUFDLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHRlc3QgfSBmcm9tICdAamFwYS9ydW5uZXInXG5pbXBvcnQgc2lub24gZnJvbSBcInNpbm9uXCJcbmltcG9ydCBVc2VyUmVnaXN0cmF0aW9uQ29udHJvbGxlciBmcm9tICdBcHAvQ29udHJvbGxlcnMvSHR0cC9Vc2VyUmVnaXN0cmF0aW9uQ29udHJvbGxlcidcbmltcG9ydCB7IEh0dHBDb250ZXh0Q29udHJhY3QgfSBmcm9tICdAaW9jOkFkb25pcy9Db3JlL0h0dHBDb250ZXh0J1xuaW1wb3J0IERhdGFiYXNlIGZyb20gJ0Bpb2M6QWRvbmlzL0x1Y2lkL0RhdGFiYXNlJ1xuaW1wb3J0IHsgVXNlckFjdGlvbnMgfSBmcm9tICdBcHAvQWN0aW9ucy9Vc2VyQWN0aW9uJ1xuaW1wb3J0IHsgT3JnYW5pc2F0aW9uQWN0aW9ucyB9IGZyb20gJ0FwcC9BY3Rpb25zL09yZ2FuaXNhdGlvbkFjdGlvbidcbmltcG9ydCBIYXNoIGZyb20gJ0Bpb2M6QWRvbmlzL0NvcmUvSGFzaCdcbmltcG9ydCBVc2VyIGZyb20gJ0FwcC9Nb2RlbHMvVXNlcidcbmltcG9ydCBPcmdhbmlzYXRpb24gZnJvbSAnQXBwL01vZGVscy9PcmdhbmlzYXRpb24nXG5pbXBvcnQgYXBwQ29uZmlnIGZyb20gJ0NvbmZpZy9hcHBDb25maWcnXG5cbnRlc3QuZ3JvdXAoJ1VzZXIgUmVnaXN0cmF0aW9uIENvbnRyb2xsZXInLCAoZ3JvdXApID0+IHtcbiAgbGV0IGRiVHJhbnNhY3Rpb25cbiAgbGV0IHNhbmRib3g6IHNpbm9uLlNpbm9uU2FuZGJveFxuXG4gIGdyb3VwLnNldHVwKGFzeW5jICgpID0+IHtcbiAgICBkYlRyYW5zYWN0aW9uID0gYXdhaXQgRGF0YWJhc2UuYmVnaW5HbG9iYWxUcmFuc2FjdGlvbigpXG4gICAgc2FuZGJveCA9IHNpbm9uLmNyZWF0ZVNhbmRib3goKVxuICB9KVxuXG4gIGdyb3VwLnRlYXJkb3duKGFzeW5jICgpID0+IHtcbiAgICBhd2FpdCBEYXRhYmFzZS5yb2xsYmFja0dsb2JhbFRyYW5zYWN0aW9uKClcbiAgICBzYW5kYm94LnJlc3RvcmUoKVxuICB9KSBcblxuLy8gICBncm91cC5iZWZvcmVFYWNoKGFzeW5jICgpID0+IHtcbi8vICAgICBkYlRyYW5zYWN0aW9uID0gYXdhaXQgRGF0YWJhc2UudHJhbnNhY3Rpb24oKVxuLy8gICAgIHNhbmRib3ggPSBzaW5vbi5jcmVhdGVTYW5kYm94KClcbi8vICAgfSlcblxuLy8gICBncm91cC5hZnRlckVhY2goYXN5bmMgKCkgPT4ge1xuLy8gICAgIGF3YWl0IGRiVHJhbnNhY3Rpb24ucm9sbGJhY2soKVxuLy8gICAgIHNhbmRib3gucmVzdG9yZSgpXG4vLyAgIH0pXG5cbiAgdGVzdCgnc2hvdWxkIHJldHVybiA0MjIgaWYgdmFsaWRhdGlvbiBmYWlscycsIGFzeW5jICh7YXNzZXJ0fSkgPT4ge1xuICAgIGNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgVXNlclJlZ2lzdHJhdGlvbkNvbnRyb2xsZXIoKVxuXG4gICAgY29uc3QgcmVxdWVzdCA9IHtcbiAgICAgIHZhbGlkYXRlOiBzYW5kYm94LnN0dWIoKS50aHJvd3MoeyBtZXNzYWdlczogeyBlcnJvcnM6IFsnVmFsaWRhdGlvbiBmYWlsZWQnXSB9IH0pLFxuICAgICAgYm9keTogc2FuZGJveC5zdHViKCkucmV0dXJucyh7fSlcbiAgICB9XG4gICAgY29uc3QgcmVzcG9uc2UgPSB7XG4gICAgICBzdGF0dXM6IHNhbmRib3guc3R1YigpLnJldHVybnNUaGlzKCksXG4gICAgICBzZW5kOiBzYW5kYm94LnN0dWIoKVxuICAgIH1cbiAgICBjb25zdCBhdXRoID0ge31cblxuICAgIGNvbnN0IGN0eCA9IHsgcmVxdWVzdCwgcmVzcG9uc2UsIGF1dGggfSBhcyB1bmtub3duIGFzIEh0dHBDb250ZXh0Q29udHJhY3RcblxuICAgIGF3YWl0IGNvbnRyb2xsZXIuaGFuZGxlKGN0eClcblxuICAgIGFzc2VydC5pc1RydWUocmVzcG9uc2Uuc3RhdHVzLmNhbGxlZFdpdGgoNDIyKSlcbiAgICBcbiAgfSlcblxuICB0ZXN0KCdzaG91bGQgcmV0dXJuIDIwMSBpZiByZWdpc3RyYXRpb24gaXMgc3VjY2Vzc2Z1bCcsIGFzeW5jICh7YXNzZXJ0fSkgPT4ge1xuICAgIGNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgVXNlclJlZ2lzdHJhdGlvbkNvbnRyb2xsZXIoKVxuXG4gICAgY29uc3QgdXNlciA9IG5ldyBVc2VyKClcbiAgICB1c2VyLmZpbGwoeyBpZDogMSwgZW1haWw6ICdqb2huLmRvZUBleGFtcGxlLmNvbScsIGZpcnN0TmFtZTogJ0pvaG4nLCBsYXN0TmFtZTogJ0RvZScgfSlcbiAgICBzYW5kYm94LnN0dWIoVXNlckFjdGlvbnMsICdjcmVhdGVVc2VyJykucmVzb2x2ZXModXNlcilcblxuICAgIGNvbnN0IG9yZ2FuaXNhdGlvbiA9IG5ldyBPcmdhbmlzYXRpb24oKVxuICAgIG9yZ2FuaXNhdGlvbi5maWxsKHsgaWQ6IDEsIG5hbWU6IFwiSm9obidzIE9yZ2FuaXNhdGlvblwiIH0pXG4gICAgc2FuZGJveC5zdHViKE9yZ2FuaXNhdGlvbkFjdGlvbnMsICdnZXRPcmdhbmlzYXRpb25SZWNvcmQnKS5yZXNvbHZlcyhudWxsKVxuICAgIHNhbmRib3guc3R1YihPcmdhbmlzYXRpb25BY3Rpb25zLCAnY3JlYXRlT3JnYW5pc2F0aW9uJykucmVzb2x2ZXMob3JnYW5pc2F0aW9uKVxuICAgIHNhbmRib3guc3R1YihPcmdhbmlzYXRpb25BY3Rpb25zLCAnYWRkVXNlclRvT3JnYW5pc2F0aW9uJykucmVzb2x2ZXMoKVxuXG4gICAgY29uc3QgcmVxdWVzdCA9IHtcbiAgICAgIHZhbGlkYXRlOiBzYW5kYm94LnN0dWIoKS5yZXNvbHZlcygpLFxuICAgICAgYm9keTogc2FuZGJveC5zdHViKCkucmV0dXJucyh7XG4gICAgICAgIGZpcnN0TmFtZTogJ0pvaG4nLFxuICAgICAgICBsYXN0TmFtZTogJ0RvZScsXG4gICAgICAgIGVtYWlsOiAnam9obi5kb2VAZXhhbXBsZS5jb20nLFxuICAgICAgICBwYXNzd29yZDogJ3Bhc3N3b3JkMTIzJyxcbiAgICAgICAgcGhvbmU6ICcxMjM0NTY3ODkwJ1xuICAgICAgfSlcbiAgICB9XG4gICAgY29uc3QgcmVzcG9uc2UgPSB7XG4gICAgICBzdGF0dXM6IHNhbmRib3guc3R1YigpLnJldHVybnNUaGlzKCksXG4gICAgICBzZW5kOiBzYW5kYm94LnN0dWIoKVxuICAgIH1cbiAgICBjb25zdCBhdXRoID0ge1xuICAgICAgdXNlOiBzYW5kYm94LnN0dWIoKS5yZXR1cm5zKHtcbiAgICAgICAgYXR0ZW1wdDogc2FuZGJveC5zdHViKCkucmVzb2x2ZXMoe1xuICAgICAgICAgIHRva2VuOiAnand0LXRva2VuJ1xuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBjb25zdCBjdHggPSB7IHJlcXVlc3QsIHJlc3BvbnNlLCBhdXRoIH0gYXMgdW5rbm93biBhcyBIdHRwQ29udGV4dENvbnRyYWN0XG5cbiAgICBhd2FpdCBjb250cm9sbGVyLmhhbmRsZShjdHgpXG5cbiAgICBhc3NlcnQuaXNUcnVlKHJlc3BvbnNlLnN0YXR1cy5jYWxsZWRXaXRoKDIwMSkpXG4gICAgYXNzZXJ0LmlzVHJ1ZShyZXNwb25zZS5zZW5kLmNhbGxlZFdpdGgoe1xuICAgICAgc3RhdHVzOiAnc3VjY2VzcycsXG4gICAgICBtZXNzYWdlOiAnUmVnaXN0cmF0aW9uIHN1Y2Nlc3NmdWwnLFxuICAgICAgZGF0YToge1xuICAgICAgICBhY2Nlc3NUb2tlbjogJ2p3dC10b2tlbicsXG4gICAgICAgIHVzZXI6IHVzZXIuZm9yQ2xpZW50KClcbiAgICAgIH1cbiAgICB9KSlcbiAgfSlcblxuICB0ZXN0KCdzaG91bGQgcmV0dXJuIDUwMCBpZiBhbiBlcnJvciBvY2N1cnMgZHVyaW5nIHJlZ2lzdHJhdGlvbicsIGFzeW5jICh7YXNzZXJ0fSkgPT4ge1xuICAgIGNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgVXNlclJlZ2lzdHJhdGlvbkNvbnRyb2xsZXIoKVxuXG4gICAgc2FuZGJveC5zdHViKFVzZXJBY3Rpb25zLCAnY3JlYXRlVXNlcicpLnRocm93cyhuZXcgRXJyb3IoJ1NpbXVsYXRlZCBlcnJvcicpKVxuXG4gICAgY29uc3QgcmVxdWVzdCA9IHtcbiAgICAgIHZhbGlkYXRlOiBzYW5kYm94LnN0dWIoKS5yZXNvbHZlcygpLFxuICAgICAgYm9keTogc2FuZGJveC5zdHViKCkucmV0dXJucyh7XG4gICAgICAgIGZpcnN0TmFtZTogJ0phbmUnLFxuICAgICAgICBsYXN0TmFtZTogJ0RvZScsXG4gICAgICAgIGVtYWlsOiAnamFuZS5kb2VAZXhhbXBsZS5jb20nLFxuICAgICAgICBwYXNzd29yZDogJ3Bhc3N3b3JkMTIzJyxcbiAgICAgICAgcGhvbmU6ICcwOTg3NjU0MzIxJ1xuICAgICAgfSlcbiAgICB9XG4gICAgXG4gICAgY29uc3QgcmVzcG9uc2UgPSB7XG4gICAgICBzdGF0dXM6IHNhbmRib3guc3R1YigpLnJldHVybnNUaGlzKCksXG4gICAgICBzZW5kOiBzYW5kYm94LnN0dWIoKVxuICAgIH1cbiAgICBjb25zdCBhdXRoID0ge31cblxuICAgIGNvbnN0IGN0eCA9IHsgcmVxdWVzdCwgcmVzcG9uc2UsIGF1dGggfSBhcyB1bmtub3duIGFzIEh0dHBDb250ZXh0Q29udHJhY3RcblxuICAgIGF3YWl0IGNvbnRyb2xsZXIuaGFuZGxlKGN0eClcblxuICAgIGFzc2VydC5pc1RydWUocmVzcG9uc2Uuc3RhdHVzLmNhbGxlZFdpdGgoNTAwKSlcbiAgICBhc3NlcnQuaXNUcnVlKHJlc3BvbnNlLnNlbmQuY2FsbGVkV2l0aCh7XG4gICAgICBzdGF0dXM6ICdFcnJvcicsXG4gICAgICBtZXNzYWdlOiAnRXJyb3IgT2NjdXJlZCBDcmVhdGluZyBVc2VyJyxcbiAgICAgIHN0YXR1c0NvZGU6IDUwMFxuICAgIH0pKVxuICB9KVxufSlcbiJdfQ==