"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const runner_1 = require("@japa/runner");
const sinon_1 = __importDefault(require("sinon"));
const UserRegistrationController_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Controllers/Http/UserRegistrationController"));
const UserAction_1 = global[Symbol.for('ioc.use')]("App/Actions/UserAction");
const OrganisationAction_1 = global[Symbol.for('ioc.use')]("App/Actions/OrganisationAction");
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
const Organisation_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Organisation"));
runner_1.test.group('User Registration Controller', (group) => {
    let sandbox;
    group.setup(async () => {
        sandbox = sinon_1.default.createSandbox();
    });
    group.teardown(async () => {
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
        sandbox.restore();
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
        sandbox.restore();
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
        sandbox.restore();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0cmF0aW9uLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZWdpc3RyYXRpb24uc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHlDQUFtQztBQUNuQyxrREFBeUI7QUFDekIsdUlBQXdGO0FBRXhGLDZFQUFvRDtBQUNwRCw2RkFBb0U7QUFDcEUsaUZBQWtDO0FBQ2xDLGlHQUFrRDtBQUdsRCxhQUFJLENBQUMsS0FBSyxDQUFDLDhCQUE4QixFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7SUFFbkQsSUFBSSxPQUEyQixDQUFBO0lBRS9CLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLEVBQUU7UUFDckIsT0FBTyxHQUFHLGVBQUssQ0FBQyxhQUFhLEVBQUUsQ0FBQTtJQUNqQyxDQUFDLENBQUMsQ0FBQTtJQUVGLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxJQUFJLEVBQUU7UUFDeEIsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFBO0lBQ25CLENBQUMsQ0FBQyxDQUFBO0lBRUYsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxFQUFFO1FBQ3pCLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQTtJQUNuQixDQUFDLENBQUE7SUFHRCxJQUFBLGFBQUksRUFBQyx1Q0FBdUMsRUFBRSxLQUFLLEVBQUUsRUFBQyxNQUFNLEVBQUMsRUFBRSxFQUFFO1FBQy9ELE1BQU0sVUFBVSxHQUFHLElBQUksb0NBQTBCLEVBQUUsQ0FBQTtRQUVuRCxNQUFNLE9BQU8sR0FBRztZQUNkLFFBQVEsRUFBRSxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsUUFBUSxFQUFFLEVBQUUsTUFBTSxFQUFFLENBQUMsbUJBQW1CLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDaEYsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO1NBQ2pDLENBQUE7UUFDRCxN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QU8sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFvQyxDQUFBO1FBRXpFLE1BQU0sVUFBVSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUU1QixNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7UUFDOUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztZQUNyQyxNQUFNLEVBQUUsT0FBTztZQUNmLE9BQU8sRUFBRSw2QkFBNkI7WUFDdEMsVUFBVSxFQUFFLEdBQUc7U0FDaEIsQ0FBQyxDQUFDLENBQUE7UUFDSCxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUE7SUFDbkIsQ0FBQyxDQUFDLENBQUE7QUFDSixDQUFDLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHRlc3QgfSBmcm9tICdAamFwYS9ydW5uZXInXG5pbXBvcnQgc2lub24gZnJvbSBcInNpbm9uXCJcbmltcG9ydCBVc2VyUmVnaXN0cmF0aW9uQ29udHJvbGxlciBmcm9tICdBcHAvQ29udHJvbGxlcnMvSHR0cC9Vc2VyUmVnaXN0cmF0aW9uQ29udHJvbGxlcidcbmltcG9ydCB7IEh0dHBDb250ZXh0Q29udHJhY3QgfSBmcm9tICdAaW9jOkFkb25pcy9Db3JlL0h0dHBDb250ZXh0J1xuaW1wb3J0IHsgVXNlckFjdGlvbnMgfSBmcm9tICdBcHAvQWN0aW9ucy9Vc2VyQWN0aW9uJ1xuaW1wb3J0IHsgT3JnYW5pc2F0aW9uQWN0aW9ucyB9IGZyb20gJ0FwcC9BY3Rpb25zL09yZ2FuaXNhdGlvbkFjdGlvbidcbmltcG9ydCBVc2VyIGZyb20gJ0FwcC9Nb2RlbHMvVXNlcidcbmltcG9ydCBPcmdhbmlzYXRpb24gZnJvbSAnQXBwL01vZGVscy9PcmdhbmlzYXRpb24nXG5cblxudGVzdC5ncm91cCgnVXNlciBSZWdpc3RyYXRpb24gQ29udHJvbGxlcicsIChncm91cCkgPT4ge1xuICBcbiAgbGV0IHNhbmRib3g6IHNpbm9uLlNpbm9uU2FuZGJveFxuXG4gIGdyb3VwLnNldHVwKGFzeW5jICgpID0+IHtcbiAgICBzYW5kYm94ID0gc2lub24uY3JlYXRlU2FuZGJveCgpXG4gIH0pXG5cbiAgZ3JvdXAudGVhcmRvd24oYXN5bmMgKCkgPT4ge1xuICAgIHNhbmRib3gucmVzdG9yZSgpXG4gIH0pIFxuXG4gIGdyb3VwLmVhY2gudGVhcmRvd24gPSAoKSA9PiB7XG4gICAgc2FuZGJveC5yZXN0b3JlKClcbiAgfVxuXG5cbiAgdGVzdCgnc2hvdWxkIHJldHVybiA0MjIgaWYgdmFsaWRhdGlvbiBmYWlscycsIGFzeW5jICh7YXNzZXJ0fSkgPT4ge1xuICAgIGNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgVXNlclJlZ2lzdHJhdGlvbkNvbnRyb2xsZXIoKVxuXG4gICAgY29uc3QgcmVxdWVzdCA9IHtcbiAgICAgIHZhbGlkYXRlOiBzYW5kYm94LnN0dWIoKS50aHJvd3MoeyBtZXNzYWdlczogeyBlcnJvcnM6IFsnVmFsaWRhdGlvbiBmYWlsZWQnXSB9IH0pLFxuICAgICAgYm9keTogc2FuZGJveC5zdHViKCkucmV0dXJucyh7fSlcbiAgICB9XG4gICAgY29uc3QgcmVzcG9uc2UgPSB7XG4gICAgICBzdGF0dXM6IHNhbmRib3guc3R1YigpLnJldHVybnNUaGlzKCksXG4gICAgICBzZW5kOiBzYW5kYm94LnN0dWIoKVxuICAgIH1cbiAgICBjb25zdCBhdXRoID0ge31cblxuICAgIGNvbnN0IGN0eCA9IHsgcmVxdWVzdCwgcmVzcG9uc2UsIGF1dGggfSBhcyB1bmtub3duIGFzIEh0dHBDb250ZXh0Q29udHJhY3RcblxuICAgIGF3YWl0IGNvbnRyb2xsZXIuaGFuZGxlKGN0eClcblxuICAgIGFzc2VydC5pc1RydWUocmVzcG9uc2Uuc3RhdHVzLmNhbGxlZFdpdGgoNDIyKSlcbiAgICBzYW5kYm94LnJlc3RvcmUoKVxuICAgIFxuICB9KVxuXG4gIHRlc3QoJ3Nob3VsZCByZXR1cm4gMjAxIGlmIHJlZ2lzdHJhdGlvbiBpcyBzdWNjZXNzZnVsJywgYXN5bmMgKHthc3NlcnR9KSA9PiB7XG4gICAgY29uc3QgY29udHJvbGxlciA9IG5ldyBVc2VyUmVnaXN0cmF0aW9uQ29udHJvbGxlcigpXG5cbiAgICBjb25zdCB1c2VyID0gbmV3IFVzZXIoKVxuICAgIHVzZXIuZmlsbCh7IGlkOiAxLCBlbWFpbDogJ2pvaG4uZG9lQGV4YW1wbGUuY29tJywgZmlyc3ROYW1lOiAnSm9obicsIGxhc3ROYW1lOiAnRG9lJyB9KVxuICAgIHNhbmRib3guc3R1YihVc2VyQWN0aW9ucywgJ2NyZWF0ZVVzZXInKS5yZXNvbHZlcyh1c2VyKVxuXG4gICAgY29uc3Qgb3JnYW5pc2F0aW9uID0gbmV3IE9yZ2FuaXNhdGlvbigpXG4gICAgb3JnYW5pc2F0aW9uLmZpbGwoeyBpZDogMSwgbmFtZTogXCJKb2huJ3MgT3JnYW5pc2F0aW9uXCIgfSlcbiAgICBzYW5kYm94LnN0dWIoT3JnYW5pc2F0aW9uQWN0aW9ucywgJ2dldE9yZ2FuaXNhdGlvblJlY29yZCcpLnJlc29sdmVzKG51bGwpXG4gICAgc2FuZGJveC5zdHViKE9yZ2FuaXNhdGlvbkFjdGlvbnMsICdjcmVhdGVPcmdhbmlzYXRpb24nKS5yZXNvbHZlcyhvcmdhbmlzYXRpb24pXG4gICAgc2FuZGJveC5zdHViKE9yZ2FuaXNhdGlvbkFjdGlvbnMsICdhZGRVc2VyVG9PcmdhbmlzYXRpb24nKS5yZXNvbHZlcygpXG5cbiAgICBjb25zdCByZXF1ZXN0ID0ge1xuICAgICAgdmFsaWRhdGU6IHNhbmRib3guc3R1YigpLnJlc29sdmVzKCksXG4gICAgICBib2R5OiBzYW5kYm94LnN0dWIoKS5yZXR1cm5zKHtcbiAgICAgICAgZmlyc3ROYW1lOiAnSm9obicsXG4gICAgICAgIGxhc3ROYW1lOiAnRG9lJyxcbiAgICAgICAgZW1haWw6ICdqb2huLmRvZUBleGFtcGxlLmNvbScsXG4gICAgICAgIHBhc3N3b3JkOiAncGFzc3dvcmQxMjMnLFxuICAgICAgICBwaG9uZTogJzEyMzQ1Njc4OTAnXG4gICAgICB9KVxuICAgIH1cbiAgICBjb25zdCByZXNwb25zZSA9IHtcbiAgICAgIHN0YXR1czogc2FuZGJveC5zdHViKCkucmV0dXJuc1RoaXMoKSxcbiAgICAgIHNlbmQ6IHNhbmRib3guc3R1YigpXG4gICAgfVxuICAgIGNvbnN0IGF1dGggPSB7XG4gICAgICB1c2U6IHNhbmRib3guc3R1YigpLnJldHVybnMoe1xuICAgICAgICBhdHRlbXB0OiBzYW5kYm94LnN0dWIoKS5yZXNvbHZlcyh7XG4gICAgICAgICAgdG9rZW46ICdqd3QtdG9rZW4nXG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH1cblxuICAgIGNvbnN0IGN0eCA9IHsgcmVxdWVzdCwgcmVzcG9uc2UsIGF1dGggfSBhcyB1bmtub3duIGFzIEh0dHBDb250ZXh0Q29udHJhY3RcblxuICAgIGF3YWl0IGNvbnRyb2xsZXIuaGFuZGxlKGN0eClcblxuICAgIGFzc2VydC5pc1RydWUocmVzcG9uc2Uuc3RhdHVzLmNhbGxlZFdpdGgoMjAxKSlcbiAgICBhc3NlcnQuaXNUcnVlKHJlc3BvbnNlLnNlbmQuY2FsbGVkV2l0aCh7XG4gICAgICBzdGF0dXM6ICdzdWNjZXNzJyxcbiAgICAgIG1lc3NhZ2U6ICdSZWdpc3RyYXRpb24gc3VjY2Vzc2Z1bCcsXG4gICAgICBkYXRhOiB7XG4gICAgICAgIGFjY2Vzc1Rva2VuOiAnand0LXRva2VuJyxcbiAgICAgICAgdXNlcjogdXNlci5mb3JDbGllbnQoKVxuICAgICAgfVxuICAgIH0pKVxuXG4gICAgc2FuZGJveC5yZXN0b3JlKClcbiAgfSlcblxuICBcblxuICB0ZXN0KCdzaG91bGQgcmV0dXJuIDUwMCBpZiBhbiBlcnJvciBvY2N1cnMgZHVyaW5nIHJlZ2lzdHJhdGlvbicsIGFzeW5jICh7YXNzZXJ0fSkgPT4ge1xuICAgIGNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgVXNlclJlZ2lzdHJhdGlvbkNvbnRyb2xsZXIoKVxuXG4gICAgc2FuZGJveC5zdHViKFVzZXJBY3Rpb25zLCAnY3JlYXRlVXNlcicpLnRocm93cyhuZXcgRXJyb3IoJ1NpbXVsYXRlZCBlcnJvcicpKVxuXG4gICAgY29uc3QgcmVxdWVzdCA9IHtcbiAgICAgIHZhbGlkYXRlOiBzYW5kYm94LnN0dWIoKS5yZXNvbHZlcygpLFxuICAgICAgYm9keTogc2FuZGJveC5zdHViKCkucmV0dXJucyh7XG4gICAgICAgIGZpcnN0TmFtZTogJ0phbmUnLFxuICAgICAgICBsYXN0TmFtZTogJ0RvZScsXG4gICAgICAgIGVtYWlsOiAnamFuZS5kb2VAZXhhbXBsZS5jb20nLFxuICAgICAgICBwYXNzd29yZDogJ3Bhc3N3b3JkMTIzJyxcbiAgICAgICAgcGhvbmU6ICcwOTg3NjU0MzIxJ1xuICAgICAgfSlcbiAgICB9XG5cbiAgICBjb25zdCByZXNwb25zZSA9IHtcbiAgICAgIHN0YXR1czogc2FuZGJveC5zdHViKCkucmV0dXJuc1RoaXMoKSxcbiAgICAgIHNlbmQ6IHNhbmRib3guc3R1YigpXG4gICAgfVxuICAgIGNvbnN0IGF1dGggPSB7fVxuXG4gICAgY29uc3QgY3R4ID0geyByZXF1ZXN0LCByZXNwb25zZSwgYXV0aCB9IGFzIHVua25vd24gYXMgSHR0cENvbnRleHRDb250cmFjdFxuXG4gICAgYXdhaXQgY29udHJvbGxlci5oYW5kbGUoY3R4KVxuXG4gICAgYXNzZXJ0LmlzVHJ1ZShyZXNwb25zZS5zdGF0dXMuY2FsbGVkV2l0aCg1MDApKVxuICAgIGFzc2VydC5pc1RydWUocmVzcG9uc2Uuc2VuZC5jYWxsZWRXaXRoKHtcbiAgICAgIHN0YXR1czogJ0Vycm9yJyxcbiAgICAgIG1lc3NhZ2U6ICdFcnJvciBPY2N1cmVkIENyZWF0aW5nIFVzZXInLFxuICAgICAgc3RhdHVzQ29kZTogNTAwXG4gICAgfSkpXG4gICAgc2FuZGJveC5yZXN0b3JlKClcbiAgfSlcbn0pXG4iXX0=