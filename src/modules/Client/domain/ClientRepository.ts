import Criteria from '../../Shared/domain/criteria/Criteria'
import Optional from '../../Shared/domain/helpers/Optional'
import Client from './Client'
import Clients from './Clients'

export default interface ClientRepository {
    getById(id: string): Promise<Optional<Client>>

    getByCriteria(criteria: Criteria): Promise<Clients>

    save(user: Client): Promise<void>

    update(user: Client): Promise<void>
}
