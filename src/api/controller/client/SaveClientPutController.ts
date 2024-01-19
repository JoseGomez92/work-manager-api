import { Request, Response } from 'express'
import httpStatus from 'http-status'
import SaveClientCommand from '../../../modules/Client/application/save/SaveClientCommand'
import CommandBus from '../../../modules/Shared/domain/cqrs/CommandBus'
import Controller from '../Controller'

export default class SaveClientPutController extends Controller {
    constructor(private commandBus: CommandBus) {
        super()
    }

    protected async run(request: Request, response: Response): Promise<Response> {
        await this.commandBus.dispatch(new SaveClientCommand(request.body))
        return response.status(httpStatus.CREATED).send()
    }
}
