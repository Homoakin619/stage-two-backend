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
        const response = await client.post('/register').json({});
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
            const response = await client.post('/register').json({
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0cmF0aW9uLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZWdpc3RyYXRpb24uc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHlDQUFtQztBQUNuQywyRkFBaUQ7QUFDakQsaUZBQWtDO0FBQ2xDLGlHQUFrRDtBQUVsRCwrRUFBNEQ7QUFHNUQsYUFBSSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO0lBQ3hDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLEVBQUU7UUFDckIsTUFBTSxrQkFBUSxDQUFDLHNCQUFzQixFQUFFLENBQUE7SUFDekMsQ0FBQyxDQUFDLENBQUE7SUFFRixLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssSUFBSSxFQUFFO1FBQ3hCLE1BQU0sa0JBQVEsQ0FBQyx5QkFBeUIsRUFBRSxDQUFBO0lBQzVDLENBQUMsQ0FBQyxDQUFBO0lBRUYsSUFBQSxhQUFJLEVBQUMsdUNBQXVDLEVBQUUsS0FBSyxFQUFFLEVBQUUsTUFBTSxFQUFHLE1BQU0sRUFBQyxFQUFFLEVBQUU7UUFDekUsTUFBTSxRQUFRLEdBQUcsTUFBTSxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQTtRQUN4RCxRQUFRLENBQUMsWUFBWSxDQUFDLGdDQUFrQixDQUFDLG9CQUFvQixDQUFDLENBQUE7SUFDaEUsQ0FBQyxDQUFDLENBQUE7SUFFRixJQUFBLGFBQUksRUFBQyxpREFBaUQsRUFBRSxLQUFLLEVBQUUsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRTtRQUNuRixNQUFNLFFBQVEsR0FBRyxNQUFNLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDeEQsU0FBUyxFQUFFLE1BQU07WUFDakIsUUFBUSxFQUFFLEtBQUs7WUFDZixLQUFLLEVBQUUsc0JBQXNCO1lBQzdCLFFBQVEsRUFBRSxhQUFhO1lBQ3ZCLEtBQUssRUFBRSxZQUFZO1NBQ3BCLENBQUMsQ0FBQTtRQUVGLFFBQVEsQ0FBQyxZQUFZLENBQUMsZ0NBQWtCLENBQUMsT0FBTyxDQUFDLENBQUE7UUFDakQsUUFBUSxDQUFDLGtCQUFrQixDQUFDO1lBQzFCLE1BQU0sRUFBRSxTQUFTO1lBQ2pCLE9BQU8sRUFBRSx5QkFBeUI7U0FDbkMsQ0FBQyxDQUFBO1FBQ0YsUUFBUSxDQUFDLGtCQUFrQixDQUFDO1lBQzFCLElBQUksRUFBRTtnQkFDSixXQUFXLEVBQUUsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXO2dCQUM3QyxJQUFJLEVBQUU7b0JBQ0osS0FBSyxFQUFFLHNCQUFzQjtvQkFDN0IsU0FBUyxFQUFFLE1BQU07b0JBQ2pCLFFBQVEsRUFBRSxLQUFLO2lCQUNoQjthQUNGO1NBQ0YsQ0FBQyxDQUFBO1FBRUYsTUFBTSxJQUFJLEdBQUcsTUFBTSxjQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxzQkFBc0IsQ0FBQyxDQUFBO1FBQy9ELE1BQU0sWUFBWSxHQUFHLE1BQU0sc0JBQVksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLHFCQUFxQixDQUFDLENBQUE7UUFFN0UsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUN0QixNQUFNLENBQUUsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFBO0lBQ2pDLENBQUMsQ0FBQyxDQUFBO0lBRUYsSUFBQSxhQUFJLEVBQUMsMERBQTBELEVBQUUsS0FBSyxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRTtRQUNwRixNQUFNLGVBQWUsR0FBRztZQUN0QixVQUFVLEVBQUUsS0FBSyxJQUFJLEVBQUU7Z0JBQ3JCLE1BQU0sSUFBSSxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtZQUNwQyxDQUFDO1NBQ0YsQ0FBQTtRQUVELE1BQU0sbUJBQW1CLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQTtRQUM5QyxNQUFNLENBQUMsV0FBVyxHQUFHLGVBQWUsQ0FBQTtRQUVwQyxJQUFJO1lBQ0YsTUFBTSxRQUFRLEdBQUcsTUFBTSxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDbkQsU0FBUyxFQUFFLE1BQU07Z0JBQ2pCLFFBQVEsRUFBRSxLQUFLO2dCQUNmLEtBQUssRUFBRSxzQkFBc0I7Z0JBQzdCLFFBQVEsRUFBRSxhQUFhO2dCQUN2QixLQUFLLEVBQUUsWUFBWTthQUNwQixDQUFDLENBQUE7WUFFRixRQUFRLENBQUMsWUFBWSxDQUFDLGdDQUFrQixDQUFDLHFCQUFxQixDQUFDLENBQUE7WUFDL0QsUUFBUSxDQUFDLGtCQUFrQixDQUFDO2dCQUMxQixNQUFNLEVBQUUsT0FBTztnQkFDZixPQUFPLEVBQUUsNkJBQTZCO2FBQ3ZDLENBQUMsQ0FBQTtTQUNIO2dCQUFTO1lBQ1IsTUFBTSxDQUFDLFdBQVcsR0FBRyxtQkFBbUIsQ0FBQTtTQUN6QztJQUNILENBQUMsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB0ZXN0IH0gZnJvbSAnQGphcGEvcnVubmVyJ1xuaW1wb3J0IERhdGFiYXNlIGZyb20gJ0Bpb2M6QWRvbmlzL0x1Y2lkL0RhdGFiYXNlJ1xuaW1wb3J0IFVzZXIgZnJvbSAnQXBwL01vZGVscy9Vc2VyJ1xuaW1wb3J0IE9yZ2FuaXNhdGlvbiBmcm9tICdBcHAvTW9kZWxzL09yZ2FuaXNhdGlvbidcbmltcG9ydCBIYXNoIGZyb20gJ0Bpb2M6QWRvbmlzL0NvcmUvSGFzaCdcbmltcG9ydCB7IEh0dHBTdGF0dXNDb2RlRW51bSB9IGZyb20gJ0FwcC9IZWxwZXJzL1N0YXR1c0NvZGVzJ1xuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnQGphcGEvcHJlc2V0LWFkb25pcydcblxudGVzdC5ncm91cCgnVXNlciBSZWdpc3RyYXRpb24nLCAoZ3JvdXApID0+IHtcbiAgZ3JvdXAuc2V0dXAoYXN5bmMgKCkgPT4ge1xuICAgIGF3YWl0IERhdGFiYXNlLmJlZ2luR2xvYmFsVHJhbnNhY3Rpb24oKVxuICB9KVxuXG4gIGdyb3VwLnRlYXJkb3duKGFzeW5jICgpID0+IHtcbiAgICBhd2FpdCBEYXRhYmFzZS5yb2xsYmFja0dsb2JhbFRyYW5zYWN0aW9uKClcbiAgfSlcblxuICB0ZXN0KCdzaG91bGQgcmV0dXJuIDQyMiBpZiB2YWxpZGF0aW9uIGZhaWxzJywgYXN5bmMgKHsgY2xpZW50ICwgYXNzZXJ0fSkgPT4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgY2xpZW50LnBvc3QoJy9yZWdpc3RlcicpLmpzb24oe30pXG4gICAgcmVzcG9uc2UuYXNzZXJ0U3RhdHVzKEh0dHBTdGF0dXNDb2RlRW51bS5VTlBST0NFU1NBQkxFX0VOVElUWSlcbiAgfSlcblxuICB0ZXN0KCdzaG91bGQgcmV0dXJuIDIwMSBpZiByZWdpc3RyYXRpb24gaXMgc3VjY2Vzc2Z1bCcsIGFzeW5jICh7IGNsaWVudCwgYXNzZXJ0IH0pID0+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGNsaWVudC5wb3N0KCcvYXV0aC9yZWdpc3RlcicpLmpzb24oe1xuICAgICAgZmlyc3ROYW1lOiAnSm9obicsXG4gICAgICBsYXN0TmFtZTogJ0RvZScsXG4gICAgICBlbWFpbDogJ2pvaG4uZG9lQGV4YW1wbGUuY29tJyxcbiAgICAgIHBhc3N3b3JkOiAncGFzc3dvcmQxMjMnLFxuICAgICAgcGhvbmU6ICcxMjM0NTY3ODkwJ1xuICAgIH0pXG5cbiAgICByZXNwb25zZS5hc3NlcnRTdGF0dXMoSHR0cFN0YXR1c0NvZGVFbnVtLkNSRUFURUQpXG4gICAgcmVzcG9uc2UuYXNzZXJ0Qm9keUNvbnRhaW5zKHtcbiAgICAgIHN0YXR1czogJ3N1Y2Nlc3MnLFxuICAgICAgbWVzc2FnZTogJ1JlZ2lzdHJhdGlvbiBzdWNjZXNzZnVsJyxcbiAgICB9KVxuICAgIHJlc3BvbnNlLmFzc2VydEJvZHlDb250YWlucyh7XG4gICAgICBkYXRhOiB7XG4gICAgICAgIGFjY2Vzc1Rva2VuOiByZXNwb25zZS5ib2R5KCkuZGF0YS5hY2Nlc3NUb2tlbixcbiAgICAgICAgdXNlcjoge1xuICAgICAgICAgIGVtYWlsOiAnam9obi5kb2VAZXhhbXBsZS5jb20nLFxuICAgICAgICAgIGZpcnN0TmFtZTogJ0pvaG4nLFxuICAgICAgICAgIGxhc3ROYW1lOiAnRG9lJ1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcblxuICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBVc2VyLmZpbmRCeSgnZW1haWwnLCAnam9obi5kb2VAZXhhbXBsZS5jb20nKVxuICAgIGNvbnN0IG9yZ2FuaXNhdGlvbiA9IGF3YWl0IE9yZ2FuaXNhdGlvbi5maW5kQnkoJ25hbWUnLCBcIkpvaG4ncyBPcmdhbmlzYXRpb25cIilcbiAgICBcbiAgICBhc3NlcnQuaXNOb3ROdWxsKHVzZXIpXG4gICAgYXNzZXJ0IC5pc05vdE51bGwob3JnYW5pc2F0aW9uKVxuICB9KVxuXG4gIHRlc3QoJ3Nob3VsZCByZXR1cm4gNTAwIGlmIGFuIGVycm9yIG9jY3VycyBkdXJpbmcgcmVnaXN0cmF0aW9uJywgYXN5bmMgKHsgY2xpZW50IH0pID0+IHtcbiAgICBjb25zdCBmYWtlVXNlckFjdGlvbnMgPSB7XG4gICAgICBjcmVhdGVVc2VyOiBhc3luYyAoKSA9PiB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignU2ltdWxhdGVkIGVycm9yJylcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBvcmlnaW5hbFVzZXJBY3Rpb25zID0gZ2xvYmFsLlVzZXJBY3Rpb25zXG4gICAgZ2xvYmFsLlVzZXJBY3Rpb25zID0gZmFrZVVzZXJBY3Rpb25zXG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBjbGllbnQucG9zdCgnL3JlZ2lzdGVyJykuanNvbih7XG4gICAgICAgIGZpcnN0TmFtZTogJ0phbmUnLFxuICAgICAgICBsYXN0TmFtZTogJ0RvZScsXG4gICAgICAgIGVtYWlsOiAnamFuZS5kb2VAZXhhbXBsZS5jb20nLFxuICAgICAgICBwYXNzd29yZDogJ3Bhc3N3b3JkMTIzJyxcbiAgICAgICAgcGhvbmU6ICcwOTg3NjU0MzIxJ1xuICAgICAgfSlcblxuICAgICAgcmVzcG9uc2UuYXNzZXJ0U3RhdHVzKEh0dHBTdGF0dXNDb2RlRW51bS5JTlRFUk5BTF9TRVJWRVJfRVJST1IpXG4gICAgICByZXNwb25zZS5hc3NlcnRCb2R5Q29udGFpbnMoe1xuICAgICAgICBzdGF0dXM6ICdFcnJvcicsXG4gICAgICAgIG1lc3NhZ2U6ICdFcnJvciBPY2N1cmVkIENyZWF0aW5nIFVzZXInXG4gICAgICB9KVxuICAgIH0gZmluYWxseSB7XG4gICAgICBnbG9iYWwuVXNlckFjdGlvbnMgPSBvcmlnaW5hbFVzZXJBY3Rpb25zXG4gICAgfVxuICB9KVxufSlcbiJdfQ==