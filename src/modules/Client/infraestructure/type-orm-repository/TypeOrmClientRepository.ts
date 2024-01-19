import { Repository, SelectQueryBuilder } from 'typeorm'
import Criteria from '../../../Shared/domain/criteria/Criteria'
import Optional from '../../../Shared/domain/helpers/Optional'
import TypeORMCriteriaApplier from '../../../Shared/infraestructure/type-orm/criteria/TypeORMCriteriaApplier'
import TypeORM from '../../../Shared/infraestructure/type-orm/TypeORM'
import Client from '../../domain/Client'
import ClientRepository from '../../domain/ClientRepository'
import Clients from '../../domain/Clients'
import TypeOrmClient from './TypeOrmClient.entity'

export default class TypeOrmClientRepository implements ClientRepository {
    private repository: Repository<TypeOrmClient>
    private queryBuilder: SelectQueryBuilder<TypeOrmClient>

    constructor(typeOrm: TypeORM) {
        this.repository = typeOrm.getRepository(TypeOrmClient)
        this.queryBuilder = typeOrm.getQueryBuilder(TypeOrmClient, 'client')
    }

    async getById(id: string): Promise<Optional<Client>> {
        const typeOrmClient = await this.repository.findOneBy({ id })

        return new Optional(typeOrmClient?.toAggregateRoot())
    }

    async getByCriteria(criteria: Criteria): Promise<Clients> {
        const applier = new TypeORMCriteriaApplier(this.queryBuilder, criteria)
        const clients = await applier.apply()

        return new Clients(clients.map((client) => client.toAggregateRoot()))
    }

    async save(client: Client): Promise<void> {
        await this.repository.save(client)
    }

    async update(client: Client): Promise<void> {
        await this.repository.update(client.id, client.toPrimitives())
    }
}
