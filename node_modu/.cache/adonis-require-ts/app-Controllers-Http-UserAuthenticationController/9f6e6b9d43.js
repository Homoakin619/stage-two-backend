"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserAction_1 = global[Symbol.for('ioc.use')]("App/Actions/UserAction");
const StatusCodes_1 = global[Symbol.for('ioc.use')]("App/Helpers/StatusCodes");
const UserAuthenticationValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/UserAuthenticationValidator"));
const appConfig_1 = __importDefault(global[Symbol.for('ioc.use')]("Config/appConfig"));
const Hash_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Hash"));
const ErrorHandler_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Helpers/ErrorHandler"));
class UserAuthenticationController {
    constructor() {
        this.unprocessableEntity = StatusCodes_1.HttpStatusCodeEnum.UNPROCESSABLE_ENTITY;
        this.ok = StatusCodes_1.HttpStatusCodeEnum.OK;
        this.unauthorized = StatusCodes_1.HttpStatusCodeEnum.UNAUTHORIZED;
        this.error = StatusCodes_1.HttpStatusCodeEnum.INTERNAL_SERVER_ERROR;
    }
    async handle({ request, response, auth }) {
        try {
            try {
                await request.validate(UserAuthenticationValidator_1.default);
            }
            catch (validationError) {
                return response.status(this.unprocessableEntity).send({
                    errors: (0, ErrorHandler_1.default)(validationError.messages.errors)
                });
            }
            const { email, password } = request.body();
            const userEntity = await UserAction_1.UserActions.getUserRecord({
                identifier: email,
                identifierType: 'email'
            });
            if (!userEntity) {
                return response.status(this.unauthorized).send({
                    status: "Bad Request",
                    message: "Authentication failed",
                    statusCode: this.unauthorized
                });
            }
            const passwordMatch = await Hash_1.default.verify(userEntity.password, password);
            if (!passwordMatch) {
                return response.status(this.unauthorized).send({
                    status: "Bad Request",
                    message: "Authentication failed",
                    statusCode: this.unauthorized
                });
            }
            const accessToken = await auth.use('api').attempt(email, password, {
                expiresIn: `${appConfig_1.default.tokenExpiryTimeFrame} minutes`
            });
            const responsePayload = userEntity.forClient();
            return response.status(this.ok).send({
                status: "success",
                message: "Login successful",
                data: {
                    accessToken: accessToken.token,
                    user: responsePayload
                }
            });
        }
        catch (UserAuthenticationControllerError) {
            console.log("UserAuthenticationControllerError => ", UserAuthenticationControllerError);
            return response.status(this.error).send({
                status: "Error",
                message: "Error Occured",
                statusCode: this.error
            });
        }
    }
}
exports.default = UserAuthenticationController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlckF1dGhlbnRpY2F0aW9uQ29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlVzZXJBdXRoZW50aWNhdGlvbkNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSw2RUFBcUQ7QUFFckQsK0VBQTZEO0FBQzdELG1JQUFxRjtBQUNyRix1RkFBeUM7QUFDekMsa0ZBQXdDO0FBQ3hDLGtHQUFvRDtBQUVwRCxNQUFxQiw0QkFBNEI7SUFBakQ7UUFFWSx3QkFBbUIsR0FBRyxnQ0FBa0IsQ0FBQyxvQkFBb0IsQ0FBQTtRQUM3RCxPQUFFLEdBQUcsZ0NBQWtCLENBQUMsRUFBRSxDQUFBO1FBQzFCLGlCQUFZLEdBQUcsZ0NBQWtCLENBQUMsWUFBWSxDQUFBO1FBQzlDLFVBQUssR0FBRyxnQ0FBa0IsQ0FBQyxxQkFBcUIsQ0FBQTtJQThENUQsQ0FBQztJQTVEVSxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQXVCO1FBQ2hFLElBQUk7WUFDQSxJQUFJO2dCQUNBLE1BQU0sT0FBTyxDQUFDLFFBQVEsQ0FBQyxxQ0FBMkIsQ0FBQyxDQUFBO2FBRXREO1lBQUMsT0FBTyxlQUFlLEVBQUU7Z0JBQ3hCLE9BQU8sUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxJQUFJLENBQUM7b0JBQ3BELE1BQU0sRUFBRSxJQUFBLHNCQUFZLEVBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7aUJBQ3RELENBQUMsQ0FBQTthQUNIO1lBRUQsTUFBTSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsR0FBRyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUE7WUFFMUMsTUFBTSxVQUFVLEdBQUcsTUFBTSx3QkFBVyxDQUFDLGFBQWEsQ0FBQztnQkFDL0MsVUFBVSxFQUFFLEtBQUs7Z0JBQ2pCLGNBQWMsRUFBRSxPQUFPO2FBQzFCLENBQUMsQ0FBQTtZQUVGLElBQUksQ0FBQyxVQUFVLEVBQUU7Z0JBQ2IsT0FBTyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLENBQUM7b0JBQzNDLE1BQU0sRUFBRSxhQUFhO29CQUNyQixPQUFPLEVBQUUsdUJBQXVCO29CQUNoQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFlBQVk7aUJBQ2hDLENBQUMsQ0FBQTthQUNMO1lBRUQsTUFBTSxhQUFhLEdBQUcsTUFBTSxjQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUMsUUFBUSxDQUFDLENBQUE7WUFFckUsSUFBSSxDQUFDLGFBQWEsRUFBRTtnQkFDaEIsT0FBTyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLENBQUM7b0JBQzNDLE1BQU0sRUFBRSxhQUFhO29CQUNyQixPQUFPLEVBQUUsdUJBQXVCO29CQUNoQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFlBQVk7aUJBQ2hDLENBQUMsQ0FBQTthQUNMO1lBRUQsTUFBTSxXQUFXLEdBQUcsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUMsUUFBUSxFQUFDO2dCQUM3RCxTQUFTLEVBQUUsR0FBRyxtQkFBUyxDQUFDLG9CQUFvQixVQUFVO2FBQ3pELENBQUMsQ0FBQTtZQUVGLE1BQU0sZUFBZSxHQUFHLFVBQVUsQ0FBQyxTQUFTLEVBQUUsQ0FBQTtZQUU5QyxPQUFPLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDakMsTUFBTSxFQUFFLFNBQVM7Z0JBQ2pCLE9BQU8sRUFBRSxrQkFBa0I7Z0JBQzNCLElBQUksRUFBRTtvQkFDRixXQUFXLEVBQUUsV0FBVyxDQUFDLEtBQUs7b0JBQzlCLElBQUksRUFBRSxlQUFlO2lCQUN4QjthQUNKLENBQUMsQ0FBQTtTQUNMO1FBQUMsT0FBTyxpQ0FBaUMsRUFBRTtZQUN4QyxPQUFPLENBQUMsR0FBRyxDQUFDLHVDQUF1QyxFQUFFLGlDQUFpQyxDQUFDLENBQUE7WUFFdkYsT0FBTyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0JBQ3BDLE1BQU0sRUFBRSxPQUFPO2dCQUNmLE9BQU8sRUFBRSxlQUFlO2dCQUN4QixVQUFVLEVBQUUsSUFBSSxDQUFDLEtBQUs7YUFDekIsQ0FBQyxDQUFBO1NBQ0w7SUFDTCxDQUFDO0NBQ0o7QUFuRUQsK0NBbUVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUgeyBIdHRwQ29udGV4dENvbnRyYWN0IH0gZnJvbSAnQGlvYzpBZG9uaXMvQ29yZS9IdHRwQ29udGV4dCdcbmltcG9ydCB7IFVzZXJBY3Rpb25zIH0gZnJvbSAnQXBwL0FjdGlvbnMvVXNlckFjdGlvbic7XG5cbmltcG9ydCB7IEh0dHBTdGF0dXNDb2RlRW51bSB9IGZyb20gXCJBcHAvSGVscGVycy9TdGF0dXNDb2Rlc1wiO1xuaW1wb3J0IFVzZXJBdXRoZW50aWNhdGlvblZhbGlkYXRvciBmcm9tICdBcHAvVmFsaWRhdG9ycy9Vc2VyQXV0aGVudGljYXRpb25WYWxpZGF0b3InO1xuaW1wb3J0IGFwcENvbmZpZyBmcm9tICdDb25maWcvYXBwQ29uZmlnJztcbmltcG9ydCBIYXNoIGZyb20gXCJAaW9jOkFkb25pcy9Db3JlL0hhc2hcIlxuaW1wb3J0IHByb2Nlc3NFcnJvciBmcm9tICdBcHAvSGVscGVycy9FcnJvckhhbmRsZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVc2VyQXV0aGVudGljYXRpb25Db250cm9sbGVyIHtcblxuICAgIHByaXZhdGUgdW5wcm9jZXNzYWJsZUVudGl0eSA9IEh0dHBTdGF0dXNDb2RlRW51bS5VTlBST0NFU1NBQkxFX0VOVElUWVxuICAgIHByaXZhdGUgb2sgPSBIdHRwU3RhdHVzQ29kZUVudW0uT0tcbiAgICBwcml2YXRlIHVuYXV0aG9yaXplZCA9IEh0dHBTdGF0dXNDb2RlRW51bS5VTkFVVEhPUklaRURcbiAgICBwcml2YXRlIGVycm9yID0gSHR0cFN0YXR1c0NvZGVFbnVtLklOVEVSTkFMX1NFUlZFUl9FUlJPUlxuXG4gICAgcHVibGljIGFzeW5jIGhhbmRsZSh7IHJlcXVlc3QsIHJlc3BvbnNlLCBhdXRoIH06IEh0dHBDb250ZXh0Q29udHJhY3QpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgcmVxdWVzdC52YWxpZGF0ZShVc2VyQXV0aGVudGljYXRpb25WYWxpZGF0b3IpXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9IGNhdGNoICh2YWxpZGF0aW9uRXJyb3IpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLnN0YXR1cyh0aGlzLnVucHJvY2Vzc2FibGVFbnRpdHkpLnNlbmQoe1xuICAgICAgICAgICAgICAgIGVycm9yczogcHJvY2Vzc0Vycm9yKHZhbGlkYXRpb25FcnJvci5tZXNzYWdlcy5lcnJvcnMpXG4gICAgICAgICAgICAgIH0pICBcbiAgICAgICAgICAgIH0gXG5cbiAgICAgICAgICAgIGNvbnN0IHsgZW1haWwsIHBhc3N3b3JkIH0gPSByZXF1ZXN0LmJvZHkoKVxuXG4gICAgICAgICAgICBjb25zdCB1c2VyRW50aXR5ID0gYXdhaXQgVXNlckFjdGlvbnMuZ2V0VXNlclJlY29yZCh7XG4gICAgICAgICAgICAgICAgaWRlbnRpZmllcjogZW1haWwsXG4gICAgICAgICAgICAgICAgaWRlbnRpZmllclR5cGU6ICdlbWFpbCdcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIGlmICghdXNlckVudGl0eSkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5zdGF0dXModGhpcy51bmF1dGhvcml6ZWQpLnNlbmQoe1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IFwiQmFkIFJlcXVlc3RcIixcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXCJBdXRoZW50aWNhdGlvbiBmYWlsZWRcIixcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzQ29kZTogdGhpcy51bmF1dGhvcml6ZWRcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBwYXNzd29yZE1hdGNoID0gYXdhaXQgSGFzaC52ZXJpZnkodXNlckVudGl0eS5wYXNzd29yZCxwYXNzd29yZClcblxuICAgICAgICAgICAgaWYgKCFwYXNzd29yZE1hdGNoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLnN0YXR1cyh0aGlzLnVuYXV0aG9yaXplZCkuc2VuZCh7XG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogXCJCYWQgUmVxdWVzdFwiLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIkF1dGhlbnRpY2F0aW9uIGZhaWxlZFwiLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXNDb2RlOiB0aGlzLnVuYXV0aG9yaXplZFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IGFjY2Vzc1Rva2VuID0gYXdhaXQgYXV0aC51c2UoJ2FwaScpLmF0dGVtcHQoZW1haWwscGFzc3dvcmQse1xuICAgICAgICAgICAgICAgIGV4cGlyZXNJbjogYCR7YXBwQ29uZmlnLnRva2VuRXhwaXJ5VGltZUZyYW1lfSBtaW51dGVzYFxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2VQYXlsb2FkID0gdXNlckVudGl0eS5mb3JDbGllbnQoKVxuXG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2Uuc3RhdHVzKHRoaXMub2spLnNlbmQoe1xuICAgICAgICAgICAgICAgIHN0YXR1czogXCJzdWNjZXNzXCIsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogXCJMb2dpbiBzdWNjZXNzZnVsXCIsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBhY2Nlc3NUb2tlbjogYWNjZXNzVG9rZW4udG9rZW4sXG4gICAgICAgICAgICAgICAgICAgIHVzZXI6IHJlc3BvbnNlUGF5bG9hZFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0gY2F0Y2ggKFVzZXJBdXRoZW50aWNhdGlvbkNvbnRyb2xsZXJFcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJVc2VyQXV0aGVudGljYXRpb25Db250cm9sbGVyRXJyb3IgPT4gXCIsIFVzZXJBdXRoZW50aWNhdGlvbkNvbnRyb2xsZXJFcnJvcilcbiAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2Uuc3RhdHVzKHRoaXMuZXJyb3IpLnNlbmQoe1xuICAgICAgICAgICAgICAgIHN0YXR1czogXCJFcnJvclwiLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiRXJyb3IgT2NjdXJlZFwiLFxuICAgICAgICAgICAgICAgIHN0YXR1c0NvZGU6IHRoaXMuZXJyb3JcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=