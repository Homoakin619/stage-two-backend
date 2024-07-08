"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserAction_1 = global[Symbol.for('ioc.use')]("App/Actions/UserAction");
const StatusCodes_1 = global[Symbol.for('ioc.use')]("App/Helpers/StatusCodes");
const UserAuthenticationValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/UserAuthenticationValidator"));
const appConfig_1 = __importDefault(global[Symbol.for('ioc.use')]("Config/appConfig"));
const Hash_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Hash"));
const ErrorHandler_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Helpers/ErrorHandler"));
class UserAuthenticationController {
    constructor() {
        this.unprocessableEntity = StatusCodes_1.HttpStatusCodeEnum.UNPROCESSABLE_ENTITY;
        this.ok = StatusCodes_1.HttpStatusCodeEnum.OK;
        this.unauthorized = StatusCodes_1.HttpStatusCodeEnum.UNAUTHORIZED;
        this.error = StatusCodes_1.HttpStatusCodeEnum.INTERNAL_SERVER_ERROR;
    }
    async handle({ request, response, auth }) {
        try {
            try {
                await request.validate(UserAuthenticationValidator_1.default);
            }
            catch (validationError) {
                return response.status(this.unprocessableEntity).send({
                    errors: (0, ErrorHandler_1.default)(validationError.messages.errors)
                });
            }
            const { email, password } = request.body();
            const userEntity = await UserAction_1.UserActions.getUserRecord({
                identifier: email,
                identifierType: 'email'
            });
            if (!userEntity) {
                return response.status(this.unauthorized).send({
                    status: "Bad Request",
                    message: "Authentication failed",
                    statusCode: this.unauthorized
                });
            }
            const passwordMatch = await Hash_1.default.verify(userEntity.password, password);
            if (!passwordMatch) {
                return response.status(this.unauthorized).send({
                    status: "Bad Request",
                    message: "Authentication failed",
                    statusCode: this.unauthorized
                });
            }
            const accessToken = await auth.use('api').attempt(email, password, {
                expiresIn: `${appConfig_1.default.tokenExpiryTimeFrame} minutes`
            });
            const responsePayload = userEntity.forClient();
            return response.status(this.ok).send({
                status: "success",
                message: "Login successful",
                data: {
                    accessToken: accessToken.token,
                    user: responsePayload
                }
            });
        }
        catch (UserAuthenticationControllerError) {
            console.log("UserAuthenticationControllerError => ", UserAuthenticationControllerError);
            return response.status(this.error).send({
                status: "Error",
                message: "Error Occured",
                statusCode: this.error
            });
        }
    }
}
exports.default = UserAuthenticationController;
//# sourceMappingURL=UserAuthenticationController.js.map