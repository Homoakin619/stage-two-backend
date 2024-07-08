import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database';
import { OrganisationActions } from 'App/Actions/OrganisationAction';
import processError from 'App/Helpers/ErrorHandler';
import { HttpStatusCodeEnum } from "App/Helpers/StatusCodes";
import CreateNewOrganisationValidator from 'App/Validators/CreateNewOrganisationValidator';


export default class CreateNewOrganisationController {

    private error = HttpStatusCodeEnum.INTERNAL_SERVER_ERROR
    private unprocessableEntity = HttpStatusCodeEnum.UNPROCESSABLE_ENTITY
    private created = HttpStatusCodeEnum.CREATED

    public async handle({ request, response, auth }: HttpContextContract) {
        const dbTransaction = await Database.transaction()
        try {
            try {
                await request.validate(CreateNewOrganisationValidator)

            } catch (validationError) {
                return response.status(this.unprocessableEntity).send({
                    errors: processError(validationError.messages.errors)
                  })  
            }
            
            const loggedInUser = auth.user!
            const { name, description } = request.body()

            const newOrganisation = await OrganisationActions.createOrganisation({
                createPayload: {name, description: description || "" },
                dbTransactionOptions: {
                    useTransaction: false,
                }
            })

            await OrganisationActions.addUserToOrganisation({userId: loggedInUser.id, orgId: newOrganisation.id})

            return response.status(this.created).send({
                status: "success",
                message: "Organisation created successfully",
                data: newOrganisation.forClient()
            })

        } catch (CreateNewOrganisationControllerError) {
            await dbTransaction.rollback()
            console.log("CreateNewOrganisationControllerError => ", CreateNewOrganisationControllerError)
            
            return response.status(this.error).send({
                status: "Error",
                message: "Error Occured Creating Organisation",
                statusCode: this.error
            })
        }
    }
}
