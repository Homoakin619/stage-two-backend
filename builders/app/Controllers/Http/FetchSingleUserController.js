"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserAction_1 = global[Symbol.for('ioc.use')]("App/Actions/UserAction");
const StatusCodes_1 = global[Symbol.for('ioc.use')]("App/Helpers/StatusCodes");
class FetchSingleUserController {
    constructor() {
        this.ok = StatusCodes_1.HttpStatusCodeEnum.OK;
        this.error = StatusCodes_1.HttpStatusCodeEnum.INTERNAL_SERVER_ERROR;
        this.notFound = StatusCodes_1.HttpStatusCodeEnum.NOT_FOUND;
    }
    async handle({ request, response, auth }) {
        try {
            const loggedInUser = auth.user;
            const userId = request.param('id');
            const userEntity = await UserAction_1.UserActions.getOrganisationUserRecord({ identifier: userId, userId: loggedInUser.userId });
            const responsePayload = userEntity?.forClient();
            if (!responsePayload) {
                return response.status(this.notFound).send({
                    status: "Bad Request",
                    message: "No User record found",
                });
            }
            return response.status(this.ok).send({
                status: "success",
                message: "User fetched successfully",
                data: responsePayload
            });
        }
        catch (FetchSingleUserControllerError) {
            console.log("FetchSingleUserControllerError => ", FetchSingleUserControllerError);
            return response.status(this.error).send({
                status: "Error",
                message: "Error Occured Fetching User",
                statusCode: this.error
            });
        }
    }
}
exports.default = FetchSingleUserController;
//# sourceMappingURL=FetchSingleUserController.js.map