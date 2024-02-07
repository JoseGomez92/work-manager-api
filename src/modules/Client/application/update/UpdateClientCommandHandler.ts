import Command from '../../../Shared/domain/cqrs/Command'
import CommandHandler from '../../../Shared/domain/cqrs/CommandHandler'
import UpdateClient from './UpdateClient'
import UpdateClientCommand from './UpdateClientCommand'

export default class UpdateClientCommandHandler implements CommandHandler {
    constructor(private readonly updateClient: UpdateClient) {}

    subscribedTo(): Command {
        return UpdateClientCommand
    }

    dispatch(command: UpdateClientCommand): Promise<void> {
        return this.updateClient.run(command.toPrimitives())
    }
}
