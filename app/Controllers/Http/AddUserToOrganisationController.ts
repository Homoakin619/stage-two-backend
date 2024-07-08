import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { OrganisationActions } from 'App/Actions/OrganisationAction';
import { UserActions } from 'App/Actions/UserAction';
import processError from 'App/Helpers/ErrorHandler';
import { HttpStatusCodeEnum } from "App/Helpers/StatusCodes";
import AddUserToOrganisationValidator from 'App/Validators/AddUserToOrganisationValidator';


export default class AddUserToOrganisationController {

    private error = HttpStatusCodeEnum.INTERNAL_SERVER_ERROR
    private unprocessableEntity = HttpStatusCodeEnum.UNPROCESSABLE_ENTITY
    private ok = HttpStatusCodeEnum.OK
    private badRequest = HttpStatusCodeEnum.BAD_REQUEST

    public async handle({ request, response, auth }: HttpContextContract) {
        
        try {
            try {
                await request.validate(AddUserToOrganisationValidator)

            } catch (validationError) {
                return response.status(this.unprocessableEntity).send({
                    errors: processError(validationError.messages.errors)
                  })  
            }

            const loggedInUser = auth.user!
            const orgId = request.param("orgId")
            const { userId } = request.body()

            const userOrganisations = await UserActions.fetchUserOrganisations(loggedInUser.userId)
            const organisationExists = userOrganisations.find(organisation => organisation.orgId === orgId)

            if (!organisationExists) {
                return response.status(this.badRequest).send({
                    status: "Bad Request",
                    message: "Organisation not found for user",
                    statusCode: this.badRequest
                })
            }

            const userOrganisation = await OrganisationActions.getOrganisationRecord({
                identifier: organisationExists.orgId,
                identifierType: 'orgId'
            })

            const userExists = await UserActions.getUserRecord({
                identifier: userId,
                identifierType: 'userId'
            })

            if (!userExists) {
                return response.status(this.badRequest).send({
                    status: "Bad Request",
                    message: "Invalid userId provided"
                })
            }

            await OrganisationActions.addUserToOrganisation({userId: userExists.id, orgId: userOrganisation!.id})

            return response.status(this.ok).send({
                status: "success",
                message: "User added to organisation successfully",
            }
            )

        } catch (AddUserToOrganisationControllerError) {
        
            console.log("AddUserToOrganisationControllerError => ", AddUserToOrganisationControllerError)
            
            return response.status(this.error).send({
                status: "Error",
                message: "Error Occured Adding User",
                statusCode: this.error
            })
        }
    }
}

