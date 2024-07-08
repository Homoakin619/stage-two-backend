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
            }
        });
        const user = await User_1.default.findBy('email', 'john.doe@example.com');
        const organisation = await Organisation_1.default.findBy('name', "John's Organisation");
        assert.isNotNull(user);
        assert.isNotNull(organisation);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0cmF0aW9uLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZWdpc3RyYXRpb24uc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHlDQUFtQztBQUNuQywyRkFBaUQ7QUFDakQsaUZBQWtDO0FBQ2xDLGlHQUFrRDtBQUNsRCwrRUFBNEQ7QUFFNUQsYUFBSSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO0lBQ3hDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLEVBQUU7UUFDckIsTUFBTSxrQkFBUSxDQUFDLHNCQUFzQixFQUFFLENBQUE7SUFDekMsQ0FBQyxDQUFDLENBQUE7SUFFRixLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssSUFBSSxFQUFFO1FBQ3hCLE1BQU0sa0JBQVEsQ0FBQyx5QkFBeUIsRUFBRSxDQUFBO0lBQzVDLENBQUMsQ0FBQyxDQUFBO0lBRUYsSUFBQSxhQUFJLEVBQUMsdUNBQXVDLEVBQUUsS0FBSyxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRTtRQUNqRSxNQUFNLFFBQVEsR0FBRyxNQUFNLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7UUFDN0QsUUFBUSxDQUFDLFlBQVksQ0FBQyxnQ0FBa0IsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFBO0lBQ2hFLENBQUMsQ0FBQyxDQUFBO0lBRUYsSUFBQSxhQUFJLEVBQUMscUZBQXFGLEVBQUUsS0FBSyxFQUFFLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUU7UUFDdkgsTUFBTSxRQUFRLEdBQUcsTUFBTSxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ3hELFNBQVMsRUFBRSxNQUFNO1lBQ2pCLFFBQVEsRUFBRSxLQUFLO1lBQ2YsS0FBSyxFQUFFLHNCQUFzQjtZQUM3QixRQUFRLEVBQUUsYUFBYTtZQUN2QixLQUFLLEVBQUUsWUFBWTtTQUNwQixDQUFDLENBQUE7UUFFRixRQUFRLENBQUMsWUFBWSxDQUFDLGdDQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQ2pELFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQztZQUMxQixNQUFNLEVBQUUsU0FBUztZQUNqQixPQUFPLEVBQUUseUJBQXlCO1NBQ25DLENBQUMsQ0FBQTtRQUNGLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQztZQUMxQixJQUFJLEVBQUU7Z0JBQ0osV0FBVyxFQUFFLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVzthQUM5QztTQUNGLENBQUMsQ0FBQTtRQUVGLE1BQU0sSUFBSSxHQUFHLE1BQU0sY0FBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsc0JBQXNCLENBQUMsQ0FBQTtRQUMvRCxNQUFNLFlBQVksR0FBRyxNQUFNLHNCQUFZLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxxQkFBcUIsQ0FBQyxDQUFBO1FBRTdFLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDdEIsTUFBTSxDQUFFLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQTtJQUNqQyxDQUFDLENBQUMsQ0FBQTtBQUVKLENBQUMsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdGVzdCB9IGZyb20gJ0BqYXBhL3J1bm5lcidcbmltcG9ydCBEYXRhYmFzZSBmcm9tICdAaW9jOkFkb25pcy9MdWNpZC9EYXRhYmFzZSdcbmltcG9ydCBVc2VyIGZyb20gJ0FwcC9Nb2RlbHMvVXNlcidcbmltcG9ydCBPcmdhbmlzYXRpb24gZnJvbSAnQXBwL01vZGVscy9PcmdhbmlzYXRpb24nXG5pbXBvcnQgeyBIdHRwU3RhdHVzQ29kZUVudW0gfSBmcm9tICdBcHAvSGVscGVycy9TdGF0dXNDb2RlcydcblxudGVzdC5ncm91cCgnVXNlciBSZWdpc3RyYXRpb24nLCAoZ3JvdXApID0+IHtcbiAgZ3JvdXAuc2V0dXAoYXN5bmMgKCkgPT4ge1xuICAgIGF3YWl0IERhdGFiYXNlLmJlZ2luR2xvYmFsVHJhbnNhY3Rpb24oKVxuICB9KVxuXG4gIGdyb3VwLnRlYXJkb3duKGFzeW5jICgpID0+IHtcbiAgICBhd2FpdCBEYXRhYmFzZS5yb2xsYmFja0dsb2JhbFRyYW5zYWN0aW9uKClcbiAgfSlcblxuICB0ZXN0KCdzaG91bGQgcmV0dXJuIDQyMiBpZiB2YWxpZGF0aW9uIGZhaWxzJywgYXN5bmMgKHsgY2xpZW50IH0pID0+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGNsaWVudC5wb3N0KCcvYXV0aC9yZWdpc3RlcicpLmpzb24oe30pXG4gICAgcmVzcG9uc2UuYXNzZXJ0U3RhdHVzKEh0dHBTdGF0dXNDb2RlRW51bS5VTlBST0NFU1NBQkxFX0VOVElUWSlcbiAgfSlcblxuICB0ZXN0KCdzaG91bGQgcmV0dXJuIDIwMSBpZiByZWdpc3RyYXRpb24gaXMgc3VjY2Vzc2Z1bCBhbmQgZGVmYXVsdCBvcmdhbmlzYXRpb24gaXMgY3JlYXRlZCcsIGFzeW5jICh7IGNsaWVudCwgYXNzZXJ0IH0pID0+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGNsaWVudC5wb3N0KCcvYXV0aC9yZWdpc3RlcicpLmpzb24oe1xuICAgICAgZmlyc3ROYW1lOiAnSm9obicsXG4gICAgICBsYXN0TmFtZTogJ0RvZScsXG4gICAgICBlbWFpbDogJ2pvaG4uZG9lQGV4YW1wbGUuY29tJyxcbiAgICAgIHBhc3N3b3JkOiAncGFzc3dvcmQxMjMnLFxuICAgICAgcGhvbmU6ICcxMjM0NTY3ODkwJ1xuICAgIH0pXG5cbiAgICByZXNwb25zZS5hc3NlcnRTdGF0dXMoSHR0cFN0YXR1c0NvZGVFbnVtLkNSRUFURUQpXG4gICAgcmVzcG9uc2UuYXNzZXJ0Qm9keUNvbnRhaW5zKHtcbiAgICAgIHN0YXR1czogJ3N1Y2Nlc3MnLFxuICAgICAgbWVzc2FnZTogJ1JlZ2lzdHJhdGlvbiBzdWNjZXNzZnVsJyxcbiAgICB9KVxuICAgIHJlc3BvbnNlLmFzc2VydEJvZHlDb250YWlucyh7XG4gICAgICBkYXRhOiB7XG4gICAgICAgIGFjY2Vzc1Rva2VuOiByZXNwb25zZS5ib2R5KCkuZGF0YS5hY2Nlc3NUb2tlbixcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgY29uc3QgdXNlciA9IGF3YWl0IFVzZXIuZmluZEJ5KCdlbWFpbCcsICdqb2huLmRvZUBleGFtcGxlLmNvbScpXG4gICAgY29uc3Qgb3JnYW5pc2F0aW9uID0gYXdhaXQgT3JnYW5pc2F0aW9uLmZpbmRCeSgnbmFtZScsIFwiSm9obidzIE9yZ2FuaXNhdGlvblwiKVxuICAgIFxuICAgIGFzc2VydC5pc05vdE51bGwodXNlcilcbiAgICBhc3NlcnQgLmlzTm90TnVsbChvcmdhbmlzYXRpb24pXG4gIH0pXG5cbn0pXG4iXX0=