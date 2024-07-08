import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database';
import { OrganisationActions } from 'App/Actions/OrganisationAction';
import { UserActions } from 'App/Actions/UserAction';
import processError from 'App/Helpers/ErrorHandler';

import { HttpStatusCodeEnum } from "App/Helpers/StatusCodes";
import UserRegistrationValidator from 'App/Validators/UserRegistrationValidator';
import appConfig from 'Config/appConfig';

export default class UserRegistrationController {

    private unprocessableEntity = HttpStatusCodeEnum.UNPROCESSABLE_ENTITY
    private created = HttpStatusCodeEnum.CREATED
    private error = HttpStatusCodeEnum.INTERNAL_SERVER_ERROR

    public async handle({ request, response, auth }: HttpContextContract) {
        const dbTransaction = await Database.transaction()
        try {
            try {
                await request.validate(UserRegistrationValidator)

            } catch (validationError) {
              return response.status(this.unprocessableEntity).send({
                errors: processError(validationError.messages.errors)
              })  
            } 

            const { firstName, lastName, email, password, phone } = request.body()

            const userEntity = await UserActions.createUser({
                createPayload: {
                    firstName, lastName, email, password, phone
                },
                dbTransactionOptions: {
                    useTransaction: true,
                    dbTransaction
                }
            })

            const newOrganisationName = `${firstName}'s Organisation`
            
            let organisationEntity = await OrganisationActions.getOrganisationRecord({
                identifier: newOrganisationName,
                identifierType: "name"
            })

            if (!organisationEntity) {
                organisationEntity = await OrganisationActions.createOrganisation({
                    createPayload: {
                        name: newOrganisationName, description: ""
                    },
                    dbTransactionOptions: {
                        useTransaction: true,
                        dbTransaction
                    }
                })
            }

            await dbTransaction.commit()

            await OrganisationActions.addUserToOrganisation({
                orgId: organisationEntity.id,
                userId: userEntity.id
            })

            

            const accessToken = await auth.use('api').attempt(email,password,{
                expiresIn: `${appConfig.tokenExpiryTimeFrame} minutes`
            })

            const responsePayload = userEntity.forClient()

            return response.status(this.created).send({
                status: "success",
                message: "Registration successful",
                data: {
                    accessToken: accessToken.token,
                    user: responsePayload
                }
            })

        } catch (UserRegistrationsControllerError) {
            console.log("UserRegistrationsControllerError => ", UserRegistrationsControllerError)
            await dbTransaction.rollback()
            return response.status(this.error).send({
                status: "Error",
                message: "Error Occured Creating User",
                statusCode: this.error
            })
        }
    }
}
