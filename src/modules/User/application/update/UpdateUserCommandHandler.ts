import Command from '../../../Shared/domain/cqrs/Command'
import CommandHandler from '../../../Shared/domain/cqrs/CommandHandler'
import UpdateUser from './UpdateUser'
import UpdateUserCommand from './UpdateUserCommand'

export default class UpdateUserCommandHandler implements CommandHandler {
    constructor(private updateUser: UpdateUser) {}

    subscribedTo(): Command {
        return UpdateUserCommand
    }

    dispatch(command: UpdateUserCommand): Promise<void> {
        const rawDataUser = command.toPrimitives()

        return this.updateUser.run(rawDataUser)
    }
}
