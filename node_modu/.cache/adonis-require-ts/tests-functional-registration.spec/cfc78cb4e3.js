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
    (0, runner_1.test)('should return 422 if validation fails', async ({ client }) => {
        const response = await client.post('/auth/register').json({});
        response.assertStatus(StatusCodes_1.HttpStatusCodeEnum.UNPROCESSABLE_ENTITY);
    });
    (0, runner_1.test)('should return 201 if registration is successful and default organisation is created', async ({ client, assert }) => {
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0cmF0aW9uLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZWdpc3RyYXRpb24uc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHlDQUFtQztBQUNuQywyRkFBaUQ7QUFDakQsaUZBQWtDO0FBQ2xDLGlHQUFrRDtBQUVsRCwrRUFBNEQ7QUFHNUQsYUFBSSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO0lBQ3hDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLEVBQUU7UUFDckIsTUFBTSxrQkFBUSxDQUFDLHNCQUFzQixFQUFFLENBQUE7SUFDekMsQ0FBQyxDQUFDLENBQUE7SUFFRixLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssSUFBSSxFQUFFO1FBQ3hCLE1BQU0sa0JBQVEsQ0FBQyx5QkFBeUIsRUFBRSxDQUFBO0lBQzVDLENBQUMsQ0FBQyxDQUFBO0lBRUYsSUFBQSxhQUFJLEVBQUMsdUNBQXVDLEVBQUUsS0FBSyxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRTtRQUNqRSxNQUFNLFFBQVEsR0FBRyxNQUFNLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7UUFDN0QsUUFBUSxDQUFDLFlBQVksQ0FBQyxnQ0FBa0IsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFBO0lBQ2hFLENBQUMsQ0FBQyxDQUFBO0lBRUYsSUFBQSxhQUFJLEVBQUMscUZBQXFGLEVBQUUsS0FBSyxFQUFFLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUU7UUFDdkgsTUFBTSxRQUFRLEdBQUcsTUFBTSxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ3hELFNBQVMsRUFBRSxNQUFNO1lBQ2pCLFFBQVEsRUFBRSxLQUFLO1lBQ2YsS0FBSyxFQUFFLHNCQUFzQjtZQUM3QixRQUFRLEVBQUUsYUFBYTtZQUN2QixLQUFLLEVBQUUsWUFBWTtTQUNwQixDQUFDLENBQUE7UUFFRixRQUFRLENBQUMsWUFBWSxDQUFDLGdDQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQ2pELFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQztZQUMxQixNQUFNLEVBQUUsU0FBUztZQUNqQixPQUFPLEVBQUUseUJBQXlCO1NBQ25DLENBQUMsQ0FBQTtRQUNGLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQztZQUMxQixJQUFJLEVBQUU7Z0JBQ0osV0FBVyxFQUFFLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVztnQkFDN0MsSUFBSSxFQUFFO29CQUNKLEtBQUssRUFBRSxzQkFBc0I7b0JBQzdCLFNBQVMsRUFBRSxNQUFNO29CQUNqQixRQUFRLEVBQUUsS0FBSztpQkFDaEI7YUFDRjtTQUNGLENBQUMsQ0FBQTtRQUVGLE1BQU0sSUFBSSxHQUFHLE1BQU0sY0FBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsc0JBQXNCLENBQUMsQ0FBQTtRQUMvRCxNQUFNLFlBQVksR0FBRyxNQUFNLHNCQUFZLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxxQkFBcUIsQ0FBQyxDQUFBO1FBRTdFLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDdEIsTUFBTSxDQUFFLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQTtJQUNqQyxDQUFDLENBQUMsQ0FBQTtBQUVKLENBQUMsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdGVzdCB9IGZyb20gJ0BqYXBhL3J1bm5lcidcbmltcG9ydCBEYXRhYmFzZSBmcm9tICdAaW9jOkFkb25pcy9MdWNpZC9EYXRhYmFzZSdcbmltcG9ydCBVc2VyIGZyb20gJ0FwcC9Nb2RlbHMvVXNlcidcbmltcG9ydCBPcmdhbmlzYXRpb24gZnJvbSAnQXBwL01vZGVscy9PcmdhbmlzYXRpb24nXG5pbXBvcnQgSGFzaCBmcm9tICdAaW9jOkFkb25pcy9Db3JlL0hhc2gnXG5pbXBvcnQgeyBIdHRwU3RhdHVzQ29kZUVudW0gfSBmcm9tICdBcHAvSGVscGVycy9TdGF0dXNDb2RlcydcbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJ0BqYXBhL3ByZXNldC1hZG9uaXMnXG5cbnRlc3QuZ3JvdXAoJ1VzZXIgUmVnaXN0cmF0aW9uJywgKGdyb3VwKSA9PiB7XG4gIGdyb3VwLnNldHVwKGFzeW5jICgpID0+IHtcbiAgICBhd2FpdCBEYXRhYmFzZS5iZWdpbkdsb2JhbFRyYW5zYWN0aW9uKClcbiAgfSlcblxuICBncm91cC50ZWFyZG93bihhc3luYyAoKSA9PiB7XG4gICAgYXdhaXQgRGF0YWJhc2Uucm9sbGJhY2tHbG9iYWxUcmFuc2FjdGlvbigpXG4gIH0pXG5cbiAgdGVzdCgnc2hvdWxkIHJldHVybiA0MjIgaWYgdmFsaWRhdGlvbiBmYWlscycsIGFzeW5jICh7IGNsaWVudCB9KSA9PiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBjbGllbnQucG9zdCgnL2F1dGgvcmVnaXN0ZXInKS5qc29uKHt9KVxuICAgIHJlc3BvbnNlLmFzc2VydFN0YXR1cyhIdHRwU3RhdHVzQ29kZUVudW0uVU5QUk9DRVNTQUJMRV9FTlRJVFkpXG4gIH0pXG5cbiAgdGVzdCgnc2hvdWxkIHJldHVybiAyMDEgaWYgcmVnaXN0cmF0aW9uIGlzIHN1Y2Nlc3NmdWwgYW5kIGRlZmF1bHQgb3JnYW5pc2F0aW9uIGlzIGNyZWF0ZWQnLCBhc3luYyAoeyBjbGllbnQsIGFzc2VydCB9KSA9PiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBjbGllbnQucG9zdCgnL2F1dGgvcmVnaXN0ZXInKS5qc29uKHtcbiAgICAgIGZpcnN0TmFtZTogJ0pvaG4nLFxuICAgICAgbGFzdE5hbWU6ICdEb2UnLFxuICAgICAgZW1haWw6ICdqb2huLmRvZUBleGFtcGxlLmNvbScsXG4gICAgICBwYXNzd29yZDogJ3Bhc3N3b3JkMTIzJyxcbiAgICAgIHBob25lOiAnMTIzNDU2Nzg5MCdcbiAgICB9KVxuXG4gICAgcmVzcG9uc2UuYXNzZXJ0U3RhdHVzKEh0dHBTdGF0dXNDb2RlRW51bS5DUkVBVEVEKVxuICAgIHJlc3BvbnNlLmFzc2VydEJvZHlDb250YWlucyh7XG4gICAgICBzdGF0dXM6ICdzdWNjZXNzJyxcbiAgICAgIG1lc3NhZ2U6ICdSZWdpc3RyYXRpb24gc3VjY2Vzc2Z1bCcsXG4gICAgfSlcbiAgICByZXNwb25zZS5hc3NlcnRCb2R5Q29udGFpbnMoe1xuICAgICAgZGF0YToge1xuICAgICAgICBhY2Nlc3NUb2tlbjogcmVzcG9uc2UuYm9keSgpLmRhdGEuYWNjZXNzVG9rZW4sXG4gICAgICAgIHVzZXI6IHtcbiAgICAgICAgICBlbWFpbDogJ2pvaG4uZG9lQGV4YW1wbGUuY29tJyxcbiAgICAgICAgICBmaXJzdE5hbWU6ICdKb2huJyxcbiAgICAgICAgICBsYXN0TmFtZTogJ0RvZSdcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBjb25zdCB1c2VyID0gYXdhaXQgVXNlci5maW5kQnkoJ2VtYWlsJywgJ2pvaG4uZG9lQGV4YW1wbGUuY29tJylcbiAgICBjb25zdCBvcmdhbmlzYXRpb24gPSBhd2FpdCBPcmdhbmlzYXRpb24uZmluZEJ5KCduYW1lJywgXCJKb2huJ3MgT3JnYW5pc2F0aW9uXCIpXG4gICAgXG4gICAgYXNzZXJ0LmlzTm90TnVsbCh1c2VyKVxuICAgIGFzc2VydCAuaXNOb3ROdWxsKG9yZ2FuaXNhdGlvbilcbiAgfSlcblxufSlcbiJdfQ==