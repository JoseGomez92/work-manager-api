import Criteria from '../../Shared/domain/criteria/Criteria'
import Optional from '../../Shared/domain/helpers/Optional'
import User from './User'
import Users from './Users'

export default interface UserRepository {
    getById(id: string): Promise<Optional<User>>

    getByCriteria(criteria: Criteria): Promise<Users>

    save(user: User): Promise<void>

    update(user: User): Promise<void>
}
