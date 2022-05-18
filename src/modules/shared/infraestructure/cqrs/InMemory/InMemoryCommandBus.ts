import Command from '../../../domain/cqrs/Command'
import CommandBus from '../../../domain/cqrs/CommandBus'
import CommandHandlersInformation from './CommandHandlersInformation'

export default class InMemoryCommandBus implements CommandBus {
    constructor(private information: CommandHandlersInformation) {}

    dispatch(command: Command): Promise<void> {
        return this.information.search(command).dispatch(command)
    }
}
