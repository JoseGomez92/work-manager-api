import Criteria from '../../../Shared/domain/criteria/Criteria'
import Comparation, { ComparatorValue } from '../../../Shared/domain/criteria/operators/Comparation'
import ResourceAlreadyExists from '../../../Shared/domain/error/ResourceAlreadyExists'
import ResourceNotFound from '../../../Shared/domain/error/ResourceNotFound'
import User from '../../domain/User'
import UserRepository from '../../domain/UserRepository'

export type UserUpdateType = {
    id: string
    name: string
    surnames: string
    email: string
    phone: string
    address: string
}

export default class UpdateUser {
    constructor(private repository: UserRepository) {}

    async run(rawUser: UserUpdateType): Promise<void> {
        const user = await this.findUser(rawUser.id)
        await this.guardEmail(rawUser)
        this.setProperties(user, rawUser)
        await this.repository.update(user)
    }

    private async findUser(userId: string): Promise<User> {
        const user = await this.repository.getById(userId)
        if (user.isEmpty()) throw new ResourceNotFound(`User with id: ${userId}`)

        return user.get()!
    }

    private async guardEmail(rawUser: UserUpdateType): Promise<void> {
        const criteria = new Criteria().where(new Comparation('email', ComparatorValue.EQUAL, rawUser.email))
        const users = await this.repository.getByCriteria(criteria)
        if (users.first.get() && users.first.get()!.id !== rawUser.id)
            throw new ResourceAlreadyExists(`User with the email ${rawUser.email} already exists`)
    }

    private setProperties(user: User, rawUser: UserUpdateType): void {
        user.name = rawUser.name
        user.surnames = rawUser.surnames
        user.email = rawUser.email
        user.phone = rawUser.phone
        user.address = rawUser.address
    }
}
