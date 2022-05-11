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
    private readonly _id: UserId
    private _name: UserName
    private _surnames: UserSurnames
    private _email: UserEmail
    private _phone: UserPhone
    private _address: UserAddress
    private _password: UserPassword

    private constructor(params: UserType) {
        super()
        this.guardType(params)
        this._id = new UserId(params.id)
        this._name = new UserName(params.name)
        this._surnames = new UserSurnames(params.surnames)
        this._email = new UserEmail(params.email)
        this._phone = new UserPhone(params.phone)
        this._address = new UserAddress(params.address)
        this._password = new UserPassword(params.password)
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

    get id() {
        return this._id.value
    }

    get name() {
        return this._name.value
    }

    get surnames() {
        return this._surnames.value
    }

    get email() {
        return this._email.value
    }

    get phone() {
        return this._phone.value
    }

    get address() {
        return this._address.value
    }

    get password() {
        return this._password.value
    }

    set name(value: string) {
        this._name = new UserName(value)
    }

    set surnames(value: string) {
        this._surnames = new UserSurnames(value)
    }

    set email(value: string) {
        this._email = new UserEmail(value)
    }

    set phone(value: string) {
        this._phone = new UserPhone(value)
    }

    set address(value: string) {
        this._address = new UserAddress(value)
    }

    set password(value: string) {
        this._password = new UserPassword(value)
    }

    toPrimitives(): UserType {
        return {
            id: this._id.value,
            name: this._name.value,
            surnames: this._surnames.value,
            email: this._email.value,
            phone: this._phone.value,
            address: this._address.value,
            password: this._password.value,
        }
    }
}
