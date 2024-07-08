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
//# sourceMappingURL=FetchAllUserOrganisationsController.js.map