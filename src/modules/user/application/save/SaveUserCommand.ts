import Command from '../../../shared/domain/cqrs/Command'
import { UserType } from '../../domain/User'

export default class SaveUserCommand extends Command {
    constructor(private rawUser: UserType) {
        super()
    }

    toPrimitives(): UserType {
        return this.rawUser
    }
}
