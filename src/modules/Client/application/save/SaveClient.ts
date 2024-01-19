import Client, { ClientType } from '../../domain/Client'
import ClientRepository from '../../domain/ClientRepository'

export default class SaveClient {
    constructor(private repository: ClientRepository) {}

    async run(rawUser: ClientType): Promise<void> {
        const client = Client.create(rawUser)
        await this.repository.save(client)
    }
}
