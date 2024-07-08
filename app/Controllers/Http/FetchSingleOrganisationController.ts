
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { UserActions } from 'App/Actions/UserAction';

import { HttpStatusCodeEnum } from "App/Helpers/StatusCodes";


export default class FetchSingleOrganisationController {

    
    private ok = HttpStatusCodeEnum.OK
    private error = HttpStatusCodeEnum.INTERNAL_SERVER_ERROR
    private notFound = HttpStatusCodeEnum.NOT_FOUND

    public async handle({ request, response, auth }: HttpContextContract) {
        
        try {
            
            const loggedInUser = auth.user!
            const orgId = request.param('orgId')

            const userOrganisations = await UserActions.fetchUserOrganisations(loggedInUser.userId)
            const organisation = userOrganisations.find(item => (item.orgId === orgId));

            if(!organisation) {
                return response.status(this.notFound).send({
                    status: "Bad Request",
                    message: "Organisation record not found",
                    data: organisation
                })
            }

            return response.status(this.ok).send({
                status: "success",
                message: "Organisation fetched successfully",
                data: organisation
            })

        } catch (FetchSingleOrganisationControllerError) {
            console.log("FetchSingleOrganisationControllerError => ", FetchSingleOrganisationControllerError)
            
            return response.status(this.error).send({
                status: "Error",
                message: "Error Occured Fetching Organisation",
                statusCode: this.error
            })
        }
    }
}
