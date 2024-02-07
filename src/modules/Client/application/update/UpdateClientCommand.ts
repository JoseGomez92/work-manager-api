import Command from '../../../Shared/domain/cqrs/Command'
import { ClientType } from '../../domain/Client'

export default class UpdateClientCommand extends Command {
    constructor(private readonly rawUser: ClientType) {
        super()
    }

    toPrimitives(): ClientType {
        return this.rawUser
    }
}
