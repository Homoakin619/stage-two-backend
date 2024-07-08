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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0cmF0aW9uLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZWdpc3RyYXRpb24uc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHlDQUFtQztBQUNuQywyRkFBaUQ7QUFHakQsK0VBQTREO0FBRTVELGFBQUksQ0FBQyxLQUFLLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtJQUN4QyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxFQUFFO1FBQ3JCLE1BQU0sa0JBQVEsQ0FBQyxzQkFBc0IsRUFBRSxDQUFBO0lBQ3pDLENBQUMsQ0FBQyxDQUFBO0lBRUYsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLElBQUksRUFBRTtRQUN4QixNQUFNLGtCQUFRLENBQUMseUJBQXlCLEVBQUUsQ0FBQTtJQUM1QyxDQUFDLENBQUMsQ0FBQTtJQUVGLElBQUEsYUFBSSxFQUFDLHVDQUF1QyxFQUFFLEtBQUssRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUU7UUFDakUsTUFBTSxRQUFRLEdBQUcsTUFBTSxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBO1FBQzdELFFBQVEsQ0FBQyxZQUFZLENBQUMsZ0NBQWtCLENBQUMsb0JBQW9CLENBQUMsQ0FBQTtJQUNoRSxDQUFDLENBQUMsQ0FBQTtBQUVKLENBQUMsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdGVzdCB9IGZyb20gJ0BqYXBhL3J1bm5lcidcbmltcG9ydCBEYXRhYmFzZSBmcm9tICdAaW9jOkFkb25pcy9MdWNpZC9EYXRhYmFzZSdcbmltcG9ydCBVc2VyIGZyb20gJ0FwcC9Nb2RlbHMvVXNlcidcbmltcG9ydCBPcmdhbmlzYXRpb24gZnJvbSAnQXBwL01vZGVscy9PcmdhbmlzYXRpb24nXG5pbXBvcnQgeyBIdHRwU3RhdHVzQ29kZUVudW0gfSBmcm9tICdBcHAvSGVscGVycy9TdGF0dXNDb2RlcydcblxudGVzdC5ncm91cCgnVXNlciBSZWdpc3RyYXRpb24nLCAoZ3JvdXApID0+IHtcbiAgZ3JvdXAuc2V0dXAoYXN5bmMgKCkgPT4ge1xuICAgIGF3YWl0IERhdGFiYXNlLmJlZ2luR2xvYmFsVHJhbnNhY3Rpb24oKVxuICB9KVxuXG4gIGdyb3VwLnRlYXJkb3duKGFzeW5jICgpID0+IHtcbiAgICBhd2FpdCBEYXRhYmFzZS5yb2xsYmFja0dsb2JhbFRyYW5zYWN0aW9uKClcbiAgfSlcblxuICB0ZXN0KCdzaG91bGQgcmV0dXJuIDQyMiBpZiB2YWxpZGF0aW9uIGZhaWxzJywgYXN5bmMgKHsgY2xpZW50IH0pID0+IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGNsaWVudC5wb3N0KCcvYXV0aC9yZWdpc3RlcicpLmpzb24oe30pXG4gICAgcmVzcG9uc2UuYXNzZXJ0U3RhdHVzKEh0dHBTdGF0dXNDb2RlRW51bS5VTlBST0NFU1NBQkxFX0VOVElUWSlcbiAgfSlcblxufSlcbiJdfQ==