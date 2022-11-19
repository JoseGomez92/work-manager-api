import { Repository } from 'typeorm'
import Criteria from '../../../shared/domain/criteria/Criteria'
import Optional from '../../../shared/domain/helpers/Optional'
import TypeORM from '../../../shared/infraestructure/TypeORM/TypeORM'
import User from '../../domain/User'
import UserRepository from '../../domain/UserRepository'
import Users from '../../domain/Users'
import TypeOrmUser from './TypeOrmUser.entity'

export default class TypeOrmUserRepository implements UserRepository {
    private repository: Repository<TypeOrmUser>

    constructor(typeOrm: TypeORM) {
        this.repository = typeOrm.getRepository(TypeOrmUser)
    }

    async getById(id: string): Promise<Optional<User>> {
        const typeOrmUser = await this.repository.findOneBy({ id })

        return new Optional(typeOrmUser?.toAggregateRoot())
    }

    getByCriteria(criteria: Criteria): Promise<Users> {
        throw new Error('Method not implemented.')
    }

    async save(user: User): Promise<void> {
        await this.repository.save(user)
    }

    async update(user: User): Promise<void> {
        await this.repository.update(user.id, user)
    }
}
