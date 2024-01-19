import AggregateRoot from '../../Shared/domain/AggregateRoot'
import ValueNotDefined from '../../Shared/domain/error/ValueNotDefined'
import ClientAddress from './value-object/ClientAddress'
import ClientFullName from './value-object/ClientFullName'
import ClientHasElevator from './value-object/ClientHasElevator'
import ClientHasLightPoint from './value-object/ClientHasLightPoint'
import ClientHasParkingArea from './value-object/ClientHasParkingArea'
import ClientId from './value-object/ClientId'
import ClientPhoneNumber from './value-object/ClientPhoneNumber'

export type ClientType = {
    id: string
    fullName: string
    address: string
    phoneNumber: string
    hasParkingArea: boolean
    hasElevator: boolean
    hasLightPoint: boolean
}

export default class Client extends AggregateRoot<ClientType> {
    private _id: ClientId
    private _fullName: ClientFullName
    private _address: ClientAddress
    private _phoneNumber: ClientPhoneNumber
    private _hasParkingArea: ClientHasParkingArea
    private _hasElevator: ClientHasElevator
    private _hasLightPoint: ClientHasLightPoint

    constructor(args: ClientType) {
        super()
        this._id = new ClientId(args.id)
        this._fullName = new ClientFullName(args.fullName)
        this._address = new ClientAddress(args.address)
        this._phoneNumber = new ClientPhoneNumber(args.phoneNumber)
        this._hasParkingArea = new ClientHasParkingArea(args.hasParkingArea)
        this._hasElevator = new ClientHasElevator(args.hasElevator)
        this._hasLightPoint = new ClientHasLightPoint(args.hasLightPoint)
    }

    get id() {
        return this._id.value
    }

    get fullName() {
        return this._fullName.value
    }

    get address() {
        return this._address.value
    }

    get phoneNumber() {
        return this._phoneNumber.value
    }

    get hasParkingArea() {
        return this._hasParkingArea.value
    }

    get hasElevator() {
        return this._hasElevator.value
    }

    get hasLightPoint() {
        return this._hasLightPoint.value
    }

    set id(value: string) {
        this._id = new ClientId(value)
    }

    set fullName(value: string) {
        this._fullName = new ClientFullName(value)
    }

    set address(value: string) {
        this._address = new ClientAddress(value)
    }

    set phoneNumber(value: string) {
        this._phoneNumber = new ClientPhoneNumber(value)
    }

    set hasParkingArea(value: boolean) {
        this._hasParkingArea = new ClientHasParkingArea(value)
    }

    set hasElevator(value: boolean) {
        this._hasElevator = new ClientHasElevator(value)
    }

    set hasLightPoint(value: boolean) {
        this._hasLightPoint = new ClientHasLightPoint(value)
    }

    static create(args: ClientType) {
        return new Client(args)
    }

    protected guardType(value: ClientType): void {
        if (!value.id) throw new ValueNotDefined('id')
        if (!value.fullName) throw new ValueNotDefined('fullName')
        if (!value.address) throw new ValueNotDefined('address')
        if (!value.phoneNumber) throw new ValueNotDefined('phoneNumber')
        if (!value.hasParkingArea) throw new ValueNotDefined('hasParkingArea')
        if (!value.hasElevator) throw new ValueNotDefined('hasElevator')
        if (!value.hasLightPoint) throw new ValueNotDefined('hasLightPoint')
    }

    toPrimitives(): ClientType {
        return {
            id: this._id.value,
            fullName: this._fullName.value,
            address: this._address.value,
            phoneNumber: this._phoneNumber.value,
            hasParkingArea: this._hasParkingArea.value,
            hasElevator: this._hasElevator.value,
            hasLightPoint: this._hasLightPoint.value,
        }
    }
}
