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
//# sourceMappingURL=CreateNewOrganisationController.js.map