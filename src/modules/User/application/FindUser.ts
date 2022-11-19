import Criteria from '../../Shared/domain/criteria/Criteria'
import ResourceNotFound from '../../Shared/domain/error/ResourceNotFound'
import User from '../domain/User'
import UserRepository from '../domain/UserRepository'

export default class FindUser {
    constructor(private repository: UserRepository) {}

    async run(criteria: Criteria): Promise<User> {
        const users = await this.repository.getByCriteria(criteria)
        if (users.isEmpty()) throw new ResourceNotFound('User not found')
        if (users.get().length > 1) throw new ResourceNotFound('User not found')

        return users.get()[0]
    }
}
