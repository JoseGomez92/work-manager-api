import Criteria from '../../../Shared/domain/criteria/Criteria'
import Comparation, { ComparatorValue } from '../../../Shared/domain/criteria/operators/Comparation'
import ResourceAlreadyExists from '../../../Shared/domain/error/ResourceAlreadyExists'
import Bcrypt from '../../../Shared/domain/helpers/Bcrypt'
import User, { UserType } from '../../domain/User'
import UserRepository from '../../domain/UserRepository'

export default class SaveUser {
    constructor(private repository: UserRepository, private bcrypt: Bcrypt) {}

    async run(rawUser: UserType): Promise<void> {
        const user = User.create(rawUser)
        await this.guardUsersByIdAndEmail(user)
        await this.encryptPassword(user)
        await this.repository.save(user)
    }

    private async guardUsersByIdAndEmail(user: User): Promise<void> {
        const criteria = new Criteria()
            .where(new Comparation('id', ComparatorValue.EQUAL, user.id))
            .or(new Comparation('email', ComparatorValue.EQUAL, user.email))
        const users = await this.repository.getByCriteria(criteria)
        if (!users.isEmpty()) throw new ResourceAlreadyExists(`User with the id ${user.id} or email ${user.email} already exists`)
    }

    private async encryptPassword(user: User): Promise<void> {
        user.password = await this.bcrypt.generateHash(user.password)
    }
}
