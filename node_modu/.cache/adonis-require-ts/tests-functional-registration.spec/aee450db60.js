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
    (0, runner_1.test)('should return 201 if registration is successful and default organisation is created', async ({ client }) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0cmF0aW9uLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZWdpc3RyYXRpb24uc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHlDQUFtQztBQUNuQywyRkFBaUQ7QUFDakQsaUZBQWtDO0FBQ2xDLGlHQUFrRDtBQUNsRCwrRUFBNEQ7QUFFNUQsYUFBSSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO0lBQ3hDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLEVBQUU7UUFDckIsTUFBTSxrQkFBUSxDQUFDLHNCQUFzQixFQUFFLENBQUE7SUFDekMsQ0FBQyxDQUFDLENBQUE7SUFFRixLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssSUFBSSxFQUFFO1FBQ3hCLE1BQU0sa0JBQVEsQ0FBQyx5QkFBeUIsRUFBRSxDQUFBO0lBQzVDLENBQUMsQ0FBQyxDQUFBO0lBUUYsSUFBQSxhQUFJLEVBQUMscUZBQXFGLEVBQUUsS0FBSyxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRTtRQUMvRyxNQUFNLFFBQVEsR0FBRyxNQUFNLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDeEQsU0FBUyxFQUFFLE1BQU07WUFDakIsUUFBUSxFQUFFLEtBQUs7WUFDZixLQUFLLEVBQUUsc0JBQXNCO1lBQzdCLFFBQVEsRUFBRSxhQUFhO1lBQ3ZCLEtBQUssRUFBRSxZQUFZO1NBQ3BCLENBQUMsQ0FBQTtRQUVGLFFBQVEsQ0FBQyxZQUFZLENBQUMsZ0NBQWtCLENBQUMsT0FBTyxDQUFDLENBQUE7UUFDakQsUUFBUSxDQUFDLGtCQUFrQixDQUFDO1lBQzFCLE1BQU0sRUFBRSxTQUFTO1lBQ2pCLE9BQU8sRUFBRSx5QkFBeUI7U0FDbkMsQ0FBQyxDQUFBO1FBQ0YsUUFBUSxDQUFDLGtCQUFrQixDQUFDO1lBQzFCLElBQUksRUFBRTtnQkFDSixXQUFXLEVBQUUsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXO2FBQzlDO1NBQ0YsQ0FBQyxDQUFBO1FBRUYsTUFBTSxJQUFJLEdBQUcsTUFBTSxjQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxzQkFBc0IsQ0FBQyxDQUFBO1FBQy9ELE1BQU0sWUFBWSxHQUFHLE1BQU0sc0JBQVksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLHFCQUFxQixDQUFDLENBQUE7UUFFN0UsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUN0QixNQUFNLENBQUUsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFBO0lBQ2pDLENBQUMsQ0FBQyxDQUFBO0FBRUosQ0FBQyxDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB0ZXN0IH0gZnJvbSAnQGphcGEvcnVubmVyJ1xuaW1wb3J0IERhdGFiYXNlIGZyb20gJ0Bpb2M6QWRvbmlzL0x1Y2lkL0RhdGFiYXNlJ1xuaW1wb3J0IFVzZXIgZnJvbSAnQXBwL01vZGVscy9Vc2VyJ1xuaW1wb3J0IE9yZ2FuaXNhdGlvbiBmcm9tICdBcHAvTW9kZWxzL09yZ2FuaXNhdGlvbidcbmltcG9ydCB7IEh0dHBTdGF0dXNDb2RlRW51bSB9IGZyb20gJ0FwcC9IZWxwZXJzL1N0YXR1c0NvZGVzJ1xuXG50ZXN0Lmdyb3VwKCdVc2VyIFJlZ2lzdHJhdGlvbicsIChncm91cCkgPT4ge1xuICBncm91cC5zZXR1cChhc3luYyAoKSA9PiB7XG4gICAgYXdhaXQgRGF0YWJhc2UuYmVnaW5HbG9iYWxUcmFuc2FjdGlvbigpXG4gIH0pXG5cbiAgZ3JvdXAudGVhcmRvd24oYXN5bmMgKCkgPT4ge1xuICAgIGF3YWl0IERhdGFiYXNlLnJvbGxiYWNrR2xvYmFsVHJhbnNhY3Rpb24oKVxuICB9KVxuXG4gIC8vIHRlc3QoJ3Nob3VsZCByZXR1cm4gNDIyIGlmIHZhbGlkYXRpb24gZmFpbHMnLCBhc3luYyAoeyBjbGllbnQgfSkgPT4ge1xuICAvLyAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgY2xpZW50LnBvc3QoJy9hdXRoL3JlZ2lzdGVyJykuanNvbih7fSlcbiAgLy8gICByZXNwb25zZS5hc3NlcnRTdGF0dXMoSHR0cFN0YXR1c0NvZGVFbnVtLlVOUFJPQ0VTU0FCTEVfRU5USVRZKVxuICAvLyB9KSAgXG5cblxuICB0ZXN0KCdzaG91bGQgcmV0dXJuIDIwMSBpZiByZWdpc3RyYXRpb24gaXMgc3VjY2Vzc2Z1bCBhbmQgZGVmYXVsdCBvcmdhbmlzYXRpb24gaXMgY3JlYXRlZCcsIGFzeW5jICh7IGNsaWVudCB9KSA9PiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBjbGllbnQucG9zdCgnL2F1dGgvcmVnaXN0ZXInKS5qc29uKHtcbiAgICAgIGZpcnN0TmFtZTogJ0pvaG4nLFxuICAgICAgbGFzdE5hbWU6ICdEb2UnLFxuICAgICAgZW1haWw6ICdqb2huLmRvZUBleGFtcGxlLmNvbScsXG4gICAgICBwYXNzd29yZDogJ3Bhc3N3b3JkMTIzJyxcbiAgICAgIHBob25lOiAnMTIzNDU2Nzg5MCdcbiAgICB9KVxuXG4gICAgcmVzcG9uc2UuYXNzZXJ0U3RhdHVzKEh0dHBTdGF0dXNDb2RlRW51bS5DUkVBVEVEKVxuICAgIHJlc3BvbnNlLmFzc2VydEJvZHlDb250YWlucyh7XG4gICAgICBzdGF0dXM6ICdzdWNjZXNzJyxcbiAgICAgIG1lc3NhZ2U6ICdSZWdpc3RyYXRpb24gc3VjY2Vzc2Z1bCcsXG4gICAgfSlcbiAgICByZXNwb25zZS5hc3NlcnRCb2R5Q29udGFpbnMoe1xuICAgICAgZGF0YToge1xuICAgICAgICBhY2Nlc3NUb2tlbjogcmVzcG9uc2UuYm9keSgpLmRhdGEuYWNjZXNzVG9rZW4sXG4gICAgICB9XG4gICAgfSlcblxuICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBVc2VyLmZpbmRCeSgnZW1haWwnLCAnam9obi5kb2VAZXhhbXBsZS5jb20nKVxuICAgIGNvbnN0IG9yZ2FuaXNhdGlvbiA9IGF3YWl0IE9yZ2FuaXNhdGlvbi5maW5kQnkoJ25hbWUnLCBcIkpvaG4ncyBPcmdhbmlzYXRpb25cIilcbiAgICBcbiAgICBhc3NlcnQuaXNOb3ROdWxsKHVzZXIpXG4gICAgYXNzZXJ0IC5pc05vdE51bGwob3JnYW5pc2F0aW9uKVxuICB9KVxuXG59KVxuIl19