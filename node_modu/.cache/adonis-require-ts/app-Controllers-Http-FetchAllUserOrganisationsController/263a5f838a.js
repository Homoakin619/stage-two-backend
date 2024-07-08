"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserAction_1 = global[Symbol.for('ioc.use')]("App/Actions/UserAction");
const StatusCodes_1 = global[Symbol.for('ioc.use')]("App/Helpers/StatusCodes");
class FetchAllUserOrganisationsController {
    constructor() {
        this.ok = StatusCodes_1.HttpStatusCodeEnum.OK;
        this.error = StatusCodes_1.HttpStatusCodeEnum.INTERNAL_SERVER_ERROR;
    }
    async handle({ response, auth }) {
        try {
            const loggedInUser = auth.user;
            const organisations = await UserAction_1.UserActions.fetchUserOrganisations(loggedInUser.userId);
            return response.status(this.ok).send({
                status: "success",
                message: "User organisations fetched successfully",
                data: { organisations }
            });
        }
        catch (FetchAllUserOrganisationsControllerError) {
            console.log("FetchAllUserOrganisationsControllerError => ", FetchAllUserOrganisationsControllerError);
            return response.status(this.error).send({
                status: "Error",
                message: "Error Occured Fetching User Organisations",
                statusCode: this.error
            });
        }
    }
}
exports.default = FetchAllUserOrganisationsController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmV0Y2hBbGxVc2VyT3JnYW5pc2F0aW9uc0NvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJGZXRjaEFsbFVzZXJPcmdhbmlzYXRpb25zQ29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLDZFQUFxRDtBQUVyRCwrRUFBNkQ7QUFHN0QsTUFBcUIsbUNBQW1DO0lBQXhEO1FBR1ksT0FBRSxHQUFHLGdDQUFrQixDQUFDLEVBQUUsQ0FBQTtRQUMxQixVQUFLLEdBQUcsZ0NBQWtCLENBQUMscUJBQXFCLENBQUE7SUEwQjVELENBQUM7SUF4QlUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQXVCO1FBRXZELElBQUk7WUFFQSxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsSUFBSyxDQUFBO1lBRS9CLE1BQU0sYUFBYSxHQUFHLE1BQU0sd0JBQVcsQ0FBQyxzQkFBc0IsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUE7WUFFbkYsT0FBTyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0JBQ2pDLE1BQU0sRUFBRSxTQUFTO2dCQUNqQixPQUFPLEVBQUUseUNBQXlDO2dCQUNsRCxJQUFJLEVBQUUsRUFBQyxhQUFhLEVBQUM7YUFDeEIsQ0FBQyxDQUFBO1NBRUw7UUFBQyxPQUFPLHdDQUF3QyxFQUFFO1lBQy9DLE9BQU8sQ0FBQyxHQUFHLENBQUMsOENBQThDLEVBQUUsd0NBQXdDLENBQUMsQ0FBQTtZQUVyRyxPQUFPLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDcEMsTUFBTSxFQUFFLE9BQU87Z0JBQ2YsT0FBTyxFQUFFLDJDQUEyQztnQkFDcEQsVUFBVSxFQUFFLElBQUksQ0FBQyxLQUFLO2FBQ3pCLENBQUMsQ0FBQTtTQUNMO0lBQ0wsQ0FBQztDQUNKO0FBOUJELHNEQThCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHsgSHR0cENvbnRleHRDb250cmFjdCB9IGZyb20gJ0Bpb2M6QWRvbmlzL0NvcmUvSHR0cENvbnRleHQnXG5pbXBvcnQgeyBVc2VyQWN0aW9ucyB9IGZyb20gJ0FwcC9BY3Rpb25zL1VzZXJBY3Rpb24nO1xuXG5pbXBvcnQgeyBIdHRwU3RhdHVzQ29kZUVudW0gfSBmcm9tIFwiQXBwL0hlbHBlcnMvU3RhdHVzQ29kZXNcIjtcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGZXRjaEFsbFVzZXJPcmdhbmlzYXRpb25zQ29udHJvbGxlciB7XG5cbiAgICBcbiAgICBwcml2YXRlIG9rID0gSHR0cFN0YXR1c0NvZGVFbnVtLk9LXG4gICAgcHJpdmF0ZSBlcnJvciA9IEh0dHBTdGF0dXNDb2RlRW51bS5JTlRFUk5BTF9TRVJWRVJfRVJST1JcblxuICAgIHB1YmxpYyBhc3luYyBoYW5kbGUoeyByZXNwb25zZSwgYXV0aCB9OiBIdHRwQ29udGV4dENvbnRyYWN0KSB7XG4gICAgICAgIFxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjb25zdCBsb2dnZWRJblVzZXIgPSBhdXRoLnVzZXIhXG5cbiAgICAgICAgICAgIGNvbnN0IG9yZ2FuaXNhdGlvbnMgPSBhd2FpdCBVc2VyQWN0aW9ucy5mZXRjaFVzZXJPcmdhbmlzYXRpb25zKGxvZ2dlZEluVXNlci51c2VySWQpXG5cbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5zdGF0dXModGhpcy5vaykuc2VuZCh7XG4gICAgICAgICAgICAgICAgc3RhdHVzOiBcInN1Y2Nlc3NcIixcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIlVzZXIgb3JnYW5pc2F0aW9ucyBmZXRjaGVkIHN1Y2Nlc3NmdWxseVwiLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtvcmdhbmlzYXRpb25zfVxuICAgICAgICAgICAgfSlcblxuICAgICAgICB9IGNhdGNoIChGZXRjaEFsbFVzZXJPcmdhbmlzYXRpb25zQ29udHJvbGxlckVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkZldGNoQWxsVXNlck9yZ2FuaXNhdGlvbnNDb250cm9sbGVyRXJyb3IgPT4gXCIsIEZldGNoQWxsVXNlck9yZ2FuaXNhdGlvbnNDb250cm9sbGVyRXJyb3IpXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5zdGF0dXModGhpcy5lcnJvcikuc2VuZCh7XG4gICAgICAgICAgICAgICAgc3RhdHVzOiBcIkVycm9yXCIsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogXCJFcnJvciBPY2N1cmVkIEZldGNoaW5nIFVzZXIgT3JnYW5pc2F0aW9uc1wiLFxuICAgICAgICAgICAgICAgIHN0YXR1c0NvZGU6IHRoaXMuZXJyb3JcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=