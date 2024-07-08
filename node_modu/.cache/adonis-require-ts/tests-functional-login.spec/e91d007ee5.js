"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const runner_1 = require("@japa/runner");
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
const Hash_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Hash"));
const StatusCodes_1 = global[Symbol.for('ioc.use')]("App/Helpers/StatusCodes");
runner_1.test.group('User Authentication', (group) => {
    group.setup(async () => {
        await Database_1.default.beginGlobalTransaction();
    });
    group.teardown(async () => {
        await Database_1.default.rollbackGlobalTransaction();
    });
    (0, runner_1.test)('should return 422 if validation fails', async ({ client }) => {
        const response = await client.post('/auth/login').json({});
        response.assertStatus(StatusCodes_1.HttpStatusCodeEnum.UNPROCESSABLE_ENTITY);
    });
    (0, runner_1.test)('should return 401 if user does not exist', async ({ client }) => {
        const response = await client.post('/auth/login').json({
            email: 'nonexistent@example.com',
            password: 'password123',
        });
        response.assertStatus(StatusCodes_1.HttpStatusCodeEnum.UNAUTHORIZED);
    });
    (0, runner_1.test)('should return 401 if password is incorrect', async ({ client }) => {
        const user = await User_1.default.create({
            email: 'james@king.com',
            password: await Hash_1.default.make('correct_password'),
            firstName: "james",
            lastName: "king",
            phone: "09012345678"
        });
        const response = await client.post('/auth/login').json({
            email: user.email,
            password: 'wrong_password',
        });
        response.assertStatus(StatusCodes_1.HttpStatusCodeEnum.UNAUTHORIZED);
    });
    (0, runner_1.test)('should return 200 if credentials are correct', async ({ client }) => {
        const user = await User_1.default.create({
            email: 'test@example.com',
            password: 'password123',
            firstName: "james",
            lastName: "king",
            phone: "09012345678"
        });
        const response = await client.post('/auth/login').json({
            email: user.email,
            password: 'password123',
        });
        response.assertStatus(StatusCodes_1.HttpStatusCodeEnum.OK);
        response.assertBodyContains({
            status: 'success',
            message: 'Login successful',
        });
    });
    (0, runner_1.test)('Confirm that access token is generated', async ({ client }) => {
        const user = await User_1.default.create({
            email: 'test@example.com',
            password: 'password123',
            firstName: "james",
            lastName: "king",
            phone: "09012345678"
        });
        const response = await client.post('/auth/login').json({
            email: user.email,
            password: 'password123',
        });
        response.assertBodyContains({
            data: {
                accessToken: response.body().data.accessToken,
            },
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxvZ2luLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSx5Q0FBbUM7QUFDbkMsMkZBQWlEO0FBQ2pELGlGQUFrQztBQUNsQyxrRkFBd0M7QUFDeEMsK0VBQTREO0FBRTVELGFBQUksQ0FBQyxLQUFLLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtJQUMxQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxFQUFFO1FBQ3JCLE1BQU0sa0JBQVEsQ0FBQyxzQkFBc0IsRUFBRSxDQUFBO0lBQ3pDLENBQUMsQ0FBQyxDQUFBO0lBRUYsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLElBQUksRUFBRTtRQUN4QixNQUFNLGtCQUFRLENBQUMseUJBQXlCLEVBQUUsQ0FBQTtJQUM1QyxDQUFDLENBQUMsQ0FBQTtJQUVGLElBQUEsYUFBSSxFQUFDLHVDQUF1QyxFQUFFLEtBQUssRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUU7UUFDakUsTUFBTSxRQUFRLEdBQUcsTUFBTSxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQTtRQUMxRCxRQUFRLENBQUMsWUFBWSxDQUFDLGdDQUFrQixDQUFDLG9CQUFvQixDQUFDLENBQUE7SUFDaEUsQ0FBQyxDQUFDLENBQUE7SUFFRixJQUFBLGFBQUksRUFBQywwQ0FBMEMsRUFBRSxLQUFLLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFO1FBQ3BFLE1BQU0sUUFBUSxHQUFHLE1BQU0sTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDckQsS0FBSyxFQUFFLHlCQUF5QjtZQUNoQyxRQUFRLEVBQUUsYUFBYTtTQUN4QixDQUFDLENBQUE7UUFDRixRQUFRLENBQUMsWUFBWSxDQUFDLGdDQUFrQixDQUFDLFlBQVksQ0FBQyxDQUFBO0lBQ3hELENBQUMsQ0FBQyxDQUFBO0lBRUYsSUFBQSxhQUFJLEVBQUMsNENBQTRDLEVBQUUsS0FBSyxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRTtRQUN0RSxNQUFNLElBQUksR0FBRyxNQUFNLGNBQUksQ0FBQyxNQUFNLENBQUM7WUFDN0IsS0FBSyxFQUFFLGdCQUFnQjtZQUN2QixRQUFRLEVBQUUsTUFBTSxjQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDO1lBQzdDLFNBQVMsRUFBRSxPQUFPO1lBQ2xCLFFBQVEsRUFBRSxNQUFNO1lBQ2hCLEtBQUssRUFBRSxhQUFhO1NBQ3JCLENBQUMsQ0FBQTtRQUVGLE1BQU0sUUFBUSxHQUFHLE1BQU0sTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDckQsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1lBQ2pCLFFBQVEsRUFBRSxnQkFBZ0I7U0FDM0IsQ0FBQyxDQUFBO1FBQ0YsUUFBUSxDQUFDLFlBQVksQ0FBQyxnQ0FBa0IsQ0FBQyxZQUFZLENBQUMsQ0FBQTtJQUN4RCxDQUFDLENBQUMsQ0FBQTtJQUVGLElBQUEsYUFBSSxFQUFDLDhDQUE4QyxFQUFFLEtBQUssRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUU7UUFDeEUsTUFBTSxJQUFJLEdBQUcsTUFBTSxjQUFJLENBQUMsTUFBTSxDQUFDO1lBQzdCLEtBQUssRUFBRSxrQkFBa0I7WUFDekIsUUFBUSxFQUFFLGFBQWE7WUFDdkIsU0FBUyxFQUFFLE9BQU87WUFDbEIsUUFBUSxFQUFFLE1BQU07WUFDaEIsS0FBSyxFQUFFLGFBQWE7U0FDckIsQ0FBQyxDQUFBO1FBRUYsTUFBTSxRQUFRLEdBQUcsTUFBTSxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNyRCxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDakIsUUFBUSxFQUFFLGFBQWE7U0FDeEIsQ0FBQyxDQUFBO1FBRUYsUUFBUSxDQUFDLFlBQVksQ0FBQyxnQ0FBa0IsQ0FBQyxFQUFFLENBQUMsQ0FBQTtRQUM1QyxRQUFRLENBQUMsa0JBQWtCLENBQUM7WUFDMUIsTUFBTSxFQUFFLFNBQVM7WUFDakIsT0FBTyxFQUFFLGtCQUFrQjtTQUM1QixDQUFDLENBQUE7SUFDSixDQUFDLENBQUMsQ0FBQTtJQUVGLElBQUEsYUFBSSxFQUFDLHdDQUF3QyxFQUFFLEtBQUssRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUU7UUFDbEUsTUFBTSxJQUFJLEdBQUcsTUFBTSxjQUFJLENBQUMsTUFBTSxDQUFDO1lBQzdCLEtBQUssRUFBRSxrQkFBa0I7WUFDekIsUUFBUSxFQUFFLGFBQWE7WUFDdkIsU0FBUyxFQUFFLE9BQU87WUFDbEIsUUFBUSxFQUFFLE1BQU07WUFDaEIsS0FBSyxFQUFFLGFBQWE7U0FDckIsQ0FBQyxDQUFBO1FBRUYsTUFBTSxRQUFRLEdBQUcsTUFBTSxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNyRCxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDakIsUUFBUSxFQUFFLGFBQWE7U0FDeEIsQ0FBQyxDQUFBO1FBRUYsUUFBUSxDQUFDLGtCQUFrQixDQUFDO1lBQ3hCLElBQUksRUFBRTtnQkFDSixXQUFXLEVBQUUsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXO2FBQzlDO1NBQ0YsQ0FBQyxDQUFBO0lBQ0osQ0FBQyxDQUNBLENBQUE7QUFDTCxDQUFDLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHRlc3QgfSBmcm9tICdAamFwYS9ydW5uZXInXG5pbXBvcnQgRGF0YWJhc2UgZnJvbSAnQGlvYzpBZG9uaXMvTHVjaWQvRGF0YWJhc2UnXG5pbXBvcnQgVXNlciBmcm9tICdBcHAvTW9kZWxzL1VzZXInXG5pbXBvcnQgSGFzaCBmcm9tICdAaW9jOkFkb25pcy9Db3JlL0hhc2gnXG5pbXBvcnQgeyBIdHRwU3RhdHVzQ29kZUVudW0gfSBmcm9tICdBcHAvSGVscGVycy9TdGF0dXNDb2RlcydcblxudGVzdC5ncm91cCgnVXNlciBBdXRoZW50aWNhdGlvbicsIChncm91cCkgPT4ge1xuICBncm91cC5zZXR1cChhc3luYyAoKSA9PiB7XG4gICAgYXdhaXQgRGF0YWJhc2UuYmVnaW5HbG9iYWxUcmFuc2FjdGlvbigpXG4gIH0pXG5cbiAgZ3JvdXAudGVhcmRvd24oYXN5bmMgKCkgPT4ge1xuICAgIGF3YWl0IERhdGFiYXNlLnJvbGxiYWNrR2xvYmFsVHJhbnNhY3Rpb24oKVxuICB9KVxuXG4gIHRlc3QoJ3Nob3VsZCByZXR1cm4gNDIyIGlmIHZhbGlkYXRpb24gZmFpbHMnLCBhc3luYyAoeyBjbGllbnQgfSkgPT4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgY2xpZW50LnBvc3QoJy9hdXRoL2xvZ2luJykuanNvbih7fSlcbiAgICByZXNwb25zZS5hc3NlcnRTdGF0dXMoSHR0cFN0YXR1c0NvZGVFbnVtLlVOUFJPQ0VTU0FCTEVfRU5USVRZKVxuICB9KVxuXG4gIHRlc3QoJ3Nob3VsZCByZXR1cm4gNDAxIGlmIHVzZXIgZG9lcyBub3QgZXhpc3QnLCBhc3luYyAoeyBjbGllbnQgfSkgPT4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgY2xpZW50LnBvc3QoJy9hdXRoL2xvZ2luJykuanNvbih7XG4gICAgICBlbWFpbDogJ25vbmV4aXN0ZW50QGV4YW1wbGUuY29tJyxcbiAgICAgIHBhc3N3b3JkOiAncGFzc3dvcmQxMjMnLFxuICAgIH0pXG4gICAgcmVzcG9uc2UuYXNzZXJ0U3RhdHVzKEh0dHBTdGF0dXNDb2RlRW51bS5VTkFVVEhPUklaRUQpXG4gIH0pXG5cbiAgdGVzdCgnc2hvdWxkIHJldHVybiA0MDEgaWYgcGFzc3dvcmQgaXMgaW5jb3JyZWN0JywgYXN5bmMgKHsgY2xpZW50IH0pID0+IHtcbiAgICBjb25zdCB1c2VyID0gYXdhaXQgVXNlci5jcmVhdGUoe1xuICAgICAgZW1haWw6ICdqYW1lc0BraW5nLmNvbScsXG4gICAgICBwYXNzd29yZDogYXdhaXQgSGFzaC5tYWtlKCdjb3JyZWN0X3Bhc3N3b3JkJyksXG4gICAgICBmaXJzdE5hbWU6IFwiamFtZXNcIixcbiAgICAgIGxhc3ROYW1lOiBcImtpbmdcIixcbiAgICAgIHBob25lOiBcIjA5MDEyMzQ1Njc4XCJcbiAgICB9KVxuXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBjbGllbnQucG9zdCgnL2F1dGgvbG9naW4nKS5qc29uKHtcbiAgICAgIGVtYWlsOiB1c2VyLmVtYWlsLFxuICAgICAgcGFzc3dvcmQ6ICd3cm9uZ19wYXNzd29yZCcsXG4gICAgfSlcbiAgICByZXNwb25zZS5hc3NlcnRTdGF0dXMoSHR0cFN0YXR1c0NvZGVFbnVtLlVOQVVUSE9SSVpFRClcbiAgfSlcblxuICB0ZXN0KCdzaG91bGQgcmV0dXJuIDIwMCBpZiBjcmVkZW50aWFscyBhcmUgY29ycmVjdCcsIGFzeW5jICh7IGNsaWVudCB9KSA9PiB7XG4gICAgY29uc3QgdXNlciA9IGF3YWl0IFVzZXIuY3JlYXRlKHtcbiAgICAgIGVtYWlsOiAndGVzdEBleGFtcGxlLmNvbScsXG4gICAgICBwYXNzd29yZDogJ3Bhc3N3b3JkMTIzJyxcbiAgICAgIGZpcnN0TmFtZTogXCJqYW1lc1wiLFxuICAgICAgbGFzdE5hbWU6IFwia2luZ1wiLFxuICAgICAgcGhvbmU6IFwiMDkwMTIzNDU2NzhcIlxuICAgIH0pXG5cbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGNsaWVudC5wb3N0KCcvYXV0aC9sb2dpbicpLmpzb24oe1xuICAgICAgZW1haWw6IHVzZXIuZW1haWwsXG4gICAgICBwYXNzd29yZDogJ3Bhc3N3b3JkMTIzJyxcbiAgICB9KVxuXG4gICAgcmVzcG9uc2UuYXNzZXJ0U3RhdHVzKEh0dHBTdGF0dXNDb2RlRW51bS5PSylcbiAgICByZXNwb25zZS5hc3NlcnRCb2R5Q29udGFpbnMoe1xuICAgICAgc3RhdHVzOiAnc3VjY2VzcycsXG4gICAgICBtZXNzYWdlOiAnTG9naW4gc3VjY2Vzc2Z1bCcsXG4gICAgfSlcbiAgfSlcblxuICB0ZXN0KCdDb25maXJtIHRoYXQgYWNjZXNzIHRva2VuIGlzIGdlbmVyYXRlZCcsIGFzeW5jICh7IGNsaWVudCB9KSA9PiB7XG4gICAgY29uc3QgdXNlciA9IGF3YWl0IFVzZXIuY3JlYXRlKHtcbiAgICAgIGVtYWlsOiAndGVzdEBleGFtcGxlLmNvbScsXG4gICAgICBwYXNzd29yZDogJ3Bhc3N3b3JkMTIzJyxcbiAgICAgIGZpcnN0TmFtZTogXCJqYW1lc1wiLFxuICAgICAgbGFzdE5hbWU6IFwia2luZ1wiLFxuICAgICAgcGhvbmU6IFwiMDkwMTIzNDU2NzhcIlxuICAgIH0pXG5cbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGNsaWVudC5wb3N0KCcvYXV0aC9sb2dpbicpLmpzb24oe1xuICAgICAgZW1haWw6IHVzZXIuZW1haWwsXG4gICAgICBwYXNzd29yZDogJ3Bhc3N3b3JkMTIzJyxcbiAgICB9KVxuXG4gICAgcmVzcG9uc2UuYXNzZXJ0Qm9keUNvbnRhaW5zKHtcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIGFjY2Vzc1Rva2VuOiByZXNwb25zZS5ib2R5KCkuZGF0YS5hY2Nlc3NUb2tlbixcbiAgICAgICAgfSxcbiAgICAgIH0pXG4gICAgfVxuICAgIClcbn0pXG4iXX0=