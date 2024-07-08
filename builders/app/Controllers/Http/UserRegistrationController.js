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
//# sourceMappingURL=UserRegistrationController.js.map