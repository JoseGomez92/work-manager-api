import Command from './Command'

export default interface CommandHandler {
    subscribedTo(): Command

    dispatch(command: Command): Promise<void>
}
