import Command from '../../../shared/domain/cqrs/Command'
import { UserUpdateType } from './UpdateUser'

export default class UpdateUserCommand extends Command {
    constructor(private rawUser: UserUpdateType) {
        super()
    }

    toPrimitives(): UserUpdateType {
        return this.rawUser
    }
}
