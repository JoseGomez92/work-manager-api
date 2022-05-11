import { Request, Response } from 'express'
import httpStatus from 'http-status'
import UpdateUser from '../../../modules/user/application/UpdateUser'
import Controller from '../Controller'

export default class UpdateUserPostController extends Controller {
    constructor(private updateUser: UpdateUser) {
        super()
    }

    protected async run(request: Request, response: Response): Promise<Response> {
        await this.updateUser.run(request.params.id, request.body)
        return response.status(httpStatus.OK).send()
    }
}
