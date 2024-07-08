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
//# sourceMappingURL=AddUserToOrganisationController.js.map