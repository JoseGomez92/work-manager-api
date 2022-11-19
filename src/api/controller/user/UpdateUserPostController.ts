import { Request, Response } from 'express'
import httpStatus from 'http-status'
import CommandBus from '../../../modules/Shared/domain/cqrs/CommandBus'
import UpdateUserCommand from '../../../modules/User/application/update/UpdateUserCommand'
import Controller from '../Controller'

export default class UpdateUserPostController extends Controller {
    constructor(private commandBus: CommandBus) {
        super()
    }

    protected async run(request: Request, response: Response): Promise<Response> {
        await this.commandBus.dispatch(new UpdateUserCommand({ id: request.params.id, ...request.body }))
        return response.status(httpStatus.OK).send()
    }
}
