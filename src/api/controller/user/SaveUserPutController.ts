import { Request, Response } from 'express'
import httpStatus from 'http-status'
import CommandBus from '../../../modules/shared/domain/cqrs/CommandBus'
import SaveUserCommand from '../../../modules/user/application/save/SaveUserCommand'
import Controller from '../Controller'

export default class SaveUserPutController extends Controller {
    constructor(private commandBus: CommandBus) {
        super()
    }

    protected async run(request: Request, response: Response): Promise<Response> {
        await this.commandBus.dispatch(new SaveUserCommand(request.body))
        return response.status(httpStatus.CREATED).send()
    }
}
