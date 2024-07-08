"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const runner_1 = require("@japa/runner");
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
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
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0cmF0aW9uLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZWdpc3RyYXRpb24uc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHlDQUFtQztBQUNuQywyRkFBaUQ7QUFHakQsK0VBQTREO0FBRTVELGFBQUksQ0FBQyxLQUFLLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtJQUN4QyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxFQUFFO1FBQ3JCLE1BQU0sa0JBQVEsQ0FBQyxzQkFBc0IsRUFBRSxDQUFBO0lBQ3pDLENBQUMsQ0FBQyxDQUFBO0lBRUYsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLElBQUksRUFBRTtRQUN4QixNQUFNLGtCQUFRLENBQUMseUJBQXlCLEVBQUUsQ0FBQTtJQUM1QyxDQUFDLENBQUMsQ0FBQTtJQUVGLElBQUEsYUFBSSxFQUFDLHVDQUF1QyxFQUFFLEtBQUssRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUU7UUFDakUsTUFBTSxRQUFRLEdBQUcsTUFBTSxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBO1FBQzdELFFBQVEsQ0FBQyxZQUFZLENBQUMsZ0NBQWtCLENBQUMsb0JBQW9CLENBQUMsQ0FBQTtJQUNoRSxDQUFDLENBQUMsQ0FBQTtJQUNGLElBQUEsYUFBSSxFQUFDLHFGQUFxRixFQUFFLEtBQUssRUFBRSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFO1FBQ3ZILE1BQU0sUUFBUSxHQUFHLE1BQU0sTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUN4RCxTQUFTLEVBQUUsTUFBTTtZQUNqQixRQUFRLEVBQUUsS0FBSztZQUNmLEtBQUssRUFBRSxzQkFBc0I7WUFDN0IsUUFBUSxFQUFFLGFBQWE7WUFDdkIsS0FBSyxFQUFFLFlBQVk7U0FDcEIsQ0FBQyxDQUFBO1FBRUYsUUFBUSxDQUFDLFlBQVksQ0FBQyxnQ0FBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQWdCbkQsQ0FBQyxDQUFDLENBQUE7QUFFSixDQUFDLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHRlc3QgfSBmcm9tICdAamFwYS9ydW5uZXInXG5pbXBvcnQgRGF0YWJhc2UgZnJvbSAnQGlvYzpBZG9uaXMvTHVjaWQvRGF0YWJhc2UnXG5pbXBvcnQgVXNlciBmcm9tICdBcHAvTW9kZWxzL1VzZXInXG5pbXBvcnQgT3JnYW5pc2F0aW9uIGZyb20gJ0FwcC9Nb2RlbHMvT3JnYW5pc2F0aW9uJ1xuaW1wb3J0IHsgSHR0cFN0YXR1c0NvZGVFbnVtIH0gZnJvbSAnQXBwL0hlbHBlcnMvU3RhdHVzQ29kZXMnXG5cbnRlc3QuZ3JvdXAoJ1VzZXIgUmVnaXN0cmF0aW9uJywgKGdyb3VwKSA9PiB7XG4gIGdyb3VwLnNldHVwKGFzeW5jICgpID0+IHtcbiAgICBhd2FpdCBEYXRhYmFzZS5iZWdpbkdsb2JhbFRyYW5zYWN0aW9uKClcbiAgfSlcblxuICBncm91cC50ZWFyZG93bihhc3luYyAoKSA9PiB7XG4gICAgYXdhaXQgRGF0YWJhc2Uucm9sbGJhY2tHbG9iYWxUcmFuc2FjdGlvbigpXG4gIH0pXG5cbiAgdGVzdCgnc2hvdWxkIHJldHVybiA0MjIgaWYgdmFsaWRhdGlvbiBmYWlscycsIGFzeW5jICh7IGNsaWVudCB9KSA9PiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBjbGllbnQucG9zdCgnL2F1dGgvcmVnaXN0ZXInKS5qc29uKHt9KVxuICAgIHJlc3BvbnNlLmFzc2VydFN0YXR1cyhIdHRwU3RhdHVzQ29kZUVudW0uVU5QUk9DRVNTQUJMRV9FTlRJVFkpXG4gIH0pICBcbiAgdGVzdCgnc2hvdWxkIHJldHVybiAyMDEgaWYgcmVnaXN0cmF0aW9uIGlzIHN1Y2Nlc3NmdWwgYW5kIGRlZmF1bHQgb3JnYW5pc2F0aW9uIGlzIGNyZWF0ZWQnLCBhc3luYyAoeyBjbGllbnQsIGFzc2VydCB9KSA9PiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBjbGllbnQucG9zdCgnL2F1dGgvcmVnaXN0ZXInKS5qc29uKHtcbiAgICAgIGZpcnN0TmFtZTogJ0pvaG4nLFxuICAgICAgbGFzdE5hbWU6ICdEb2UnLFxuICAgICAgZW1haWw6ICdqb2huLmRvZUBleGFtcGxlLmNvbScsXG4gICAgICBwYXNzd29yZDogJ3Bhc3N3b3JkMTIzJyxcbiAgICAgIHBob25lOiAnMTIzNDU2Nzg5MCdcbiAgICB9KVxuXG4gICAgcmVzcG9uc2UuYXNzZXJ0U3RhdHVzKEh0dHBTdGF0dXNDb2RlRW51bS5DUkVBVEVEKVxuICAgIC8vIHJlc3BvbnNlLmFzc2VydEJvZHlDb250YWlucyh7XG4gICAgLy8gICBzdGF0dXM6ICdzdWNjZXNzJyxcbiAgICAvLyAgIG1lc3NhZ2U6ICdSZWdpc3RyYXRpb24gc3VjY2Vzc2Z1bCcsXG4gICAgLy8gfSlcbiAgICAvLyByZXNwb25zZS5hc3NlcnRCb2R5Q29udGFpbnMoe1xuICAgIC8vICAgZGF0YToge1xuICAgIC8vICAgICBhY2Nlc3NUb2tlbjogcmVzcG9uc2UuYm9keSgpLmRhdGEuYWNjZXNzVG9rZW4sXG4gICAgLy8gICB9XG4gICAgLy8gfSlcblxuICAgIC8vIGNvbnN0IHVzZXIgPSBhd2FpdCBVc2VyLmZpbmRCeSgnZW1haWwnLCAnam9obi5kb2VAZXhhbXBsZS5jb20nKVxuICAgIC8vIGNvbnN0IG9yZ2FuaXNhdGlvbiA9IGF3YWl0IE9yZ2FuaXNhdGlvbi5maW5kQnkoJ25hbWUnLCBcIkpvaG4ncyBPcmdhbmlzYXRpb25cIilcbiAgICBcbiAgICAvLyBhc3NlcnQuaXNOb3ROdWxsKHVzZXIpXG4gICAgLy8gYXNzZXJ0IC5pc05vdE51bGwob3JnYW5pc2F0aW9uKVxuICB9KVxuXG59KVxuIl19