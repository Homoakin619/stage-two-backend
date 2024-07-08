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
        response.assertBodyContains({
            data: {
                accessToken: response.body().data.accessToken,
            },
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxvZ2luLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSx5Q0FBbUM7QUFDbkMsMkZBQWlEO0FBQ2pELGlGQUFrQztBQUNsQyxrRkFBd0M7QUFDeEMsK0VBQTREO0FBRTVELGFBQUksQ0FBQyxLQUFLLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtJQUMxQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxFQUFFO1FBQ3JCLE1BQU0sa0JBQVEsQ0FBQyxzQkFBc0IsRUFBRSxDQUFBO0lBQ3pDLENBQUMsQ0FBQyxDQUFBO0lBRUYsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLElBQUksRUFBRTtRQUN4QixNQUFNLGtCQUFRLENBQUMseUJBQXlCLEVBQUUsQ0FBQTtJQUM1QyxDQUFDLENBQUMsQ0FBQTtJQUVGLElBQUEsYUFBSSxFQUFDLHVDQUF1QyxFQUFFLEtBQUssRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUU7UUFDakUsTUFBTSxRQUFRLEdBQUcsTUFBTSxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQTtRQUMxRCxRQUFRLENBQUMsWUFBWSxDQUFDLGdDQUFrQixDQUFDLG9CQUFvQixDQUFDLENBQUE7SUFDaEUsQ0FBQyxDQUFDLENBQUE7SUFFRixJQUFBLGFBQUksRUFBQywwQ0FBMEMsRUFBRSxLQUFLLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFO1FBQ3BFLE1BQU0sUUFBUSxHQUFHLE1BQU0sTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDckQsS0FBSyxFQUFFLHlCQUF5QjtZQUNoQyxRQUFRLEVBQUUsYUFBYTtTQUN4QixDQUFDLENBQUE7UUFDRixRQUFRLENBQUMsWUFBWSxDQUFDLGdDQUFrQixDQUFDLFlBQVksQ0FBQyxDQUFBO0lBQ3hELENBQUMsQ0FBQyxDQUFBO0lBRUYsSUFBQSxhQUFJLEVBQUMsNENBQTRDLEVBQUUsS0FBSyxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRTtRQUN0RSxNQUFNLElBQUksR0FBRyxNQUFNLGNBQUksQ0FBQyxNQUFNLENBQUM7WUFDN0IsS0FBSyxFQUFFLGdCQUFnQjtZQUN2QixRQUFRLEVBQUUsTUFBTSxjQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDO1lBQzdDLFNBQVMsRUFBRSxPQUFPO1lBQ2xCLFFBQVEsRUFBRSxNQUFNO1lBQ2hCLEtBQUssRUFBRSxhQUFhO1NBQ3JCLENBQUMsQ0FBQTtRQUVGLE1BQU0sUUFBUSxHQUFHLE1BQU0sTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDckQsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1lBQ2pCLFFBQVEsRUFBRSxnQkFBZ0I7U0FDM0IsQ0FBQyxDQUFBO1FBQ0YsUUFBUSxDQUFDLFlBQVksQ0FBQyxnQ0FBa0IsQ0FBQyxZQUFZLENBQUMsQ0FBQTtJQUN4RCxDQUFDLENBQUMsQ0FBQTtJQUVGLElBQUEsYUFBSSxFQUFDLDhDQUE4QyxFQUFFLEtBQUssRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUU7UUFDeEUsTUFBTSxJQUFJLEdBQUcsTUFBTSxjQUFJLENBQUMsTUFBTSxDQUFDO1lBQzdCLEtBQUssRUFBRSxrQkFBa0I7WUFDekIsUUFBUSxFQUFFLGFBQWE7WUFDdkIsU0FBUyxFQUFFLE9BQU87WUFDbEIsUUFBUSxFQUFFLE1BQU07WUFDaEIsS0FBSyxFQUFFLGFBQWE7U0FDckIsQ0FBQyxDQUFBO1FBRUYsTUFBTSxRQUFRLEdBQUcsTUFBTSxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNyRCxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDakIsUUFBUSxFQUFFLGFBQWE7U0FDeEIsQ0FBQyxDQUFBO1FBRUYsUUFBUSxDQUFDLFlBQVksQ0FBQyxnQ0FBa0IsQ0FBQyxFQUFFLENBQUMsQ0FBQTtRQUM1QyxRQUFRLENBQUMsa0JBQWtCLENBQUM7WUFDMUIsTUFBTSxFQUFFLFNBQVM7WUFDakIsT0FBTyxFQUFFLGtCQUFrQjtTQUM1QixDQUFDLENBQUE7UUFDRixRQUFRLENBQUMsa0JBQWtCLENBQUM7WUFDMUIsSUFBSSxFQUFFO2dCQUNKLFdBQVcsRUFBRSxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVc7YUFLOUM7U0FDRixDQUFDLENBQUE7SUFDSixDQUFDLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdGVzdCB9IGZyb20gJ0BqYXBhL3J1bm5lcidcbmltcG9ydCBEYXRhYmFzZSBmcm9tICdAaW9jOkFkb25pcy9MdWNpZC9EYXRhYmFzZSdcbmltcG9ydCBVc2VyIGZyb20gJ0FwcC9Nb2RlbHMvVXNlcidcbmltcG9ydCBIYXNoIGZyb20gJ0Bpb2M6QWRvbmlzL0NvcmUvSGFzaCdcbmltcG9ydCB7IEh0dHBTdGF0dXNDb2RlRW51bSB9IGZyb20gJ0FwcC9IZWxwZXJzL1N0YXR1c0NvZGVzJ1xuXG50ZXN0Lmdyb3VwKCdVc2VyIEF1dGhlbnRpY2F0aW9uJywgKGdyb3VwKSA9PiB7XG4gIGdyb3VwLnNldHVwKGFzeW5jICgpID0+IHtcbiAgICBhd2FpdCBEYXRhYmFzZS5iZWdpbkdsb2JhbFRyYW5zYWN0aW9uKClcbiAgfSlcblxuICBncm91cC50ZWFyZG93bihhc3luYyAoKSA9PiB7XG4gICAgYXdhaXQgRGF0YWJhc2Uucm9sbGJhY2tHbG9iYWxUcmFuc2FjdGlvbigpXG4gIH0pXG5cbiAgdGVzdCgnc2hvdWxkIHJldHVybiA0MjIgaWYgdmFsaWRhdGlvbiBmYWlscycsIGFzeW5jICh7IGNsaWVudCB9KSA9PiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBjbGllbnQucG9zdCgnL2F1dGgvbG9naW4nKS5qc29uKHt9KVxuICAgIHJlc3BvbnNlLmFzc2VydFN0YXR1cyhIdHRwU3RhdHVzQ29kZUVudW0uVU5QUk9DRVNTQUJMRV9FTlRJVFkpXG4gIH0pXG5cbiAgdGVzdCgnc2hvdWxkIHJldHVybiA0MDEgaWYgdXNlciBkb2VzIG5vdCBleGlzdCcsIGFzeW5jICh7IGNsaWVudCB9KSA9PiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBjbGllbnQucG9zdCgnL2F1dGgvbG9naW4nKS5qc29uKHtcbiAgICAgIGVtYWlsOiAnbm9uZXhpc3RlbnRAZXhhbXBsZS5jb20nLFxuICAgICAgcGFzc3dvcmQ6ICdwYXNzd29yZDEyMycsXG4gICAgfSlcbiAgICByZXNwb25zZS5hc3NlcnRTdGF0dXMoSHR0cFN0YXR1c0NvZGVFbnVtLlVOQVVUSE9SSVpFRClcbiAgfSlcblxuICB0ZXN0KCdzaG91bGQgcmV0dXJuIDQwMSBpZiBwYXNzd29yZCBpcyBpbmNvcnJlY3QnLCBhc3luYyAoeyBjbGllbnQgfSkgPT4ge1xuICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBVc2VyLmNyZWF0ZSh7XG4gICAgICBlbWFpbDogJ2phbWVzQGtpbmcuY29tJyxcbiAgICAgIHBhc3N3b3JkOiBhd2FpdCBIYXNoLm1ha2UoJ2NvcnJlY3RfcGFzc3dvcmQnKSxcbiAgICAgIGZpcnN0TmFtZTogXCJqYW1lc1wiLFxuICAgICAgbGFzdE5hbWU6IFwia2luZ1wiLFxuICAgICAgcGhvbmU6IFwiMDkwMTIzNDU2NzhcIlxuICAgIH0pXG5cbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGNsaWVudC5wb3N0KCcvYXV0aC9sb2dpbicpLmpzb24oe1xuICAgICAgZW1haWw6IHVzZXIuZW1haWwsXG4gICAgICBwYXNzd29yZDogJ3dyb25nX3Bhc3N3b3JkJyxcbiAgICB9KVxuICAgIHJlc3BvbnNlLmFzc2VydFN0YXR1cyhIdHRwU3RhdHVzQ29kZUVudW0uVU5BVVRIT1JJWkVEKVxuICB9KVxuXG4gIHRlc3QoJ3Nob3VsZCByZXR1cm4gMjAwIGlmIGNyZWRlbnRpYWxzIGFyZSBjb3JyZWN0JywgYXN5bmMgKHsgY2xpZW50IH0pID0+IHtcbiAgICBjb25zdCB1c2VyID0gYXdhaXQgVXNlci5jcmVhdGUoe1xuICAgICAgZW1haWw6ICd0ZXN0QGV4YW1wbGUuY29tJyxcbiAgICAgIHBhc3N3b3JkOiAncGFzc3dvcmQxMjMnLFxuICAgICAgZmlyc3ROYW1lOiBcImphbWVzXCIsXG4gICAgICBsYXN0TmFtZTogXCJraW5nXCIsXG4gICAgICBwaG9uZTogXCIwOTAxMjM0NTY3OFwiXG4gICAgfSlcblxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgY2xpZW50LnBvc3QoJy9hdXRoL2xvZ2luJykuanNvbih7XG4gICAgICBlbWFpbDogdXNlci5lbWFpbCxcbiAgICAgIHBhc3N3b3JkOiAncGFzc3dvcmQxMjMnLFxuICAgIH0pXG5cbiAgICByZXNwb25zZS5hc3NlcnRTdGF0dXMoSHR0cFN0YXR1c0NvZGVFbnVtLk9LKVxuICAgIHJlc3BvbnNlLmFzc2VydEJvZHlDb250YWlucyh7XG4gICAgICBzdGF0dXM6ICdzdWNjZXNzJyxcbiAgICAgIG1lc3NhZ2U6ICdMb2dpbiBzdWNjZXNzZnVsJyxcbiAgICB9KVxuICAgIHJlc3BvbnNlLmFzc2VydEJvZHlDb250YWlucyh7XG4gICAgICBkYXRhOiB7XG4gICAgICAgIGFjY2Vzc1Rva2VuOiByZXNwb25zZS5ib2R5KCkuZGF0YS5hY2Nlc3NUb2tlbixcbiAgICAgICAgLy8gdXNlcjoge1xuICAgICAgICAvLyAgIGlkOiB1c2VyLmlkLFxuICAgICAgICAvLyAgIGVtYWlsOiB1c2VyLmVtYWlsLFxuICAgICAgICAvLyB9LFxuICAgICAgfSxcbiAgICB9KVxuICB9KVxufSlcbiJdfQ==