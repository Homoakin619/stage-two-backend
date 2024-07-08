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
    (0, runner_1.test)('should return 200 if credentials are correct and token is generated', async ({ client }) => {
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
        const response = await client.post('/auth/login').json({
            email: "test@example.com",
            password: 'password123',
        });
        response.assertBodyContains({
            data: {
                accessToken: response.body().data.accessToken,
            },
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxvZ2luLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSx5Q0FBbUM7QUFDbkMsMkZBQWlEO0FBQ2pELGlGQUFrQztBQUNsQyxrRkFBd0M7QUFDeEMsK0VBQTREO0FBRTVELGFBQUksQ0FBQyxLQUFLLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtJQUMxQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxFQUFFO1FBQ3JCLE1BQU0sa0JBQVEsQ0FBQyxzQkFBc0IsRUFBRSxDQUFBO0lBQ3pDLENBQUMsQ0FBQyxDQUFBO0lBRUYsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLElBQUksRUFBRTtRQUN4QixNQUFNLGtCQUFRLENBQUMseUJBQXlCLEVBQUUsQ0FBQTtJQUM1QyxDQUFDLENBQUMsQ0FBQTtJQUVGLElBQUEsYUFBSSxFQUFDLHVDQUF1QyxFQUFFLEtBQUssRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUU7UUFDakUsTUFBTSxRQUFRLEdBQUcsTUFBTSxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQTtRQUMxRCxRQUFRLENBQUMsWUFBWSxDQUFDLGdDQUFrQixDQUFDLG9CQUFvQixDQUFDLENBQUE7SUFDaEUsQ0FBQyxDQUFDLENBQUE7SUFFRixJQUFBLGFBQUksRUFBQywwQ0FBMEMsRUFBRSxLQUFLLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFO1FBQ3BFLE1BQU0sUUFBUSxHQUFHLE1BQU0sTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDckQsS0FBSyxFQUFFLHlCQUF5QjtZQUNoQyxRQUFRLEVBQUUsYUFBYTtTQUN4QixDQUFDLENBQUE7UUFDRixRQUFRLENBQUMsWUFBWSxDQUFDLGdDQUFrQixDQUFDLFlBQVksQ0FBQyxDQUFBO0lBQ3hELENBQUMsQ0FBQyxDQUFBO0lBRUYsSUFBQSxhQUFJLEVBQUMsNENBQTRDLEVBQUUsS0FBSyxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRTtRQUN0RSxNQUFNLElBQUksR0FBRyxNQUFNLGNBQUksQ0FBQyxNQUFNLENBQUM7WUFDN0IsS0FBSyxFQUFFLGdCQUFnQjtZQUN2QixRQUFRLEVBQUUsTUFBTSxjQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDO1lBQzdDLFNBQVMsRUFBRSxPQUFPO1lBQ2xCLFFBQVEsRUFBRSxNQUFNO1lBQ2hCLEtBQUssRUFBRSxhQUFhO1NBQ3JCLENBQUMsQ0FBQTtRQUVGLE1BQU0sUUFBUSxHQUFHLE1BQU0sTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDckQsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1lBQ2pCLFFBQVEsRUFBRSxnQkFBZ0I7U0FDM0IsQ0FBQyxDQUFBO1FBQ0YsUUFBUSxDQUFDLFlBQVksQ0FBQyxnQ0FBa0IsQ0FBQyxZQUFZLENBQUMsQ0FBQTtJQUN4RCxDQUFDLENBQUMsQ0FBQTtJQUVGLElBQUEsYUFBSSxFQUFDLHFFQUFxRSxFQUFFLEtBQUssRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUU7UUFDL0YsTUFBTSxJQUFJLEdBQUcsTUFBTSxjQUFJLENBQUMsTUFBTSxDQUFDO1lBQzdCLEtBQUssRUFBRSxrQkFBa0I7WUFDekIsUUFBUSxFQUFFLGFBQWE7WUFDdkIsU0FBUyxFQUFFLE9BQU87WUFDbEIsUUFBUSxFQUFFLE1BQU07WUFDaEIsS0FBSyxFQUFFLGFBQWE7U0FDckIsQ0FBQyxDQUFBO1FBRUYsTUFBTSxRQUFRLEdBQUcsTUFBTSxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNyRCxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDakIsUUFBUSxFQUFFLGFBQWE7U0FDeEIsQ0FBQyxDQUFBO1FBRUYsUUFBUSxDQUFDLFlBQVksQ0FBQyxnQ0FBa0IsQ0FBQyxFQUFFLENBQUMsQ0FBQTtRQUM1QyxRQUFRLENBQUMsa0JBQWtCLENBQUM7WUFDMUIsTUFBTSxFQUFFLFNBQVM7WUFDakIsT0FBTyxFQUFFLGtCQUFrQjtTQUM1QixDQUFDLENBQUE7SUFDSixDQUFDLENBQUMsQ0FBQTtJQUVGLElBQUEsYUFBSSxFQUFDLHdDQUF3QyxFQUFFLEtBQUssRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUU7UUFTbEUsTUFBTSxRQUFRLEdBQUcsTUFBTSxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNyRCxLQUFLLEVBQUUsa0JBQWtCO1lBQ3pCLFFBQVEsRUFBRSxhQUFhO1NBQ3hCLENBQUMsQ0FBQTtRQUVGLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQztZQUN4QixJQUFJLEVBQUU7Z0JBQ0osV0FBVyxFQUFFLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVzthQUM5QztTQUNGLENBQUMsQ0FBQTtJQUNKLENBQUMsQ0FDQSxDQUFBO0FBRUwsQ0FBQyxDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB0ZXN0IH0gZnJvbSAnQGphcGEvcnVubmVyJ1xuaW1wb3J0IERhdGFiYXNlIGZyb20gJ0Bpb2M6QWRvbmlzL0x1Y2lkL0RhdGFiYXNlJ1xuaW1wb3J0IFVzZXIgZnJvbSAnQXBwL01vZGVscy9Vc2VyJ1xuaW1wb3J0IEhhc2ggZnJvbSAnQGlvYzpBZG9uaXMvQ29yZS9IYXNoJ1xuaW1wb3J0IHsgSHR0cFN0YXR1c0NvZGVFbnVtIH0gZnJvbSAnQXBwL0hlbHBlcnMvU3RhdHVzQ29kZXMnXG5cbnRlc3QuZ3JvdXAoJ1VzZXIgQXV0aGVudGljYXRpb24nLCAoZ3JvdXApID0+IHtcbiAgZ3JvdXAuc2V0dXAoYXN5bmMgKCkgPT4ge1xuICAgIGF3YWl0IERhdGFiYXNlLmJlZ2luR2xvYmFsVHJhbnNhY3Rpb24oKVxuICB9KVxuXG4gIGdyb3VwLnRlYXJkb3duKGFzeW5jICgpID0+IHtcbiAgICBhd2FpdCBEYXRhYmFzZS5yb2xsYmFja0dsb2JhbFRyYW5zYWN0aW9uKClcbiAgfSlcblxuICB0ZXN0KCdzaG91bGQgcmV0dXJuIDQyMiBpZiB2YWxpZGF0aW9uIGZhaWxzJywgYXN5bmMgKHsgY2xpZW50IH0pID0+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGNsaWVudC5wb3N0KCcvYXV0aC9sb2dpbicpLmpzb24oe30pXG4gICAgcmVzcG9uc2UuYXNzZXJ0U3RhdHVzKEh0dHBTdGF0dXNDb2RlRW51bS5VTlBST0NFU1NBQkxFX0VOVElUWSlcbiAgfSlcblxuICB0ZXN0KCdzaG91bGQgcmV0dXJuIDQwMSBpZiB1c2VyIGRvZXMgbm90IGV4aXN0JywgYXN5bmMgKHsgY2xpZW50IH0pID0+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGNsaWVudC5wb3N0KCcvYXV0aC9sb2dpbicpLmpzb24oe1xuICAgICAgZW1haWw6ICdub25leGlzdGVudEBleGFtcGxlLmNvbScsXG4gICAgICBwYXNzd29yZDogJ3Bhc3N3b3JkMTIzJyxcbiAgICB9KVxuICAgIHJlc3BvbnNlLmFzc2VydFN0YXR1cyhIdHRwU3RhdHVzQ29kZUVudW0uVU5BVVRIT1JJWkVEKVxuICB9KVxuXG4gIHRlc3QoJ3Nob3VsZCByZXR1cm4gNDAxIGlmIHBhc3N3b3JkIGlzIGluY29ycmVjdCcsIGFzeW5jICh7IGNsaWVudCB9KSA9PiB7XG4gICAgY29uc3QgdXNlciA9IGF3YWl0IFVzZXIuY3JlYXRlKHtcbiAgICAgIGVtYWlsOiAnamFtZXNAa2luZy5jb20nLFxuICAgICAgcGFzc3dvcmQ6IGF3YWl0IEhhc2gubWFrZSgnY29ycmVjdF9wYXNzd29yZCcpLFxuICAgICAgZmlyc3ROYW1lOiBcImphbWVzXCIsXG4gICAgICBsYXN0TmFtZTogXCJraW5nXCIsXG4gICAgICBwaG9uZTogXCIwOTAxMjM0NTY3OFwiXG4gICAgfSlcblxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgY2xpZW50LnBvc3QoJy9hdXRoL2xvZ2luJykuanNvbih7XG4gICAgICBlbWFpbDogdXNlci5lbWFpbCxcbiAgICAgIHBhc3N3b3JkOiAnd3JvbmdfcGFzc3dvcmQnLFxuICAgIH0pXG4gICAgcmVzcG9uc2UuYXNzZXJ0U3RhdHVzKEh0dHBTdGF0dXNDb2RlRW51bS5VTkFVVEhPUklaRUQpXG4gIH0pXG5cbiAgdGVzdCgnc2hvdWxkIHJldHVybiAyMDAgaWYgY3JlZGVudGlhbHMgYXJlIGNvcnJlY3QgYW5kIHRva2VuIGlzIGdlbmVyYXRlZCcsIGFzeW5jICh7IGNsaWVudCB9KSA9PiB7XG4gICAgY29uc3QgdXNlciA9IGF3YWl0IFVzZXIuY3JlYXRlKHtcbiAgICAgIGVtYWlsOiAndGVzdEBleGFtcGxlLmNvbScsXG4gICAgICBwYXNzd29yZDogJ3Bhc3N3b3JkMTIzJyxcbiAgICAgIGZpcnN0TmFtZTogXCJqYW1lc1wiLFxuICAgICAgbGFzdE5hbWU6IFwia2luZ1wiLFxuICAgICAgcGhvbmU6IFwiMDkwMTIzNDU2NzhcIlxuICAgIH0pXG5cbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGNsaWVudC5wb3N0KCcvYXV0aC9sb2dpbicpLmpzb24oe1xuICAgICAgZW1haWw6IHVzZXIuZW1haWwsXG4gICAgICBwYXNzd29yZDogJ3Bhc3N3b3JkMTIzJyxcbiAgICB9KVxuXG4gICAgcmVzcG9uc2UuYXNzZXJ0U3RhdHVzKEh0dHBTdGF0dXNDb2RlRW51bS5PSylcbiAgICByZXNwb25zZS5hc3NlcnRCb2R5Q29udGFpbnMoe1xuICAgICAgc3RhdHVzOiAnc3VjY2VzcycsXG4gICAgICBtZXNzYWdlOiAnTG9naW4gc3VjY2Vzc2Z1bCcsXG4gICAgfSlcbiAgfSlcblxuICB0ZXN0KCdDb25maXJtIHRoYXQgYWNjZXNzIHRva2VuIGlzIGdlbmVyYXRlZCcsIGFzeW5jICh7IGNsaWVudCB9KSA9PiB7XG4gICAgLy8gY29uc3QgdXNlciA9IGF3YWl0IFVzZXIuY3JlYXRlKHtcbiAgICAvLyAgIGVtYWlsOiAndGVzdEBleGFtcGxlLmNvbScsXG4gICAgLy8gICBwYXNzd29yZDogJ3Bhc3N3b3JkMTIzJyxcbiAgICAvLyAgIGZpcnN0TmFtZTogXCJqYW1lc1wiLFxuICAgIC8vICAgbGFzdE5hbWU6IFwia2luZ1wiLFxuICAgIC8vICAgcGhvbmU6IFwiMDkwMTIzNDU2NzhcIlxuICAgIC8vIH0pXG5cbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGNsaWVudC5wb3N0KCcvYXV0aC9sb2dpbicpLmpzb24oe1xuICAgICAgZW1haWw6IFwidGVzdEBleGFtcGxlLmNvbVwiLFxuICAgICAgcGFzc3dvcmQ6ICdwYXNzd29yZDEyMycsXG4gICAgfSlcblxuICAgIHJlc3BvbnNlLmFzc2VydEJvZHlDb250YWlucyh7XG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICBhY2Nlc3NUb2tlbjogcmVzcG9uc2UuYm9keSgpLmRhdGEuYWNjZXNzVG9rZW4sXG4gICAgICAgIH0sXG4gICAgICB9KVxuICAgIH1cbiAgICApXG5cbn0pXG4iXX0=