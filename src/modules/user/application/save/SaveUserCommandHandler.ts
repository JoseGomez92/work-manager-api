import Command from '../../../shared/domain/cqrs/Command'
import CommandHandler from '../../../shared/domain/cqrs/CommandHandler'
import SaveUser from './SaveUser'
import SaveUserCommand from './SaveUserCommand'

export default class SaveUserCommandHandler implements CommandHandler {
    constructor(private saveUser: SaveUser) {}

    subscribedTo(): Command {
        return SaveUserCommand
    }

    async dispatch(command: SaveUserCommand): Promise<void> {
        await this.saveUser.run(command.toPrimitives())
    }
}
