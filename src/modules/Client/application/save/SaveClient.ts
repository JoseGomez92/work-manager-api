import Client, { ClientType } from '../../domain/Client'
import ClientRepository from '../../domain/ClientRepository'

export default class SaveClient {
    constructor(private readonly repository: ClientRepository) {}

    async run(rawClient: ClientType): Promise<void> {
        const client = Client.create(rawClient)
        await this.repository.save(client)
    }
}
