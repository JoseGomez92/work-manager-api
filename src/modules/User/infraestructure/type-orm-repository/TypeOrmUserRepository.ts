import { Repository, SelectQueryBuilder } from 'typeorm'
import Criteria from '../../../Shared/domain/criteria/Criteria'
import Optional from '../../../Shared/domain/helpers/Optional'
import TypeORMCriteriaApplier from '../../../Shared/infraestructure/type-orm/criteria/TypeORMCriteriaApplier'
import TypeORM from '../../../Shared/infraestructure/type-orm/TypeORM'
import User from '../../domain/User'
import UserRepository from '../../domain/UserRepository'
import Users from '../../domain/Users'
import TypeOrmUser from './TypeOrmUser.entity'

export default class TypeOrmUserRepository implements UserRepository {
    private repository: Repository<TypeOrmUser>
    private queryBuilder: SelectQueryBuilder<TypeOrmUser>

    constructor(typeOrm: TypeORM) {
        this.repository = typeOrm.getRepository(TypeOrmUser)
        this.queryBuilder = typeOrm.getQueryBuilder(TypeOrmUser, 'user')
    }

    async getById(id: string): Promise<Optional<User>> {
        const typeOrmUser = await this.repository.findOneBy({ id })

        return new Optional(typeOrmUser?.toAggregateRoot())
    }

    async getByCriteria(criteria: Criteria): Promise<Users> {
        const applier = new TypeORMCriteriaApplier(this.queryBuilder, criteria)
        const users = await applier.apply()

        return new Users(users.map((user) => user.toAggregateRoot()))
    }

    async save(user: User): Promise<void> {
        await this.repository.save(user)
    }

    async update(user: User): Promise<void> {
        await this.repository.update(user.id, user)
    }
}
