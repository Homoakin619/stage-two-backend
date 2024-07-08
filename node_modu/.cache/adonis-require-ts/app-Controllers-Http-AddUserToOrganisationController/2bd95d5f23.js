"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const OrganisationAction_1 = global[Symbol.for('ioc.use')]("App/Actions/OrganisationAction");
const UserAction_1 = global[Symbol.for('ioc.use')]("App/Actions/UserAction");
const ErrorHandler_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Helpers/ErrorHandler"));
const StatusCodes_1 = global[Symbol.for('ioc.use')]("App/Helpers/StatusCodes");
const AddUserToOrganisationValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/AddUserToOrganisationValidator"));
class AddUserToOrganisationController {
    constructor() {
        this.error = StatusCodes_1.HttpStatusCodeEnum.INTERNAL_SERVER_ERROR;
        this.unprocessableEntity = StatusCodes_1.HttpStatusCodeEnum.UNPROCESSABLE_ENTITY;
        this.ok = StatusCodes_1.HttpStatusCodeEnum.OK;
        this.badRequest = StatusCodes_1.HttpStatusCodeEnum.BAD_REQUEST;
    }
    async handle({ request, response, auth }) {
        try {
            try {
                await request.validate(AddUserToOrganisationValidator_1.default);
            }
            catch (validationError) {
                return response.status(this.unprocessableEntity).send({
                    errors: (0, ErrorHandler_1.default)(validationError.messages.errors)
                });
            }
            const loggedInUser = auth.user;
            const orgId = request.param("orgId");
            const { userId } = request.body();
            const userOrganisations = await UserAction_1.UserActions.fetchUserOrganisations(loggedInUser.userId);
            const organisationExists = userOrganisations.find(organisation => organisation.orgId === orgId);
            if (!organisationExists) {
                return response.status(this.badRequest).send({
                    status: "Bad Request",
                    message: "Organisation not found for user",
                    statusCode: this.badRequest
                });
            }
            const userOrganisation = await OrganisationAction_1.OrganisationActions.getOrganisationRecord({
                identifier: organisationExists.orgId,
                identifierType: 'orgId'
            });
            const userExists = await UserAction_1.UserActions.getUserRecord({
                identifier: userId,
                identifierType: 'userId'
            });
            if (!userExists) {
                return response.status(this.badRequest).send({
                    status: "Bad Request",
                    message: "Invalid userId provided"
                });
            }
            await OrganisationAction_1.OrganisationActions.addUserToOrganisation({ userId: userExists.id, orgId: userOrganisation.id });
            return response.status(this.ok).send({
                status: "success",
                message: "User added to organisation successfully",
            });
        }
        catch (AddUserToOrganisationControllerError) {
            console.log("AddUserToOrganisationControllerError => ", AddUserToOrganisationControllerError);
            return response.status(this.error).send({
                status: "Error",
                message: "Error Occured Adding User",
                statusCode: this.error
            });
        }
    }
}
exports.default = AddUserToOrganisationController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWRkVXNlclRvT3JnYW5pc2F0aW9uQ29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkFkZFVzZXJUb09yZ2FuaXNhdGlvbkNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSw2RkFBcUU7QUFDckUsNkVBQXFEO0FBQ3JELGtHQUFvRDtBQUNwRCwrRUFBNkQ7QUFDN0QseUlBQTJGO0FBRzNGLE1BQXFCLCtCQUErQjtJQUFwRDtRQUVZLFVBQUssR0FBRyxnQ0FBa0IsQ0FBQyxxQkFBcUIsQ0FBQTtRQUNoRCx3QkFBbUIsR0FBRyxnQ0FBa0IsQ0FBQyxvQkFBb0IsQ0FBQTtRQUM3RCxPQUFFLEdBQUcsZ0NBQWtCLENBQUMsRUFBRSxDQUFBO1FBQzFCLGVBQVUsR0FBRyxnQ0FBa0IsQ0FBQyxXQUFXLENBQUE7SUFpRXZELENBQUM7SUEvRFUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUF1QjtRQUVoRSxJQUFJO1lBQ0EsSUFBSTtnQkFDQSxNQUFNLE9BQU8sQ0FBQyxRQUFRLENBQUMsd0NBQThCLENBQUMsQ0FBQTthQUV6RDtZQUFDLE9BQU8sZUFBZSxFQUFFO2dCQUN0QixPQUFPLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsSUFBSSxDQUFDO29CQUNsRCxNQUFNLEVBQUUsSUFBQSxzQkFBWSxFQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO2lCQUN0RCxDQUFDLENBQUE7YUFDUDtZQUVELE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxJQUFLLENBQUE7WUFDL0IsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQTtZQUNwQyxNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFBO1lBRWpDLE1BQU0saUJBQWlCLEdBQUcsTUFBTSx3QkFBVyxDQUFDLHNCQUFzQixDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQTtZQUN2RixNQUFNLGtCQUFrQixHQUFHLGlCQUFpQixDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxLQUFLLEtBQUssS0FBSyxDQUFDLENBQUE7WUFFL0YsSUFBSSxDQUFDLGtCQUFrQixFQUFFO2dCQUNyQixPQUFPLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQztvQkFDekMsTUFBTSxFQUFFLGFBQWE7b0JBQ3JCLE9BQU8sRUFBRSxpQ0FBaUM7b0JBQzFDLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVTtpQkFDOUIsQ0FBQyxDQUFBO2FBQ0w7WUFFRCxNQUFNLGdCQUFnQixHQUFHLE1BQU0sd0NBQW1CLENBQUMscUJBQXFCLENBQUM7Z0JBQ3JFLFVBQVUsRUFBRSxrQkFBa0IsQ0FBQyxLQUFLO2dCQUNwQyxjQUFjLEVBQUUsT0FBTzthQUMxQixDQUFDLENBQUE7WUFFRixNQUFNLFVBQVUsR0FBRyxNQUFNLHdCQUFXLENBQUMsYUFBYSxDQUFDO2dCQUMvQyxVQUFVLEVBQUUsTUFBTTtnQkFDbEIsY0FBYyxFQUFFLFFBQVE7YUFDM0IsQ0FBQyxDQUFBO1lBRUYsSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFDYixPQUFPLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQztvQkFDekMsTUFBTSxFQUFFLGFBQWE7b0JBQ3JCLE9BQU8sRUFBRSx5QkFBeUI7aUJBQ3JDLENBQUMsQ0FBQTthQUNMO1lBRUQsTUFBTSx3Q0FBbUIsQ0FBQyxxQkFBcUIsQ0FBQyxFQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsRUFBRSxFQUFFLEtBQUssRUFBRSxnQkFBaUIsQ0FBQyxFQUFFLEVBQUMsQ0FBQyxDQUFBO1lBRXJHLE9BQU8sUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUNqQyxNQUFNLEVBQUUsU0FBUztnQkFDakIsT0FBTyxFQUFFLHlDQUF5QzthQUNyRCxDQUNBLENBQUE7U0FFSjtRQUFDLE9BQU8sb0NBQW9DLEVBQUU7WUFFM0MsT0FBTyxDQUFDLEdBQUcsQ0FBQywwQ0FBMEMsRUFBRSxvQ0FBb0MsQ0FBQyxDQUFBO1lBRTdGLE9BQU8sUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUNwQyxNQUFNLEVBQUUsT0FBTztnQkFDZixPQUFPLEVBQUUsMkJBQTJCO2dCQUNwQyxVQUFVLEVBQUUsSUFBSSxDQUFDLEtBQUs7YUFDekIsQ0FBQyxDQUFBO1NBQ0w7SUFDTCxDQUFDO0NBQ0o7QUF0RUQsa0RBc0VDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUgeyBIdHRwQ29udGV4dENvbnRyYWN0IH0gZnJvbSAnQGlvYzpBZG9uaXMvQ29yZS9IdHRwQ29udGV4dCdcbmltcG9ydCB7IE9yZ2FuaXNhdGlvbkFjdGlvbnMgfSBmcm9tICdBcHAvQWN0aW9ucy9PcmdhbmlzYXRpb25BY3Rpb24nO1xuaW1wb3J0IHsgVXNlckFjdGlvbnMgfSBmcm9tICdBcHAvQWN0aW9ucy9Vc2VyQWN0aW9uJztcbmltcG9ydCBwcm9jZXNzRXJyb3IgZnJvbSAnQXBwL0hlbHBlcnMvRXJyb3JIYW5kbGVyJztcbmltcG9ydCB7IEh0dHBTdGF0dXNDb2RlRW51bSB9IGZyb20gXCJBcHAvSGVscGVycy9TdGF0dXNDb2Rlc1wiO1xuaW1wb3J0IEFkZFVzZXJUb09yZ2FuaXNhdGlvblZhbGlkYXRvciBmcm9tICdBcHAvVmFsaWRhdG9ycy9BZGRVc2VyVG9PcmdhbmlzYXRpb25WYWxpZGF0b3InO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFkZFVzZXJUb09yZ2FuaXNhdGlvbkNvbnRyb2xsZXIge1xuXG4gICAgcHJpdmF0ZSBlcnJvciA9IEh0dHBTdGF0dXNDb2RlRW51bS5JTlRFUk5BTF9TRVJWRVJfRVJST1JcbiAgICBwcml2YXRlIHVucHJvY2Vzc2FibGVFbnRpdHkgPSBIdHRwU3RhdHVzQ29kZUVudW0uVU5QUk9DRVNTQUJMRV9FTlRJVFlcbiAgICBwcml2YXRlIG9rID0gSHR0cFN0YXR1c0NvZGVFbnVtLk9LXG4gICAgcHJpdmF0ZSBiYWRSZXF1ZXN0ID0gSHR0cFN0YXR1c0NvZGVFbnVtLkJBRF9SRVFVRVNUXG5cbiAgICBwdWJsaWMgYXN5bmMgaGFuZGxlKHsgcmVxdWVzdCwgcmVzcG9uc2UsIGF1dGggfTogSHR0cENvbnRleHRDb250cmFjdCkge1xuICAgICAgICBcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgYXdhaXQgcmVxdWVzdC52YWxpZGF0ZShBZGRVc2VyVG9PcmdhbmlzYXRpb25WYWxpZGF0b3IpXG5cbiAgICAgICAgICAgIH0gY2F0Y2ggKHZhbGlkYXRpb25FcnJvcikge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5zdGF0dXModGhpcy51bnByb2Nlc3NhYmxlRW50aXR5KS5zZW5kKHtcbiAgICAgICAgICAgICAgICAgICAgZXJyb3JzOiBwcm9jZXNzRXJyb3IodmFsaWRhdGlvbkVycm9yLm1lc3NhZ2VzLmVycm9ycylcbiAgICAgICAgICAgICAgICAgIH0pICBcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgbG9nZ2VkSW5Vc2VyID0gYXV0aC51c2VyIVxuICAgICAgICAgICAgY29uc3Qgb3JnSWQgPSByZXF1ZXN0LnBhcmFtKFwib3JnSWRcIilcbiAgICAgICAgICAgIGNvbnN0IHsgdXNlcklkIH0gPSByZXF1ZXN0LmJvZHkoKVxuXG4gICAgICAgICAgICBjb25zdCB1c2VyT3JnYW5pc2F0aW9ucyA9IGF3YWl0IFVzZXJBY3Rpb25zLmZldGNoVXNlck9yZ2FuaXNhdGlvbnMobG9nZ2VkSW5Vc2VyLnVzZXJJZClcbiAgICAgICAgICAgIGNvbnN0IG9yZ2FuaXNhdGlvbkV4aXN0cyA9IHVzZXJPcmdhbmlzYXRpb25zLmZpbmQob3JnYW5pc2F0aW9uID0+IG9yZ2FuaXNhdGlvbi5vcmdJZCA9PT0gb3JnSWQpXG5cbiAgICAgICAgICAgIGlmICghb3JnYW5pc2F0aW9uRXhpc3RzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLnN0YXR1cyh0aGlzLmJhZFJlcXVlc3QpLnNlbmQoe1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IFwiQmFkIFJlcXVlc3RcIixcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXCJPcmdhbmlzYXRpb24gbm90IGZvdW5kIGZvciB1c2VyXCIsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1c0NvZGU6IHRoaXMuYmFkUmVxdWVzdFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IHVzZXJPcmdhbmlzYXRpb24gPSBhd2FpdCBPcmdhbmlzYXRpb25BY3Rpb25zLmdldE9yZ2FuaXNhdGlvblJlY29yZCh7XG4gICAgICAgICAgICAgICAgaWRlbnRpZmllcjogb3JnYW5pc2F0aW9uRXhpc3RzLm9yZ0lkLFxuICAgICAgICAgICAgICAgIGlkZW50aWZpZXJUeXBlOiAnb3JnSWQnXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICBjb25zdCB1c2VyRXhpc3RzID0gYXdhaXQgVXNlckFjdGlvbnMuZ2V0VXNlclJlY29yZCh7XG4gICAgICAgICAgICAgICAgaWRlbnRpZmllcjogdXNlcklkLFxuICAgICAgICAgICAgICAgIGlkZW50aWZpZXJUeXBlOiAndXNlcklkJ1xuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgaWYgKCF1c2VyRXhpc3RzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLnN0YXR1cyh0aGlzLmJhZFJlcXVlc3QpLnNlbmQoe1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IFwiQmFkIFJlcXVlc3RcIixcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXCJJbnZhbGlkIHVzZXJJZCBwcm92aWRlZFwiXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYXdhaXQgT3JnYW5pc2F0aW9uQWN0aW9ucy5hZGRVc2VyVG9PcmdhbmlzYXRpb24oe3VzZXJJZDogdXNlckV4aXN0cy5pZCwgb3JnSWQ6IHVzZXJPcmdhbmlzYXRpb24hLmlkfSlcblxuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLnN0YXR1cyh0aGlzLm9rKS5zZW5kKHtcbiAgICAgICAgICAgICAgICBzdGF0dXM6IFwic3VjY2Vzc1wiLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiVXNlciBhZGRlZCB0byBvcmdhbmlzYXRpb24gc3VjY2Vzc2Z1bGx5XCIsXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICApXG5cbiAgICAgICAgfSBjYXRjaCAoQWRkVXNlclRvT3JnYW5pc2F0aW9uQ29udHJvbGxlckVycm9yKSB7XG4gICAgICAgIFxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJBZGRVc2VyVG9PcmdhbmlzYXRpb25Db250cm9sbGVyRXJyb3IgPT4gXCIsIEFkZFVzZXJUb09yZ2FuaXNhdGlvbkNvbnRyb2xsZXJFcnJvcilcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLnN0YXR1cyh0aGlzLmVycm9yKS5zZW5kKHtcbiAgICAgICAgICAgICAgICBzdGF0dXM6IFwiRXJyb3JcIixcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIkVycm9yIE9jY3VyZWQgQWRkaW5nIFVzZXJcIixcbiAgICAgICAgICAgICAgICBzdGF0dXNDb2RlOiB0aGlzLmVycm9yXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfVxufVxuXG4iXX0=