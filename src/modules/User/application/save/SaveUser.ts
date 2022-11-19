import Criteria from '../../../Shared/domain/criteria/Criteria'
import Comparation, { ComparatorValue } from '../../../Shared/domain/criteria/operators/Comparation'
import ResourceAlreadyExists from '../../../Shared/domain/error/ResourceAlreadyExists'
import Bcrypt from '../../../Shared/domain/helpers/Bcrypt'
import User, { UserType } from '../../domain/User'
import UserRepository from '../../domain/UserRepository'

export default class SaveUser {
    constructor(private repository: UserRepository, private bcrypt: Bcrypt) {}

    async run(rawUser: UserType): Promise<void> {
        await this.guardUserById(rawUser.id)
        await this.guardUserByEmail(rawUser.email)
        const user = User.create(rawUser)
        user.password = await this.encryptPassword(user.password)
        await this.repository.save(user)
    }

    private async guardUserById(id: string): Promise<void> {
        const optionalUser = await this.repository.getById(id)
        if (!optionalUser.isEmpty()) throw new ResourceAlreadyExists(`User with id ${id} already exists`)
    }

    private async guardUserByEmail(email: string): Promise<void> {
        const criteria = new Criteria().where(new Comparation('email', ComparatorValue.EQUAL, email))
        const users = await this.repository.getByCriteria(criteria)
        if (!users.isEmpty()) throw new ResourceAlreadyExists(`User with email ${email} already exists`)
    }

    private encryptPassword(password: string): Promise<string> {
        return this.bcrypt.generateHash(password)
    }
}
