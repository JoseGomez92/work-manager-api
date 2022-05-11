import { Request, Response } from 'express'
import httpStatus from 'http-status'
import SaveUser from '../../../modules/user/application/SaveUser'
import Controller from '../Controller'

export default class SaveUserPutController extends Controller {
    constructor(private saveUser: SaveUser) {
        super()
    }

    protected async run(request: Request, response: Response): Promise<Response> {
        await this.saveUser.run(request.body)
        return response.status(httpStatus.CREATED).send()
    }
}
