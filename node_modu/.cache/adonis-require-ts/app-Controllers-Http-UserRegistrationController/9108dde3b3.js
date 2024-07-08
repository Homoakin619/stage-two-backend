"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
const OrganisationAction_1 = global[Symbol.for('ioc.use')]("App/Actions/OrganisationAction");
const UserAction_1 = global[Symbol.for('ioc.use')]("App/Actions/UserAction");
const ErrorHandler_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Helpers/ErrorHandler"));
const StatusCodes_1 = global[Symbol.for('ioc.use')]("App/Helpers/StatusCodes");
const UserRegistrationValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/UserRegistrationValidator"));
const appConfig_1 = __importDefault(global[Symbol.for('ioc.use')]("Config/appConfig"));
class UserRegistrationController {
    constructor() {
        this.unprocessableEntity = StatusCodes_1.HttpStatusCodeEnum.UNPROCESSABLE_ENTITY;
        this.created = StatusCodes_1.HttpStatusCodeEnum.CREATED;
        this.error = StatusCodes_1.HttpStatusCodeEnum.INTERNAL_SERVER_ERROR;
    }
    async handle({ request, response, auth }) {
        const dbTransaction = await Database_1.default.transaction();
        try {
            try {
                await request.validate(UserRegistrationValidator_1.default);
            }
            catch (validationError) {
                return response.status(this.unprocessableEntity).send({
                    errors: (0, ErrorHandler_1.default)(validationError.messages.errors)
                });
            }
            const { firstName, lastName, email, password, phone } = request.body();
            const userEntity = await UserAction_1.UserActions.createUser({
                createPayload: {
                    firstName, lastName, email, password, phone
                },
                dbTransactionOptions: {
                    useTransaction: true,
                    dbTransaction
                }
            });
            const newOrganisationName = `${firstName}'s Organisation`;
            let organisationEntity = await OrganisationAction_1.OrganisationActions.getOrganisationRecord({
                identifier: newOrganisationName,
                identifierType: "name"
            });
            if (!organisationEntity) {
                organisationEntity = await OrganisationAction_1.OrganisationActions.createOrganisation({
                    createPayload: {
                        name: newOrganisationName, description: ""
                    },
                    dbTransactionOptions: {
                        useTransaction: true,
                        dbTransaction
                    }
                });
            }
            await dbTransaction.commit();
            await OrganisationAction_1.OrganisationActions.addUserToOrganisation({
                orgId: organisationEntity.id,
                userId: userEntity.id
            });
            const accessToken = await auth.use('api').attempt(email, password, {
                expiresIn: `${appConfig_1.default.tokenExpiryTimeFrame} minutes`
            });
            const responsePayload = userEntity.forClient();
            return response.status(this.created).send({
                status: "success",
                message: "Registration successful",
                data: {
                    accessToken: accessToken.token,
                    user: responsePayload
                }
            });
        }
        catch (UserRegistrationsControllerError) {
            console.log("UserRegistrationsControllerError => ", UserRegistrationsControllerError);
            await dbTransaction.rollback();
            return response.status(this.error).send({
                status: "Error",
                message: "Error Occured Creating User",
                statusCode: this.error
            });
        }
    }
}
exports.default = UserRegistrationController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlclJlZ2lzdHJhdGlvbkNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJVc2VyUmVnaXN0cmF0aW9uQ29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLDJGQUFrRDtBQUNsRCw2RkFBcUU7QUFDckUsNkVBQXFEO0FBQ3JELGtHQUFvRDtBQUVwRCwrRUFBNkQ7QUFDN0QsK0hBQWlGO0FBQ2pGLHVGQUF5QztBQUV6QyxNQUFxQiwwQkFBMEI7SUFBL0M7UUFFWSx3QkFBbUIsR0FBRyxnQ0FBa0IsQ0FBQyxvQkFBb0IsQ0FBQTtRQUM3RCxZQUFPLEdBQUcsZ0NBQWtCLENBQUMsT0FBTyxDQUFBO1FBQ3BDLFVBQUssR0FBRyxnQ0FBa0IsQ0FBQyxxQkFBcUIsQ0FBQTtJQStFNUQsQ0FBQztJQTdFVSxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQXVCO1FBQ2hFLE1BQU0sYUFBYSxHQUFHLE1BQU0sa0JBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtRQUNsRCxJQUFJO1lBQ0EsSUFBSTtnQkFDQSxNQUFNLE9BQU8sQ0FBQyxRQUFRLENBQUMsbUNBQXlCLENBQUMsQ0FBQTthQUVwRDtZQUFDLE9BQU8sZUFBZSxFQUFFO2dCQUN4QixPQUFPLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsSUFBSSxDQUFDO29CQUNwRCxNQUFNLEVBQUUsSUFBQSxzQkFBWSxFQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO2lCQUN0RCxDQUFDLENBQUE7YUFDSDtZQUVELE1BQU0sRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEdBQUcsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFBO1lBRXRFLE1BQU0sVUFBVSxHQUFHLE1BQU0sd0JBQVcsQ0FBQyxVQUFVLENBQUM7Z0JBQzVDLGFBQWEsRUFBRTtvQkFDWCxTQUFTLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsS0FBSztpQkFDOUM7Z0JBQ0Qsb0JBQW9CLEVBQUU7b0JBQ2xCLGNBQWMsRUFBRSxJQUFJO29CQUNwQixhQUFhO2lCQUNoQjthQUNKLENBQUMsQ0FBQTtZQUVGLE1BQU0sbUJBQW1CLEdBQUcsR0FBRyxTQUFTLGlCQUFpQixDQUFBO1lBRXpELElBQUksa0JBQWtCLEdBQUcsTUFBTSx3Q0FBbUIsQ0FBQyxxQkFBcUIsQ0FBQztnQkFDckUsVUFBVSxFQUFFLG1CQUFtQjtnQkFDL0IsY0FBYyxFQUFFLE1BQU07YUFDekIsQ0FBQyxDQUFBO1lBRUYsSUFBSSxDQUFDLGtCQUFrQixFQUFFO2dCQUNyQixrQkFBa0IsR0FBRyxNQUFNLHdDQUFtQixDQUFDLGtCQUFrQixDQUFDO29CQUM5RCxhQUFhLEVBQUU7d0JBQ1gsSUFBSSxFQUFFLG1CQUFtQixFQUFFLFdBQVcsRUFBRSxFQUFFO3FCQUM3QztvQkFDRCxvQkFBb0IsRUFBRTt3QkFDbEIsY0FBYyxFQUFFLElBQUk7d0JBQ3BCLGFBQWE7cUJBQ2hCO2lCQUNKLENBQUMsQ0FBQTthQUNMO1lBRUQsTUFBTSxhQUFhLENBQUMsTUFBTSxFQUFFLENBQUE7WUFFNUIsTUFBTSx3Q0FBbUIsQ0FBQyxxQkFBcUIsQ0FBQztnQkFDNUMsS0FBSyxFQUFFLGtCQUFrQixDQUFDLEVBQUU7Z0JBQzVCLE1BQU0sRUFBRSxVQUFVLENBQUMsRUFBRTthQUN4QixDQUFDLENBQUE7WUFJRixNQUFNLFdBQVcsR0FBRyxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBQyxRQUFRLEVBQUM7Z0JBQzdELFNBQVMsRUFBRSxHQUFHLG1CQUFTLENBQUMsb0JBQW9CLFVBQVU7YUFDekQsQ0FBQyxDQUFBO1lBRUYsTUFBTSxlQUFlLEdBQUcsVUFBVSxDQUFDLFNBQVMsRUFBRSxDQUFBO1lBRTlDLE9BQU8sUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUN0QyxNQUFNLEVBQUUsU0FBUztnQkFDakIsT0FBTyxFQUFFLHlCQUF5QjtnQkFDbEMsSUFBSSxFQUFFO29CQUNGLFdBQVcsRUFBRSxXQUFXLENBQUMsS0FBSztvQkFDOUIsSUFBSSxFQUFFLGVBQWU7aUJBQ3hCO2FBQ0osQ0FBQyxDQUFBO1NBRUw7UUFBQyxPQUFPLGdDQUFnQyxFQUFFO1lBQ3ZDLE9BQU8sQ0FBQyxHQUFHLENBQUMsc0NBQXNDLEVBQUUsZ0NBQWdDLENBQUMsQ0FBQTtZQUNyRixNQUFNLGFBQWEsQ0FBQyxRQUFRLEVBQUUsQ0FBQTtZQUM5QixPQUFPLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDcEMsTUFBTSxFQUFFLE9BQU87Z0JBQ2YsT0FBTyxFQUFFLDZCQUE2QjtnQkFDdEMsVUFBVSxFQUFFLElBQUksQ0FBQyxLQUFLO2FBQ3pCLENBQUMsQ0FBQTtTQUNMO0lBQ0wsQ0FBQztDQUNKO0FBbkZELDZDQW1GQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHsgSHR0cENvbnRleHRDb250cmFjdCB9IGZyb20gJ0Bpb2M6QWRvbmlzL0NvcmUvSHR0cENvbnRleHQnXG5pbXBvcnQgRGF0YWJhc2UgZnJvbSAnQGlvYzpBZG9uaXMvTHVjaWQvRGF0YWJhc2UnO1xuaW1wb3J0IHsgT3JnYW5pc2F0aW9uQWN0aW9ucyB9IGZyb20gJ0FwcC9BY3Rpb25zL09yZ2FuaXNhdGlvbkFjdGlvbic7XG5pbXBvcnQgeyBVc2VyQWN0aW9ucyB9IGZyb20gJ0FwcC9BY3Rpb25zL1VzZXJBY3Rpb24nO1xuaW1wb3J0IHByb2Nlc3NFcnJvciBmcm9tICdBcHAvSGVscGVycy9FcnJvckhhbmRsZXInO1xuXG5pbXBvcnQgeyBIdHRwU3RhdHVzQ29kZUVudW0gfSBmcm9tIFwiQXBwL0hlbHBlcnMvU3RhdHVzQ29kZXNcIjtcbmltcG9ydCBVc2VyUmVnaXN0cmF0aW9uVmFsaWRhdG9yIGZyb20gJ0FwcC9WYWxpZGF0b3JzL1VzZXJSZWdpc3RyYXRpb25WYWxpZGF0b3InO1xuaW1wb3J0IGFwcENvbmZpZyBmcm9tICdDb25maWcvYXBwQ29uZmlnJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXNlclJlZ2lzdHJhdGlvbkNvbnRyb2xsZXIge1xuXG4gICAgcHJpdmF0ZSB1bnByb2Nlc3NhYmxlRW50aXR5ID0gSHR0cFN0YXR1c0NvZGVFbnVtLlVOUFJPQ0VTU0FCTEVfRU5USVRZXG4gICAgcHJpdmF0ZSBjcmVhdGVkID0gSHR0cFN0YXR1c0NvZGVFbnVtLkNSRUFURURcbiAgICBwcml2YXRlIGVycm9yID0gSHR0cFN0YXR1c0NvZGVFbnVtLklOVEVSTkFMX1NFUlZFUl9FUlJPUlxuXG4gICAgcHVibGljIGFzeW5jIGhhbmRsZSh7IHJlcXVlc3QsIHJlc3BvbnNlLCBhdXRoIH06IEh0dHBDb250ZXh0Q29udHJhY3QpIHtcbiAgICAgICAgY29uc3QgZGJUcmFuc2FjdGlvbiA9IGF3YWl0IERhdGFiYXNlLnRyYW5zYWN0aW9uKClcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgcmVxdWVzdC52YWxpZGF0ZShVc2VyUmVnaXN0cmF0aW9uVmFsaWRhdG9yKVxuXG4gICAgICAgICAgICB9IGNhdGNoICh2YWxpZGF0aW9uRXJyb3IpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLnN0YXR1cyh0aGlzLnVucHJvY2Vzc2FibGVFbnRpdHkpLnNlbmQoe1xuICAgICAgICAgICAgICAgIGVycm9yczogcHJvY2Vzc0Vycm9yKHZhbGlkYXRpb25FcnJvci5tZXNzYWdlcy5lcnJvcnMpXG4gICAgICAgICAgICAgIH0pICBcbiAgICAgICAgICAgIH0gXG5cbiAgICAgICAgICAgIGNvbnN0IHsgZmlyc3ROYW1lLCBsYXN0TmFtZSwgZW1haWwsIHBhc3N3b3JkLCBwaG9uZSB9ID0gcmVxdWVzdC5ib2R5KClcblxuICAgICAgICAgICAgY29uc3QgdXNlckVudGl0eSA9IGF3YWl0IFVzZXJBY3Rpb25zLmNyZWF0ZVVzZXIoe1xuICAgICAgICAgICAgICAgIGNyZWF0ZVBheWxvYWQ6IHtcbiAgICAgICAgICAgICAgICAgICAgZmlyc3ROYW1lLCBsYXN0TmFtZSwgZW1haWwsIHBhc3N3b3JkLCBwaG9uZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZGJUcmFuc2FjdGlvbk9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgICAgICAgdXNlVHJhbnNhY3Rpb246IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGRiVHJhbnNhY3Rpb25cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICBjb25zdCBuZXdPcmdhbmlzYXRpb25OYW1lID0gYCR7Zmlyc3ROYW1lfSdzIE9yZ2FuaXNhdGlvbmBcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgbGV0IG9yZ2FuaXNhdGlvbkVudGl0eSA9IGF3YWl0IE9yZ2FuaXNhdGlvbkFjdGlvbnMuZ2V0T3JnYW5pc2F0aW9uUmVjb3JkKHtcbiAgICAgICAgICAgICAgICBpZGVudGlmaWVyOiBuZXdPcmdhbmlzYXRpb25OYW1lLFxuICAgICAgICAgICAgICAgIGlkZW50aWZpZXJUeXBlOiBcIm5hbWVcIlxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgaWYgKCFvcmdhbmlzYXRpb25FbnRpdHkpIHtcbiAgICAgICAgICAgICAgICBvcmdhbmlzYXRpb25FbnRpdHkgPSBhd2FpdCBPcmdhbmlzYXRpb25BY3Rpb25zLmNyZWF0ZU9yZ2FuaXNhdGlvbih7XG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZVBheWxvYWQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IG5ld09yZ2FuaXNhdGlvbk5hbWUsIGRlc2NyaXB0aW9uOiBcIlwiXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGRiVHJhbnNhY3Rpb25PcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VUcmFuc2FjdGlvbjogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRiVHJhbnNhY3Rpb25cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGF3YWl0IGRiVHJhbnNhY3Rpb24uY29tbWl0KClcblxuICAgICAgICAgICAgYXdhaXQgT3JnYW5pc2F0aW9uQWN0aW9ucy5hZGRVc2VyVG9PcmdhbmlzYXRpb24oe1xuICAgICAgICAgICAgICAgIG9yZ0lkOiBvcmdhbmlzYXRpb25FbnRpdHkuaWQsXG4gICAgICAgICAgICAgICAgdXNlcklkOiB1c2VyRW50aXR5LmlkXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICBcblxuICAgICAgICAgICAgY29uc3QgYWNjZXNzVG9rZW4gPSBhd2FpdCBhdXRoLnVzZSgnYXBpJykuYXR0ZW1wdChlbWFpbCxwYXNzd29yZCx7XG4gICAgICAgICAgICAgICAgZXhwaXJlc0luOiBgJHthcHBDb25maWcudG9rZW5FeHBpcnlUaW1lRnJhbWV9IG1pbnV0ZXNgXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICBjb25zdCByZXNwb25zZVBheWxvYWQgPSB1c2VyRW50aXR5LmZvckNsaWVudCgpXG5cbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5zdGF0dXModGhpcy5jcmVhdGVkKS5zZW5kKHtcbiAgICAgICAgICAgICAgICBzdGF0dXM6IFwic3VjY2Vzc1wiLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiUmVnaXN0cmF0aW9uIHN1Y2Nlc3NmdWxcIixcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIGFjY2Vzc1Rva2VuOiBhY2Nlc3NUb2tlbi50b2tlbixcbiAgICAgICAgICAgICAgICAgICAgdXNlcjogcmVzcG9uc2VQYXlsb2FkXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcblxuICAgICAgICB9IGNhdGNoIChVc2VyUmVnaXN0cmF0aW9uc0NvbnRyb2xsZXJFcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJVc2VyUmVnaXN0cmF0aW9uc0NvbnRyb2xsZXJFcnJvciA9PiBcIiwgVXNlclJlZ2lzdHJhdGlvbnNDb250cm9sbGVyRXJyb3IpXG4gICAgICAgICAgICBhd2FpdCBkYlRyYW5zYWN0aW9uLnJvbGxiYWNrKClcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5zdGF0dXModGhpcy5lcnJvcikuc2VuZCh7XG4gICAgICAgICAgICAgICAgc3RhdHVzOiBcIkVycm9yXCIsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogXCJFcnJvciBPY2N1cmVkIENyZWF0aW5nIFVzZXJcIixcbiAgICAgICAgICAgICAgICBzdGF0dXNDb2RlOiB0aGlzLmVycm9yXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfVxufVxuIl19