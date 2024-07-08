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
    let sandbox;
    group.setup(async () => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0cmF0aW9uLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZWdpc3RyYXRpb24uc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHlDQUFtQztBQUNuQyxrREFBeUI7QUFDekIsdUlBQXdGO0FBRXhGLDJGQUFpRDtBQUNqRCw2RUFBb0Q7QUFDcEQsNkZBQW9FO0FBQ3BFLGlGQUFrQztBQUNsQyxpR0FBa0Q7QUFHbEQsYUFBSSxDQUFDLEtBQUssQ0FBQyw4QkFBOEIsRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO0lBRW5ELElBQUksT0FBMkIsQ0FBQTtJQUUvQixLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxFQUFFO1FBQ3JCLE9BQU8sR0FBRyxlQUFLLENBQUMsYUFBYSxFQUFFLENBQUE7SUFDakMsQ0FBQyxDQUFDLENBQUE7SUFFRixLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssSUFBSSxFQUFFO1FBQ3hCLE1BQU0sa0JBQVEsQ0FBQyx5QkFBeUIsRUFBRSxDQUFBO1FBQzFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQTtJQUNuQixDQUFDLENBQUMsQ0FBQTtJQUVGLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsRUFBRTtRQUN6QixPQUFPLENBQUMsT0FBTyxFQUFFLENBQUE7SUFDbkIsQ0FBQyxDQUFBO0lBR0QsSUFBQSxhQUFJLEVBQUMsdUNBQXVDLEVBQUUsS0FBSyxFQUFFLEVBQUMsTUFBTSxFQUFDLEVBQUUsRUFBRTtRQUMvRCxNQUFNLFVBQVUsR0FBRyxJQUFJLG9DQUEwQixFQUFFLENBQUE7UUFFbkQsTUFBTSxPQUFPLEdBQUc7WUFDZCxRQUFRLEVBQUUsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLFFBQVEsRUFBRSxFQUFFLE1BQU0sRUFBRSxDQUFDLG1CQUFtQixDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ2hGLElBQUksRUFBRSxPQUFPLENBQUMs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TUFBTSxJQUFJLEdBQUcsRUFBRSxDQUFBO1FBRWYsTUFBTSxHQUFHLEdBQUcsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBb0MsQ0FBQTtRQUV6RSxNQUFNLFVBQVUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUE7UUFFNUIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO1FBQzlDLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7WUFDckMsTUFBTSxFQUFFLE9BQU87WUFDZixPQUFPLEVBQUUsNkJBQTZCO1lBQ3RDLFVBQVUsRUFBRSxHQUFHO1NBQ2hCLENBQUMsQ0FBQyxDQUFBO1FBQ0gsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFBO0lBQ25CLENBQUMsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB0ZXN0IH0gZnJvbSAnQGphcGEvcnVubmVyJ1xuaW1wb3J0IHNpbm9uIGZyb20gXCJzaW5vblwiXG5pbXBvcnQgVXNlclJlZ2lzdHJhdGlvbkNvbnRyb2xsZXIgZnJvbSAnQXBwL0NvbnRyb2xsZXJzL0h0dHAvVXNlclJlZ2lzdHJhdGlvbkNvbnRyb2xsZXInXG5pbXBvcnQgeyBIdHRwQ29udGV4dENvbnRyYWN0IH0gZnJvbSAnQGlvYzpBZG9uaXMvQ29yZS9IdHRwQ29udGV4dCdcbmltcG9ydCBEYXRhYmFzZSBmcm9tICdAaW9jOkFkb25pcy9MdWNpZC9EYXRhYmFzZSdcbmltcG9ydCB7IFVzZXJBY3Rpb25zIH0gZnJvbSAnQXBwL0FjdGlvbnMvVXNlckFjdGlvbidcbmltcG9ydCB7IE9yZ2FuaXNhdGlvbkFjdGlvbnMgfSBmcm9tICdBcHAvQWN0aW9ucy9PcmdhbmlzYXRpb25BY3Rpb24nXG5pbXBvcnQgVXNlciBmcm9tICdBcHAvTW9kZWxzL1VzZXInXG5pbXBvcnQgT3JnYW5pc2F0aW9uIGZyb20gJ0FwcC9Nb2RlbHMvT3JnYW5pc2F0aW9uJ1xuXG5cbnRlc3QuZ3JvdXAoJ1VzZXIgUmVnaXN0cmF0aW9uIENvbnRyb2xsZXInLCAoZ3JvdXApID0+IHtcbiAgXG4gIGxldCBzYW5kYm94OiBzaW5vbi5TaW5vblNhbmRib3hcblxuICBncm91cC5zZXR1cChhc3luYyAoKSA9PiB7XG4gICAgc2FuZGJveCA9IHNpbm9uLmNyZWF0ZVNhbmRib3goKVxuICB9KVxuXG4gIGdyb3VwLnRlYXJkb3duKGFzeW5jICgpID0+IHtcbiAgICBhd2FpdCBEYXRhYmFzZS5yb2xsYmFja0dsb2JhbFRyYW5zYWN0aW9uKClcbiAgICBzYW5kYm94LnJlc3RvcmUoKVxuICB9KSBcblxuICBncm91cC5lYWNoLnRlYXJkb3duID0gKCkgPT4ge1xuICAgIHNhbmRib3gucmVzdG9yZSgpXG4gIH1cblxuXG4gIHRlc3QoJ3Nob3VsZCByZXR1cm4gNDIyIGlmIHZhbGlkYXRpb24gZmFpbHMnLCBhc3luYyAoe2Fzc2VydH0pID0+IHtcbiAgICBjb25zdCBjb250cm9sbGVyID0gbmV3IFVzZXJSZWdpc3RyYXRpb25Db250cm9sbGVyKClcblxuICAgIGNvbnN0IHJlcXVlc3QgPSB7XG4gICAgICB2YWxpZGF0ZTogc2FuZGJveC5zdHViKCkudGhyb3dzKHsgbWVzc2FnZXM6IHsgZXJyb3JzOiBbJ1ZhbGlkYXRpb24gZmFpbGVkJ10gfSB9KSxcbiAgICAgIGJvZHk6IHNhbmRib3guc3R1YigpLnJldHVybnMoe30pXG4gICAgfVxuICAgIGNvbnN0IHJlc3BvbnNlID0ge1xuICAgICAgc3RhdHVzOiBzYW5kYm94LnN0dWIoKS5yZXR1cm5zVGhpcygpLFxuICAgICAgc2VuZDogc2FuZGJveC5zdHViKClcbiAgICB9XG4gICAgY29uc3QgYXV0aCA9IHt9XG5cbiAgICBjb25zdCBjdHggPSB7IHJlcXVlc3QsIHJlc3BvbnNlLCBhdXRoIH0gYXMgdW5rbm93biBhcyBIdHRwQ29udGV4dENvbnRyYWN0XG5cbiAgICBhd2FpdCBjb250cm9sbGVyLmhhbmRsZShjdHgpXG5cbiAgICBhc3NlcnQuaXNUcnVlKHJlc3BvbnNlLnN0YXR1cy5jYWxsZWRXaXRoKDQyMikpXG4gICAgc2FuZGJveC5yZXN0b3JlKClcbiAgICBcbiAgfSlcblxuICB0ZXN0KCdzaG91bGQgcmV0dXJuIDIwMSBpZiByZWdpc3RyYXRpb24gaXMgc3VjY2Vzc2Z1bCcsIGFzeW5jICh7YXNzZXJ0fSkgPT4ge1xuICAgIGNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgVXNlclJlZ2lzdHJhdGlvbkNvbnRyb2xsZXIoKVxuXG4gICAgY29uc3QgdXNlciA9IG5ldyBVc2VyKClcbiAgICB1c2VyLmZpbGwoeyBpZDogMSwgZW1haWw6ICdqb2huLmRvZUBleGFtcGxlLmNvbScsIGZpcnN0TmFtZTogJ0pvaG4nLCBsYXN0TmFtZTogJ0RvZScgfSlcbiAgICBzYW5kYm94LnN0dWIoVXNlckFjdGlvbnMsICdjcmVhdGVVc2VyJykucmVzb2x2ZXModXNlcilcblxuICAgIGNvbnN0IG9yZ2FuaXNhdGlvbiA9IG5ldyBPcmdhbmlzYXRpb24oKVxuICAgIG9yZ2FuaXNhdGlvbi5maWxsKHsgaWQ6IDEsIG5hbWU6IFwiSm9obidzIE9yZ2FuaXNhdGlvblwiIH0pXG4gICAgc2FuZGJveC5zdHViKE9yZ2FuaXNhdGlvbkFjdGlvbnMsICdnZXRPcmdhbmlzYXRpb25SZWNvcmQnKS5yZXNvbHZlcyhudWxsKVxuICAgIHNhbmRib3guc3R1YihPcmdhbmlzYXRpb25BY3Rpb25zLCAnY3JlYXRlT3JnYW5pc2F0aW9uJykucmVzb2x2ZXMob3JnYW5pc2F0aW9uKVxuICAgIHNhbmRib3guc3R1YihPcmdhbmlzYXRpb25BY3Rpb25zLCAnYWRkVXNlclRvT3JnYW5pc2F0aW9uJykucmVzb2x2ZXMoKVxuXG4gICAgY29uc3QgcmVxdWVzdCA9IHtcbiAgICAgIHZhbGlkYXRlOiBzYW5kYm94LnN0dWIoKS5yZXNvbHZlcygpLFxuICAgICAgYm9keTogc2FuZGJveC5zdHViKCkucmV0dXJucyh7XG4gICAgICAgIGZpcnN0TmFtZTogJ0pvaG4nLFxuICAgICAgICBsYXN0TmFtZTogJ0RvZScsXG4gICAgICAgIGVtYWlsOiAnam9obi5kb2VAZXhhbXBsZS5jb20nLFxuICAgICAgICBwYXNzd29yZDogJ3Bhc3N3b3JkMTIzJyxcbiAgICAgICAgcGhvbmU6ICcxMjM0NTY3ODkwJ1xuICAgICAgfSlcbiAgICB9XG4gICAgY29uc3QgcmVzcG9uc2UgPSB7XG4gICAgICBzdGF0dXM6IHNhbmRib3guc3R1YigpLnJldHVybnNUaGlzKCksXG4gICAgICBzZW5kOiBzYW5kYm94LnN0dWIoKVxuICAgIH1cbiAgICBjb25zdCBhdXRoID0ge1xuICAgICAgdXNlOiBzYW5kYm94LnN0dWIoKS5yZXR1cm5zKHtcbiAgICAgICAgYXR0ZW1wdDogc2FuZGJveC5zdHViKCkucmVzb2x2ZXMoe1xuICAgICAgICAgIHRva2VuOiAnand0LXRva2VuJ1xuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBjb25zdCBjdHggPSB7IHJlcXVlc3QsIHJlc3BvbnNlLCBhdXRoIH0gYXMgdW5rbm93biBhcyBIdHRwQ29udGV4dENvbnRyYWN0XG5cbiAgICBhd2FpdCBjb250cm9sbGVyLmhhbmRsZShjdHgpXG5cbiAgICBhc3NlcnQuaXNUcnVlKHJlc3BvbnNlLnN0YXR1cy5jYWxsZWRXaXRoKDIwMSkpXG4gICAgYXNzZXJ0LmlzVHJ1ZShyZXNwb25zZS5zZW5kLmNhbGxlZFdpdGgoe1xuICAgICAgc3RhdHVzOiAnc3VjY2VzcycsXG4gICAgICBtZXNzYWdlOiAnUmVnaXN0cmF0aW9uIHN1Y2Nlc3NmdWwnLFxuICAgICAgZGF0YToge1xuICAgICAgICBhY2Nlc3NUb2tlbjogJ2p3dC10b2tlbicsXG4gICAgICAgIHVzZXI6IHVzZXIuZm9yQ2xpZW50KClcbiAgICAgIH1cbiAgICB9KSlcblxuICAgIHNhbmRib3gucmVzdG9yZSgpXG4gIH0pXG5cbiAgXG5cbiAgdGVzdCgnc2hvdWxkIHJldHVybiA1MDAgaWYgYW4gZXJyb3Igb2NjdXJzIGR1cmluZyByZWdpc3RyYXRpb24nLCBhc3luYyAoe2Fzc2VydH0pID0+IHtcbiAgICBjb25zdCBjb250cm9sbGVyID0gbmV3IFVzZXJSZWdpc3RyYXRpb25Db250cm9sbGVyKClcblxuICAgIHNhbmRib3guc3R1YihVc2VyQWN0aW9ucywgJ2NyZWF0ZVVzZXInKS50aHJvd3MobmV3IEVycm9yKCdTaW11bGF0ZWQgZXJyb3InKSlcblxuICAgIGNvbnN0IHJlcXVlc3QgPSB7XG4gICAgICB2YWxpZGF0ZTogc2FuZGJveC5zdHViKCkucmVzb2x2ZXMoKSxcbiAgICAgIGJvZHk6IHNhbmRib3guc3R1YigpLnJldHVybnMoe1xuICAgICAgICBmaXJzdE5hbWU6ICdKYW5lJyxcbiAgICAgICAgbGFzdE5hbWU6ICdEb2UnLFxuICAgICAgICBlbWFpbDogJ2phbmUuZG9lQGV4YW1wbGUuY29tJyxcbiAgICAgICAgcGFzc3dvcmQ6ICdwYXNzd29yZDEyMycsXG4gICAgICAgIHBob25lOiAnMDk4NzY1NDMyMSdcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgY29uc3QgcmVzcG9uc2UgPSB7XG4gICAgICBzdGF0dXM6IHNhbmRib3guc3R1YigpLnJldHVybnNUaGlzKCksXG4gICAgICBzZW5kOiBzYW5kYm94LnN0dWIoKVxuICAgIH1cbiAgICBjb25zdCBhdXRoID0ge31cblxuICAgIGNvbnN0IGN0eCA9IHsgcmVxdWVzdCwgcmVzcG9uc2UsIGF1dGggfSBhcyB1bmtub3duIGFzIEh0dHBDb250ZXh0Q29udHJhY3RcblxuICAgIGF3YWl0IGNvbnRyb2xsZXIuaGFuZGxlKGN0eClcblxuICAgIGFzc2VydC5pc1RydWUocmVzcG9uc2Uuc3RhdHVzLmNhbGxlZFdpdGgoNTAwKSlcbiAgICBhc3NlcnQuaXNUcnVlKHJlc3BvbnNlLnNlbmQuY2FsbGVkV2l0aCh7XG4gICAgICBzdGF0dXM6ICdFcnJvcicsXG4gICAgICBtZXNzYWdlOiAnRXJyb3IgT2NjdXJlZCBDcmVhdGluZyBVc2VyJyxcbiAgICAgIHN0YXR1c0NvZGU6IDUwMFxuICAgIH0pKVxuICAgIHNhbmRib3gucmVzdG9yZSgpXG4gIH0pXG59KVxuIl19