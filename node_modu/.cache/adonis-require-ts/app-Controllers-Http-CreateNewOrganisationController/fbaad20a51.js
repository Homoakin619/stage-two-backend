"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
const OrganisationAction_1 = global[Symbol.for('ioc.use')]("App/Actions/OrganisationAction");
const ErrorHandler_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Helpers/ErrorHandler"));
const StatusCodes_1 = global[Symbol.for('ioc.use')]("App/Helpers/StatusCodes");
const CreateNewOrganisationValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/CreateNewOrganisationValidator"));
class CreateNewOrganisationController {
    constructor() {
        this.error = StatusCodes_1.HttpStatusCodeEnum.INTERNAL_SERVER_ERROR;
        this.unprocessableEntity = StatusCodes_1.HttpStatusCodeEnum.UNPROCESSABLE_ENTITY;
        this.created = StatusCodes_1.HttpStatusCodeEnum.CREATED;
    }
    async handle({ request, response, auth }) {
        const dbTransaction = await Database_1.default.transaction();
        try {
            try {
                await request.validate(CreateNewOrganisationValidator_1.default);
            }
            catch (validationError) {
                return response.status(this.unprocessableEntity).send({
                    errors: (0, ErrorHandler_1.default)(validationError.messages.errors)
                });
            }
            const loggedInUser = auth.user;
            const { name, description } = request.body();
            const newOrganisation = await OrganisationAction_1.OrganisationActions.createOrganisation({
                createPayload: { name, description: description || "" },
                dbTransactionOptions: {
                    useTransaction: false,
                }
            });
            await OrganisationAction_1.OrganisationActions.addUserToOrganisation({ userId: loggedInUser.id, orgId: newOrganisation.id });
            return response.status(this.created).send({
                status: "success",
                message: "Organisation created successfully",
                data: newOrganisation.forClient()
            });
        }
        catch (CreateNewOrganisationControllerError) {
            await dbTransaction.rollback();
            console.log("CreateNewOrganisationControllerError => ", CreateNewOrganisationControllerError);
            return response.status(this.error).send({
                status: "Error",
                message: "Error Occured Creating Organisation",
                statusCode: this.error
            });
        }
    }
}
exports.default = CreateNewOrganisationController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ3JlYXRlTmV3T3JnYW5pc2F0aW9uQ29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkNyZWF0ZU5ld09yZ2FuaXNhdGlvbkNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSwyRkFBa0Q7QUFDbEQsNkZBQXFFO0FBQ3JFLGtHQUFvRDtBQUNwRCwrRUFBNkQ7QUFDN0QseUlBQTJGO0FBRzNGLE1BQXFCLCtCQUErQjtJQUFwRDtRQUVZLFVBQUssR0FBRyxnQ0FBa0IsQ0FBQyxxQkFBcUIsQ0FBQTtRQUNoRCx3QkFBbUIsR0FBRyxnQ0FBa0IsQ0FBQyxvQkFBb0IsQ0FBQTtRQUM3RCxZQUFPLEdBQUcsZ0NBQWtCLENBQUMsT0FBTyxDQUFBO0lBMkNoRCxDQUFDO0lBekNVLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBdUI7UUFDaEUsTUFBTSxhQUFhLEdBQUcsTUFBTSxrQkFBUSxDQUFDLFdBQVcsRUFBRSxDQUFBO1FBQ2xELElBQUk7WUFDQSxJQUFJO2dCQUNBLE1BQU0sT0FBTyxDQUFDLFFBQVEsQ0FBQyx3Q0FBOEIsQ0FBQyxDQUFBO2FBRXpEO1lBQUMsT0FBTyxlQUFlLEVBQUU7Z0JBQ3RCLE9BQU8sUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxJQUFJLENBQUM7b0JBQ2xELE1BQU0sRUFBRSxJQUFBLHNCQUFZLEVBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7aUJBQ3RELENBQUMsQ0FBQTthQUNQO1lBRUQsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLElBQUssQ0FBQTtZQUMvQixNQUFNLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxHQUFHLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQTtZQUU1QyxNQUFNLGVBQWUsR0FBRyxNQUFNLHdDQUFtQixDQUFDLGtCQUFrQixDQUFDO2dCQUNqRSxhQUFhLEVBQUUsRUFBQyxJQUFJLEVBQUUsV0FBVyxFQUFFLFdBQVcsSUFBSSxFQUFFLEVBQUU7Z0JBQ3RELG9CQUFvQixFQUFFO29CQUNsQixjQUFjLEVBQUUsS0FBSztpQkFDeEI7YUFDSixDQUFDLENBQUE7WUFFRixNQUFNLHdDQUFtQixDQUFDLHFCQUFxQixDQUFDLEVBQUMsTUFBTSxFQUFFLFlBQVksQ0FBQyxFQUFFLEVBQUUsS0FBSyxFQUFFLGVBQWUsQ0FBQyxFQUFFLEVBQUMsQ0FBQyxDQUFBO1lBRXJHLE9BQU8sUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUN0QyxNQUFNLEVBQUUsU0FBUztnQkFDakIsT0FBTyxFQUFFLG1DQUFtQztnQkFDNUMsSUFBSSxFQUFFLGVBQWUsQ0FBQyxTQUFTLEVBQUU7YUFDcEMsQ0FBQyxDQUFBO1NBRUw7UUFBQyxPQUFPLG9DQUFvQyxFQUFFO1lBQzNDLE1BQU0sYUFBYSxDQUFDLFFBQVEsRUFBRSxDQUFBO1lBQzlCLE9BQU8sQ0FBQyxHQUFHLENBQUMsMENBQTBDLEVBQUUsb0NBQW9DLENBQUMsQ0FBQTtZQUU3RixPQUFPLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDcEMsTUFBTSxFQUFFLE9BQU87Z0JBQ2YsT0FBTyxFQUFFLHFDQUFxQztnQkFDOUMsVUFBVSxFQUFFLElBQUksQ0FBQyxLQUFLO2FBQ3pCLENBQUMsQ0FBQTtTQUNMO0lBQ0wsQ0FBQztDQUNKO0FBL0NELGtEQStDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHsgSHR0cENvbnRleHRDb250cmFjdCB9IGZyb20gJ0Bpb2M6QWRvbmlzL0NvcmUvSHR0cENvbnRleHQnXG5pbXBvcnQgRGF0YWJhc2UgZnJvbSAnQGlvYzpBZG9uaXMvTHVjaWQvRGF0YWJhc2UnO1xuaW1wb3J0IHsgT3JnYW5pc2F0aW9uQWN0aW9ucyB9IGZyb20gJ0FwcC9BY3Rpb25zL09yZ2FuaXNhdGlvbkFjdGlvbic7XG5pbXBvcnQgcHJvY2Vzc0Vycm9yIGZyb20gJ0FwcC9IZWxwZXJzL0Vycm9ySGFuZGxlcic7XG5pbXBvcnQgeyBIdHRwU3RhdHVzQ29kZUVudW0gfSBmcm9tIFwiQXBwL0hlbHBlcnMvU3RhdHVzQ29kZXNcIjtcbmltcG9ydCBDcmVhdGVOZXdPcmdhbmlzYXRpb25WYWxpZGF0b3IgZnJvbSAnQXBwL1ZhbGlkYXRvcnMvQ3JlYXRlTmV3T3JnYW5pc2F0aW9uVmFsaWRhdG9yJztcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDcmVhdGVOZXdPcmdhbmlzYXRpb25Db250cm9sbGVyIHtcblxuICAgIHByaXZhdGUgZXJyb3IgPSBIdHRwU3RhdHVzQ29kZUVudW0uSU5URVJOQUxfU0VSVkVSX0VSUk9SXG4gICAgcHJpdmF0ZSB1bnByb2Nlc3NhYmxlRW50aXR5ID0gSHR0cFN0YXR1c0NvZGVFbnVtLlVOUFJPQ0VTU0FCTEVfRU5USVRZXG4gICAgcHJpdmF0ZSBjcmVhdGVkID0gSHR0cFN0YXR1c0NvZGVFbnVtLkNSRUFURURcblxuICAgIHB1YmxpYyBhc3luYyBoYW5kbGUoeyByZXF1ZXN0LCByZXNwb25zZSwgYXV0aCB9OiBIdHRwQ29udGV4dENvbnRyYWN0KSB7XG4gICAgICAgIGNvbnN0IGRiVHJhbnNhY3Rpb24gPSBhd2FpdCBEYXRhYmFzZS50cmFuc2FjdGlvbigpXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGF3YWl0IHJlcXVlc3QudmFsaWRhdGUoQ3JlYXRlTmV3T3JnYW5pc2F0aW9uVmFsaWRhdG9yKVxuXG4gICAgICAgICAgICB9IGNhdGNoICh2YWxpZGF0aW9uRXJyb3IpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2Uuc3RhdHVzKHRoaXMudW5wcm9jZXNzYWJsZUVudGl0eSkuc2VuZCh7XG4gICAgICAgICAgICAgICAgICAgIGVycm9yczogcHJvY2Vzc0Vycm9yKHZhbGlkYXRpb25FcnJvci5tZXNzYWdlcy5lcnJvcnMpXG4gICAgICAgICAgICAgICAgICB9KSAgXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnN0IGxvZ2dlZEluVXNlciA9IGF1dGgudXNlciFcbiAgICAgICAgICAgIGNvbnN0IHsgbmFtZSwgZGVzY3JpcHRpb24gfSA9IHJlcXVlc3QuYm9keSgpXG5cbiAgICAgICAgICAgIGNvbnN0IG5ld09yZ2FuaXNhdGlvbiA9IGF3YWl0IE9yZ2FuaXNhdGlvbkFjdGlvbnMuY3JlYXRlT3JnYW5pc2F0aW9uKHtcbiAgICAgICAgICAgICAgICBjcmVhdGVQYXlsb2FkOiB7bmFtZSwgZGVzY3JpcHRpb246IGRlc2NyaXB0aW9uIHx8IFwiXCIgfSxcbiAgICAgICAgICAgICAgICBkYlRyYW5zYWN0aW9uT3B0aW9uczoge1xuICAgICAgICAgICAgICAgICAgICB1c2VUcmFuc2FjdGlvbjogZmFsc2UsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgYXdhaXQgT3JnYW5pc2F0aW9uQWN0aW9ucy5hZGRVc2VyVG9PcmdhbmlzYXRpb24oe3VzZXJJZDogbG9nZ2VkSW5Vc2VyLmlkLCBvcmdJZDogbmV3T3JnYW5pc2F0aW9uLmlkfSlcblxuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLnN0YXR1cyh0aGlzLmNyZWF0ZWQpLnNlbmQoe1xuICAgICAgICAgICAgICAgIHN0YXR1czogXCJzdWNjZXNzXCIsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogXCJPcmdhbmlzYXRpb24gY3JlYXRlZCBzdWNjZXNzZnVsbHlcIixcbiAgICAgICAgICAgICAgICBkYXRhOiBuZXdPcmdhbmlzYXRpb24uZm9yQ2xpZW50KClcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgfSBjYXRjaCAoQ3JlYXRlTmV3T3JnYW5pc2F0aW9uQ29udHJvbGxlckVycm9yKSB7XG4gICAgICAgICAgICBhd2FpdCBkYlRyYW5zYWN0aW9uLnJvbGxiYWNrKClcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ3JlYXRlTmV3T3JnYW5pc2F0aW9uQ29udHJvbGxlckVycm9yID0+IFwiLCBDcmVhdGVOZXdPcmdhbmlzYXRpb25Db250cm9sbGVyRXJyb3IpXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5zdGF0dXModGhpcy5lcnJvcikuc2VuZCh7XG4gICAgICAgICAgICAgICAgc3RhdHVzOiBcIkVycm9yXCIsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogXCJFcnJvciBPY2N1cmVkIENyZWF0aW5nIE9yZ2FuaXNhdGlvblwiLFxuICAgICAgICAgICAgICAgIHN0YXR1c0NvZGU6IHRoaXMuZXJyb3JcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=