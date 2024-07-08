"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const runner_1 = require("@japa/runner");
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
const Organisation_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Organisation"));
const StatusCodes_1 = global[Symbol.for('ioc.use')]("App/Helpers/StatusCodes");
runner_1.test.group('User Registration', (group) => {
    group.setup(async () => {
        await Database_1.default.beginGlobalTransaction();
    });
    group.teardown(async () => {
        await Database_1.default.rollbackGlobalTransaction();
    });
    (0, runner_1.test)('should return 422 if validation fails', async ({ client, assert }) => {
        const response = await client.post('/auth/register').json({});
        response.assertStatus(StatusCodes_1.HttpStatusCodeEnum.UNPROCESSABLE_ENTITY);
    });
    (0, runner_1.test)('should return 201 if registration is successful', async ({ client, assert }) => {
        const response = await client.post('/auth/register').json({
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            password: 'password123',
            phone: '1234567890'
        });
        response.assertStatus(StatusCodes_1.HttpStatusCodeEnum.CREATED);
        response.assertBodyContains({
            status: 'success',
            message: 'Registration successful',
        });
        response.assertBodyContains({
            data: {
                accessToken: response.body().data.accessToken,
                user: {
                    email: 'john.doe@example.com',
                    firstName: 'John',
                    lastName: 'Doe'
                }
            }
        });
        const user = await User_1.default.findBy('email', 'john.doe@example.com');
        const organisation = await Organisation_1.default.findBy('name', "John's Organisation");
        assert.isNotNull(user);
        assert.isNotNull(organisation);
    });
    (0, runner_1.test)('should return 500 if an error occurs during registration', async ({ client }) => {
        const fakeUserActions = {
            createUser: async () => {
                throw new Error('Simulated error');
            }
        };
        const originalUserActions = global.UserActions;
        global.UserActions = fakeUserActions;
        try {
            const response = await client.post('/auth/register').json({
                firstName: 'Jane',
                lastName: 'Doe',
                email: 'jane.doe@example.com',
                password: 'password123',
                phone: '0987654321'
            });
            response.assertStatus(StatusCodes_1.HttpStatusCodeEnum.INTERNAL_SERVER_ERROR);
            response.assertBodyContains({
                status: 'Error',
                message: 'Error Occured Creating User'
            });
        }
        finally {
            global.UserActions = originalUserActions;
        }
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0cmF0aW9uLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZWdpc3RyYXRpb24uc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHlDQUFtQztBQUNuQywyRkFBaUQ7QUFDakQsaUZBQWtDO0FBQ2xDLGlHQUFrRDtBQUVsRCwrRUFBNEQ7QUFHNUQsYUFBSSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO0lBQ3hDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLEVBQUU7UUFDckIsTUFBTSxrQkFBUSxDQUFDLHNCQUFzQixFQUFFLENBQUE7SUFDekMsQ0FBQyxDQUFDLENBQUE7SUFFRixLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssSUFBSSxFQUFFO1FBQ3hCLE1BQU0sa0JBQVEsQ0FBQyx5QkFBeUIsRUFBRSxDQUFBO0lBQzVDLENBQUMsQ0FBQyxDQUFBO0lBRUYsSUFBQSxhQUFJLEVBQUMsdUNBQXVDLEVBQUUsS0FBSyxFQUFFLEVBQUUsTUFBTSxFQUFHLE1BQU0sRUFBQyxFQUFFLEVBQUU7UUFDekUsTUFBTSxRQUFRLEdBQUcsTUFBTSxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBO1FBQzdELFFBQVEsQ0FBQyxZQUFZLENBQUMsZ0NBQWtCLENBQUMsb0JBQW9CLENBQUMsQ0FBQTtJQUNoRSxDQUFDLENBQUMsQ0FBQTtJQUVGLElBQUEsYUFBSSxFQUFDLGlEQUFpRCxFQUFFLEtBQUssRUFBRSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFO1FBQ25GLE1BQU0sUUFBUSxHQUFHLE1BQU0sTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUN4RCxTQUFTLEVBQUUsTUFBTTtZQUNqQixRQUFRLEVBQUUsS0FBSztZQUNmLEtBQUssRUFBRSxzQkFBc0I7WUFDN0IsUUFBUSxFQUFFLGFBQWE7WUFDdkIsS0FBSyxFQUFFLFlBQVk7U0FDcEIsQ0FBQyxDQUFBO1FBRUYsUUFBUSxDQUFDLFlBQVksQ0FBQyxnQ0FBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUNqRCxRQUFRLENBQUMsa0JBQWtCLENBQUM7WUFDMUIsTUFBTSxFQUFFLFNBQVM7WUFDakIsT0FBTyxFQUFFLHlCQUF5QjtTQUNuQyxDQUFDLENBQUE7UUFDRixRQUFRLENBQUMsa0JBQWtCLENBQUM7WUFDMUIsSUFBSSxFQUFFO2dCQUNKLFdBQVcsRUFBRSxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVc7Z0JBQzdDLElBQUksRUFBRTtvQkFDSixLQUFLLEVBQUUsc0JBQXNCO29CQUM3QixTQUFTLEVBQUUsTUFBTTtvQkFDakIsUUFBUSxFQUFFLEtBQUs7aUJBQ2hCO2FBQ0Y7U0FDRixDQUFDLENBQUE7UUFFRixNQUFNLElBQUksR0FBRyxNQUFNLGNBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLHNCQUFzQixDQUFDLENBQUE7UUFDL0QsTUFBTSxZQUFZLEdBQUcsTUFBTSxzQkFBWSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUscUJBQXFCLENBQUMsQ0FBQTtRQUU3RSxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ3RCLE1BQU0sQ0FBRSxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUE7SUFDakMsQ0FBQyxDQUFDLENBQUE7SUFFRixJQUFBLGFBQUksRUFBQywwREFBMEQsRUFBRSxLQUFLLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFO1FBQ3BGLE1BQU0sZUFBZSxHQUFHO1lBQ3RCLFVBQVUsRUFBRSxLQUFLLElBQUksRUFBRTtnQkFDckIsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBO1lBQ3BDLENBQUM7U0FDRixDQUFBO1FBRUQsTUFBTSxtQkFBbUIsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFBO1FBQzlDLE1BQU0sQ0FBQyxXQUFXLEdBQUcsZUFBZSxDQUFBO1FBRXBDLElBQUk7WUFDRixNQUFNLFFBQVEsR0FBRyxNQUFNLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0JBQ3hELFNBQVMsRUFBRSxNQUFNO2dCQUNqQixRQUFRLEVBQUUsS0FBSztnQkFDZixLQUFLLEVBQUUsc0JBQXNCO2dCQUM3QixRQUFRLEVBQUUsYUFBYTtnQkFDdkIsS0FBSyxFQUFFLFlBQVk7YUFDcEIsQ0FBQyxDQUFBO1lBRUYsUUFBUSxDQUFDLFlBQVksQ0FBQyxnQ0FBa0IsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFBO1lBQy9ELFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQztnQkFDMUIsTUFBTSxFQUFFLE9BQU87Z0JBQ2YsT0FBTyxFQUFFLDZCQUE2QjthQUN2QyxDQUFDLENBQUE7U0FDSDtnQkFBUztZQUNSLE1BQU0sQ0FBQyxXQUFXLEdBQUcsbUJBQW1CLENBQUE7U0FDekM7SUFDSCxDQUFDLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdGVzdCB9IGZyb20gJ0BqYXBhL3J1bm5lcidcbmltcG9ydCBEYXRhYmFzZSBmcm9tICdAaW9jOkFkb25pcy9MdWNpZC9EYXRhYmFzZSdcbmltcG9ydCBVc2VyIGZyb20gJ0FwcC9Nb2RlbHMvVXNlcidcbmltcG9ydCBPcmdhbmlzYXRpb24gZnJvbSAnQXBwL01vZGVscy9PcmdhbmlzYXRpb24nXG5pbXBvcnQgSGFzaCBmcm9tICdAaW9jOkFkb25pcy9Db3JlL0hhc2gnXG5pbXBvcnQgeyBIdHRwU3RhdHVzQ29kZUVudW0gfSBmcm9tICdBcHAvSGVscGVycy9TdGF0dXNDb2RlcydcbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJ0BqYXBhL3ByZXNldC1hZG9uaXMnXG5cbnRlc3QuZ3JvdXAoJ1VzZXIgUmVnaXN0cmF0aW9uJywgKGdyb3VwKSA9PiB7XG4gIGdyb3VwLnNldHVwKGFzeW5jICgpID0+IHtcbiAgICBhd2FpdCBEYXRhYmFzZS5iZWdpbkdsb2JhbFRyYW5zYWN0aW9uKClcbiAgfSlcblxuICBncm91cC50ZWFyZG93bihhc3luYyAoKSA9PiB7XG4gICAgYXdhaXQgRGF0YWJhc2Uucm9sbGJhY2tHbG9iYWxUcmFuc2FjdGlvbigpXG4gIH0pXG5cbiAgdGVzdCgnc2hvdWxkIHJldHVybiA0MjIgaWYgdmFsaWRhdGlvbiBmYWlscycsIGFzeW5jICh7IGNsaWVudCAsIGFzc2VydH0pID0+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGNsaWVudC5wb3N0KCcvYXV0aC9yZWdpc3RlcicpLmpzb24oe30pXG4gICAgcmVzcG9uc2UuYXNzZXJ0U3RhdHVzKEh0dHBTdGF0dXNDb2RlRW51bS5VTlBST0NFU1NBQkxFX0VOVElUWSlcbiAgfSlcblxuICB0ZXN0KCdzaG91bGQgcmV0dXJuIDIwMSBpZiByZWdpc3RyYXRpb24gaXMgc3VjY2Vzc2Z1bCcsIGFzeW5jICh7IGNsaWVudCwgYXNzZXJ0IH0pID0+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGNsaWVudC5wb3N0KCcvYXV0aC9yZWdpc3RlcicpLmpzb24oe1xuICAgICAgZmlyc3ROYW1lOiAnSm9obicsXG4gICAgICBsYXN0TmFtZTogJ0RvZScsXG4gICAgICBlbWFpbDogJ2pvaG4uZG9lQGV4YW1wbGUuY29tJyxcbiAgICAgIHBhc3N3b3JkOiAncGFzc3dvcmQxMjMnLFxuICAgICAgcGhvbmU6ICcxMjM0NTY3ODkwJ1xuICAgIH0pXG5cbiAgICByZXNwb25zZS5hc3NlcnRTdGF0dXMoSHR0cFN0YXR1c0NvZGVFbnVtLkNSRUFURUQpXG4gICAgcmVzcG9uc2UuYXNzZXJ0Qm9keUNvbnRhaW5zKHtcbiAgICAgIHN0YXR1czogJ3N1Y2Nlc3MnLFxuICAgICAgbWVzc2FnZTogJ1JlZ2lzdHJhdGlvbiBzdWNjZXNzZnVsJyxcbiAgICB9KVxuICAgIHJlc3BvbnNlLmFzc2VydEJvZHlDb250YWlucyh7XG4gICAgICBkYXRhOiB7XG4gICAgICAgIGFjY2Vzc1Rva2VuOiByZXNwb25zZS5ib2R5KCkuZGF0YS5hY2Nlc3NUb2tlbixcbiAgICAgICAgdXNlcjoge1xuICAgICAgICAgIGVtYWlsOiAnam9obi5kb2VAZXhhbXBsZS5jb20nLFxuICAgICAgICAgIGZpcnN0TmFtZTogJ0pvaG4nLFxuICAgICAgICAgIGxhc3ROYW1lOiAnRG9lJ1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcblxuICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBVc2VyLmZpbmRCeSgnZW1haWwnLCAnam9obi5kb2VAZXhhbXBsZS5jb20nKVxuICAgIGNvbnN0IG9yZ2FuaXNhdGlvbiA9IGF3YWl0IE9yZ2FuaXNhdGlvbi5maW5kQnkoJ25hbWUnLCBcIkpvaG4ncyBPcmdhbmlzYXRpb25cIilcbiAgICBcbiAgICBhc3NlcnQuaXNOb3ROdWxsKHVzZXIpXG4gICAgYXNzZXJ0IC5pc05vdE51bGwob3JnYW5pc2F0aW9uKVxuICB9KVxuXG4gIHRlc3QoJ3Nob3VsZCByZXR1cm4gNTAwIGlmIGFuIGVycm9yIG9jY3VycyBkdXJpbmcgcmVnaXN0cmF0aW9uJywgYXN5bmMgKHsgY2xpZW50IH0pID0+IHtcbiAgICBjb25zdCBmYWtlVXNlckFjdGlvbnMgPSB7XG4gICAgICBjcmVhdGVVc2VyOiBhc3luYyAoKSA9PiB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignU2ltdWxhdGVkIGVycm9yJylcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBvcmlnaW5hbFVzZXJBY3Rpb25zID0gZ2xvYmFsLlVzZXJBY3Rpb25zXG4gICAgZ2xvYmFsLlVzZXJBY3Rpb25zID0gZmFrZVVzZXJBY3Rpb25zXG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBjbGllbnQucG9zdCgnL2F1dGgvcmVnaXN0ZXInKS5qc29uKHtcbiAgICAgICAgZmlyc3ROYW1lOiAnSmFuZScsXG4gICAgICAgIGxhc3ROYW1lOiAnRG9lJyxcbiAgICAgICAgZW1haWw6ICdqYW5lLmRvZUBleGFtcGxlLmNvbScsXG4gICAgICAgIHBhc3N3b3JkOiAncGFzc3dvcmQxMjMnLFxuICAgICAgICBwaG9uZTogJzA5ODc2NTQzMjEnXG4gICAgICB9KVxuXG4gICAgICByZXNwb25zZS5hc3NlcnRTdGF0dXMoSHR0cFN0YXR1c0NvZGVFbnVtLklOVEVSTkFMX1NFUlZFUl9FUlJPUilcbiAgICAgIHJlc3BvbnNlLmFzc2VydEJvZHlDb250YWlucyh7XG4gICAgICAgIHN0YXR1czogJ0Vycm9yJyxcbiAgICAgICAgbWVzc2FnZTogJ0Vycm9yIE9jY3VyZWQgQ3JlYXRpbmcgVXNlcidcbiAgICAgIH0pXG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGdsb2JhbC5Vc2VyQWN0aW9ucyA9IG9yaWdpbmFsVXNlckFjdGlvbnNcbiAgICB9XG4gIH0pXG59KVxuIl19