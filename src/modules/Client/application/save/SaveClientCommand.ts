import Command from '../../../Shared/domain/cqrs/Command'
import { ClientType } from '../../domain/Client'

export default class SaveClientCommand extends Command {
    constructor(private readonly rawClient: ClientType) {
        super()
    }

    toPrimitives(): ClientType {
        return this.rawClient
    }
}
