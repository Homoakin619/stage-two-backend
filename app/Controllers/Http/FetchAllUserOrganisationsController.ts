import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { UserActions } from 'App/Actions/UserAction';

import { HttpStatusCodeEnum } from "App/Helpers/StatusCodes";


export default class FetchAllUserOrganisationsController {

    
    private ok = HttpStatusCodeEnum.OK
    private error = HttpStatusCodeEnum.INTERNAL_SERVER_ERROR

    public async handle({ response, auth }: HttpContextContract) {
        
        try {
            
            const loggedInUser = auth.user!

            const organisations = await UserActions.fetchUserOrganisations(loggedInUser.userId)

            return response.status(this.ok).send({
                status: "success",
                message: "User organisations fetched successfully",
                data: {organisations}
            })

        } catch (FetchAllUserOrganisationsControllerError) {
            console.log("FetchAllUserOrganisationsControllerError => ", FetchAllUserOrganisationsControllerError)
            
            return response.status(this.error).send({
                status: "Error",
                message: "Error Occured Fetching User Organisations",
                statusCode: this.error
            })
        }
    }
}
