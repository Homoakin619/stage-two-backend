import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { UserActions } from 'App/Actions/UserAction';

import { HttpStatusCodeEnum } from "App/Helpers/StatusCodes";


export default class FetchSingleUserController {

    
    private ok = HttpStatusCodeEnum.OK
    private error = HttpStatusCodeEnum.INTERNAL_SERVER_ERROR
    private notFound = HttpStatusCodeEnum.NOT_FOUND

    public async handle({ request, response, auth }: HttpContextContract) {
        
        try {
            
            const loggedInUser = auth.user!
            
            const userId = request.param('id')
            
            const userEntity = await UserActions.getOrganisationUserRecord({identifier: userId, userId: loggedInUser.userId})
            
            const responsePayload = userEntity?.forClient()

            if (!responsePayload) {
                return response.status(this.notFound).send({
                    status: "Bad Request",
                    message: "No User record found",
                })
            }

            return response.status(this.ok).send({
                status: "success",
                message: "User fetched successfully",
                data: responsePayload 
            })

        } catch (FetchSingleUserControllerError) {
            console.log("FetchSingleUserControllerError => ", FetchSingleUserControllerError)
            
            return response.status(this.error).send({
                status: "Error",
                message: "Error Occured Fetching User",
                statusCode: this.error
            })
        }
    }
}
