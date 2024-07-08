import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { UserActions } from 'App/Actions/UserAction';

import { HttpStatusCodeEnum } from "App/Helpers/StatusCodes";
import UserAuthenticationValidator from 'App/Validators/UserAuthenticationValidator';
import appConfig from 'Config/appConfig';
import Hash from "@ioc:Adonis/Core/Hash"
import processError from 'App/Helpers/ErrorHandler';

export default class UserAuthenticationController {

    private unprocessableEntity = HttpStatusCodeEnum.UNPROCESSABLE_ENTITY
    private ok = HttpStatusCodeEnum.OK
    private unauthorized = HttpStatusCodeEnum.UNAUTHORIZED
    private error = HttpStatusCodeEnum.INTERNAL_SERVER_ERROR

    public async handle({ request, response, auth }: HttpContextContract) {
        try {
            try {
                await request.validate(UserAuthenticationValidator)
                
            } catch (validationError) {
              return response.status(this.unprocessableEntity).send({
                errors: processError(validationError.messages.errors)
              })  
            } 

            const { email, password } = request.body()

            const userEntity = await UserActions.getUserRecord({
                identifier: email,
                identifierType: 'email'
            })

            if (!userEntity) {
                return response.status(this.unauthorized).send({
                    status: "Bad Request",
                    message: "Authentication failed",
                    statusCode: this.unauthorized
                })
            }

            const passwordMatch = await Hash.verify(userEntity.password,password)

            if (!passwordMatch) {
                return response.status(this.unauthorized).send({
                    status: "Bad Request",
                    message: "Authentication failed",
                    statusCode: this.unauthorized
                })
            }

            const accessToken = await auth.use('api').attempt(email,password,{
                expiresIn: `${appConfig.tokenExpiryTimeFrame} minutes`
            })

            const responsePayload = userEntity.forClient()

            return response.status(this.ok).send({
                status: "success",
                message: "Login successful",
                data: {
                    accessToken: accessToken.token,
                    user: responsePayload
                }
            })
        } catch (UserAuthenticationControllerError) {
            console.log("UserAuthenticationControllerError => ", UserAuthenticationControllerError)
        
            return response.status(this.error).send({
                status: "Error",
                message: "Error Occured",
                statusCode: this.error
            })
        }
    }
}
