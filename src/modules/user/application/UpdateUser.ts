import ResourceNotFound from '../../shared/domain/error/ResourceNotFound'
import User from '../domain/User'
import UserRepository from '../domain/UserRepository'

export type UserUpdateType = {
    name: string
    surnames: string
    email: string
    phone: string
    address: string
}

export default class UpdateUser {
    constructor(private repository: UserRepository) {}

    async run(userId: string, rawUser: UserUpdateType): Promise<void> {
        const user = await this.findUser(userId)
        this.setProperties(user, rawUser)
        this.repository.update(user)
    }

    private async findUser(userId: string): Promise<User> {
        const user = await this.repository.getById(userId)
        if (!user.isEmpty()) throw new ResourceNotFound(`User with id: ${userId}`)

        return user.get()!
    }

    private setProperties(user: User, rawUser: UserUpdateType): void {
        user.name = rawUser.name
        user.surnames = rawUser.surnames
        user.email = rawUser.email
        user.phone = rawUser.phone
        user.address = rawUser.address
    }
}
