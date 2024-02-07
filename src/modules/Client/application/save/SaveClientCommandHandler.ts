import Command from '../../../Shared/domain/cqrs/Command'
import CommandHandler from '../../../Shared/domain/cqrs/CommandHandler'
import SaveClient from './SaveClient'
import SaveClientCommand from './SaveClientCommand'

export default class SaveClientCommandHandler implements CommandHandler {
    constructor(private readonly saveClient: SaveClient) {}

    subscribedTo(): Command {
        return SaveClientCommandHandler
    }

    async dispatch(command: SaveClientCommand): Promise<void> {
        await this.saveClient.run(command.toPrimitives())
    }
}
