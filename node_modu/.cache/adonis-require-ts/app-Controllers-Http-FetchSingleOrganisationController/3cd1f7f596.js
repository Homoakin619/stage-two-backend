"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserAction_1 = global[Symbol.for('ioc.use')]("App/Actions/UserAction");
const StatusCodes_1 = global[Symbol.for('ioc.use')]("App/Helpers/StatusCodes");
class FetchSingleOrganisationController {
    constructor() {
        this.ok = StatusCodes_1.HttpStatusCodeEnum.OK;
        this.error = StatusCodes_1.HttpStatusCodeEnum.INTERNAL_SERVER_ERROR;
        this.notFound = StatusCodes_1.HttpStatusCodeEnum.NOT_FOUND;
    }
    async handle({ request, response, auth }) {
        try {
            const loggedInUser = auth.user;
            const orgId = request.param('orgId');
            const userOrganisations = await UserAction_1.UserActions.fetchUserOrganisations(loggedInUser.userId);
            const organisation = userOrganisations.find(item => (item.orgId === orgId));
            if (!organisation) {
                return response.status(this.notFound).send({
                    status: "Bad Request",
                    message: "Organisation record not found",
                    data: organisation
                });
            }
            return response.status(this.ok).send({
                status: "success",
                message: "Organisation fetched successfully",
                data: organisation
            });
        }
        catch (FetchSingleOrganisationControllerError) {
            console.log("FetchSingleOrganisationControllerError => ", FetchSingleOrganisationControllerError);
            return response.status(this.error).send({
                status: "Error",
                message: "Error Occured Fetching Organisation",
                statusCode: this.error
            });
        }
    }
}
exports.default = FetchSingleOrganisationController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmV0Y2hTaW5nbGVPcmdhbmlzYXRpb25Db250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiRmV0Y2hTaW5nbGVPcmdhbmlzYXRpb25Db250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsNkVBQXFEO0FBRXJELCtFQUE2RDtBQUc3RCxNQUFxQixpQ0FBaUM7SUFBdEQ7UUFHWSxPQUFFLEdBQUcsZ0NBQWtCLENBQUMsRUFBRSxDQUFBO1FBQzFCLFVBQUssR0FBRyxnQ0FBa0IsQ0FBQyxxQkFBcUIsQ0FBQTtRQUNoRCxhQUFRLEdBQUcsZ0NBQWtCLENBQUMsU0FBUyxDQUFBO0lBb0NuRCxDQUFDO0lBbENVLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBdUI7UUFFaEUsSUFBSTtZQUVBLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxJQUFLLENBQUE7WUFDL0IsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQTtZQUVwQyxNQUFNLGlCQUFpQixHQUFHLE1BQU0sd0JBQVcsQ0FBQyxzQkFBc0IsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUE7WUFDdkYsTUFBTSxZQUFZLEdBQUcsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFFNUUsSUFBRyxDQUFDLFlBQVksRUFBRTtnQkFDZCxPQUFPLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQztvQkFDdkMsTUFBTSxFQUFFLGFBQWE7b0JBQ3JCLE9BQU8sRUFBRSwrQkFBK0I7b0JBQ3hDLElBQUksRUFBRSxZQUFZO2lCQUNyQixDQUFDLENBQUE7YUFDTDtZQUVELE9BQU8sUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUNqQyxNQUFNLEVBQUUsU0FBUztnQkFDakIsT0FBTyxFQUFFLG1DQUFtQztnQkFDNUMsSUFBSSxFQUFFLFlBQVk7YUFDckIsQ0FBQyxDQUFBO1NBRUw7UUFBQyxPQUFPLHNDQUFzQyxFQUFFO1lBQzdDLE9BQU8sQ0FBQyxHQUFHLENBQUMsNENBQTRDLEVBQUUsc0NBQXNDLENBQUMsQ0FBQTtZQUVqRyxPQUFPLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDcEMsTUFBTSxFQUFFLE9BQU87Z0JBQ2YsT0FBTyxFQUFFLHFDQUFxQztnQkFDOUMsVUFBVSxFQUFFLElBQUksQ0FBQyxLQUFLO2FBQ3pCLENBQUMsQ0FBQTtTQUNMO0lBQ0wsQ0FBQztDQUNKO0FBekNELG9EQXlDQyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHR5cGUgeyBIdHRwQ29udGV4dENvbnRyYWN0IH0gZnJvbSAnQGlvYzpBZG9uaXMvQ29yZS9IdHRwQ29udGV4dCdcbmltcG9ydCB7IFVzZXJBY3Rpb25zIH0gZnJvbSAnQXBwL0FjdGlvbnMvVXNlckFjdGlvbic7XG5cbmltcG9ydCB7IEh0dHBTdGF0dXNDb2RlRW51bSB9IGZyb20gXCJBcHAvSGVscGVycy9TdGF0dXNDb2Rlc1wiO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZldGNoU2luZ2xlT3JnYW5pc2F0aW9uQ29udHJvbGxlciB7XG5cbiAgICBcbiAgICBwcml2YXRlIG9rID0gSHR0cFN0YXR1c0NvZGVFbnVtLk9LXG4gICAgcHJpdmF0ZSBlcnJvciA9IEh0dHBTdGF0dXNDb2RlRW51bS5JTlRFUk5BTF9TRVJWRVJfRVJST1JcbiAgICBwcml2YXRlIG5vdEZvdW5kID0gSHR0cFN0YXR1c0NvZGVFbnVtLk5PVF9GT1VORFxuXG4gICAgcHVibGljIGFzeW5jIGhhbmRsZSh7IHJlcXVlc3QsIHJlc3BvbnNlLCBhdXRoIH06IEh0dHBDb250ZXh0Q29udHJhY3QpIHtcbiAgICAgICAgXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnN0IGxvZ2dlZEluVXNlciA9IGF1dGgudXNlciFcbiAgICAgICAgICAgIGNvbnN0IG9yZ0lkID0gcmVxdWVzdC5wYXJhbSgnb3JnSWQnKVxuXG4gICAgICAgICAgICBjb25zdCB1c2VyT3JnYW5pc2F0aW9ucyA9IGF3YWl0IFVzZXJBY3Rpb25zLmZldGNoVXNlck9yZ2FuaXNhdGlvbnMobG9nZ2VkSW5Vc2VyLnVzZXJJZClcbiAgICAgICAgICAgIGNvbnN0IG9yZ2FuaXNhdGlvbiA9IHVzZXJPcmdhbmlzYXRpb25zLmZpbmQoaXRlbSA9PiAoaXRlbS5vcmdJZCA9PT0gb3JnSWQpKTtcblxuICAgICAgICAgICAgaWYoIW9yZ2FuaXNhdGlvbikge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5zdGF0dXModGhpcy5ub3RGb3VuZCkuc2VuZCh7XG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogXCJCYWQgUmVxdWVzdFwiLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIk9yZ2FuaXNhdGlvbiByZWNvcmQgbm90IGZvdW5kXCIsXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IG9yZ2FuaXNhdGlvblxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5zdGF0dXModGhpcy5vaykuc2VuZCh7XG4gICAgICAgICAgICAgICAgc3RhdHVzOiBcInN1Y2Nlc3NcIixcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIk9yZ2FuaXNhdGlvbiBmZXRjaGVkIHN1Y2Nlc3NmdWxseVwiLFxuICAgICAgICAgICAgICAgIGRhdGE6IG9yZ2FuaXNhdGlvblxuICAgICAgICAgICAgfSlcblxuICAgICAgICB9IGNhdGNoIChGZXRjaFNpbmdsZU9yZ2FuaXNhdGlvbkNvbnRyb2xsZXJFcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJGZXRjaFNpbmdsZU9yZ2FuaXNhdGlvbkNvbnRyb2xsZXJFcnJvciA9PiBcIiwgRmV0Y2hTaW5nbGVPcmdhbmlzYXRpb25Db250cm9sbGVyRXJyb3IpXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5zdGF0dXModGhpcy5lcnJvcikuc2VuZCh7XG4gICAgICAgICAgICAgICAgc3RhdHVzOiBcIkVycm9yXCIsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogXCJFcnJvciBPY2N1cmVkIEZldGNoaW5nIE9yZ2FuaXNhdGlvblwiLFxuICAgICAgICAgICAgICAgIHN0YXR1c0NvZGU6IHRoaXMuZXJyb3JcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=