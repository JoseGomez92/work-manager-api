import { Request, Response } from 'express'
import UpdateClientCommand from '../../../modules/Client/application/update/UpdateClientCommand'
import CommandBus from '../../../modules/Shared/domain/cqrs/CommandBus'
import Controller from '../Controller'
import httpStatus from 'http-status'

export default class UpdateClientPostController extends Controller {
    constructor(private commandBus: CommandBus) {
        super()
    }

    protected async run(request: Request, response: Response): Promise<Response> {
        await this.commandBus.dispatch(new UpdateClientCommand(request.body))
        return response.status(httpStatus.CREATED).send()
    }
}
