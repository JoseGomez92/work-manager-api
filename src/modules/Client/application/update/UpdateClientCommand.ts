import Command from '../../../Shared/domain/cqrs/Command'
import { ClientUpdateType } from './UpdateClient'

export default class UpdateClientCommand extends Command {
    constructor(private rawUser: ClientUpdateType) {
        super()
    }

    toPrimitives(): ClientUpdateType {
        return this.rawUser
    }
}
