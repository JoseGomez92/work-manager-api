import ResourceNotFound from '../../../Shared/domain/error/ResourceNotFound'
import Client, { ClientType } from '../../domain/Client'
import ClientRepository from '../../domain/ClientRepository'

export type ClientUpdateType = Omit<ClientType, 'id'>

export default class UpdateClient {
    constructor(private readonly repository: ClientRepository) {}

    async run(id: Client['id'], rawClient: ClientUpdateType) {
        const client = await this.findClient(id)
        this.setProperties(client, rawClient)
        await this.repository.update(client)
    }

    private async findClient(id: Client['id']): Promise<Client> {
        const client = await this.repository.getById(id)
        if (client.isEmpty()) throw new ResourceNotFound(`Client with id: ${id}`)

        return client.get()!
    }

    private setProperties(client: Client, rawClient: ClientUpdateType) {
        client.address = rawClient.address
        client.fullName = rawClient.fullName
        client.hasElevator = rawClient.hasElevator
        client.hasLightPoint = rawClient.hasLightPoint
        client.hasParkingArea = rawClient.hasParkingArea
        client.phoneNumber = rawClient.phoneNumber
    }
}
