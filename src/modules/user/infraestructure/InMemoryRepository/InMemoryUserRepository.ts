import Criteria from '../../../shared/domain/criteria/Criteria'
import Optional from '../../../shared/domain/helpers/Optional'
import InMemoryCriteriaApplier from '../../../shared/infraestructure/InMemoryCriteria/InMemoryCriteriaApplier'
import User from '../../domain/User'
import UserRepository from '../../domain/UserRepository'
import Users from '../../domain/Users'

export default class InMemoryUserRepository implements UserRepository {
    private users: Array<User> = []

    async getById(id: string): Promise<Optional<User>> {
        return new Optional(this.users.find((user) => user.id === id))
    }

    async getByCriteria(criteria: Criteria): Promise<Users> {
        const applier = new InMemoryCriteriaApplier(this.users, criteria)

        return new Users(applier.apply())
    }

    async save(user: User): Promise<void> {
        this.users.push(user)
    }

    async update(user: User): Promise<void> {
        this.users[this.users.findIndex((u) => u.id === user.id)] = user
    }
}
