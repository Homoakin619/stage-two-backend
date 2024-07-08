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
//# sourceMappingURL=FetchSingleOrganisationController.js.map