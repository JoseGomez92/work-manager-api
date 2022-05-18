import Command from '../../../domain/cqrs/Command'
import CommandHandler from '../../../domain/cqrs/CommandHandler'

export default class CommandHandlersInformation {
    private handlersMap: Map<Command, CommandHandler>

    constructor(handlers: Array<CommandHandler>) {
        this.handlersMap = new Map<Command, CommandHandler>()
        handlers.forEach((h) => this.handlersMap.set(h.subscribedTo(), h))
    }

    search(command: Command): CommandHandler {
        const handler = this.handlersMap.get(command.constructor)
        if (!handler) {
            throw new Error(`No Command Handler found for command <${command.constructor.name}>`)
        }

        return handler
    }
}
