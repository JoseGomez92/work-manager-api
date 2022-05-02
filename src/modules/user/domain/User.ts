import AggregateRoot from '../../shared/domain/AggregateRoot'
import ValueNotDefined from '../../shared/domain/error/ValueNotDefined'
import UserAddress from './value-object/UserAddress'
import UserEmail from './value-object/UserEmail'
import UserId from './value-object/UserId'
import UserName from './value-object/UserName'
import UserPassword from './value-object/UserPassword'
import UserPhone from './value-object/UserPhone'
import UserSurnames from './value-object/UserSurnames'

export type UserType = {
    id: string
    name: string
    surnames: string
    email: string
    phone: string
    address: string
    password: string
}

export default class User extends AggregateRoot<UserType> {
    private readonly id: UserId
    private readonly name: UserName
    private readonly surnames: UserSurnames
    private readonly email: UserEmail
    private readonly phone: UserPhone
    private readonly address: UserAddress
    private readonly password: UserPassword

    private constructor(params: UserType) {
        super()
        this.guardType(params)
        this.id = new UserId(params.id)
        this.name = new UserName(params.name)
        this.surnames = new UserSurnames(params.surnames)
        this.email = new UserEmail(params.email)
        this.phone = new UserPhone(params.phone)
        this.address = new UserAddress(params.address)
        this.password = new UserPassword(params.password)
    }

    protected guardType(value: UserType): void {
        if (!value.id) throw new ValueNotDefined('id')
        if (!value.name) throw new ValueNotDefined('name')
        if (!value.surnames) throw new ValueNotDefined('surnames')
        if (!value.email) throw new ValueNotDefined('email')
        if (!value.phone) throw new ValueNotDefined('phone')
        if (!value.address) throw new ValueNotDefined('address')
        if (!value.password) throw new ValueNotDefined('password')
    }

    static create(params: UserType): User {
        return new User(params)
    }

    toPrimitives(): UserType {
        return {
            id: this.id.value,
            name: this.name.value,
            surnames: this.surnames.value,
            email: this.email.value,
            phone: this.phone.value,
            address: this.address.value,
            password: this.password.value,
        }
    }
}
