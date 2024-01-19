import BooleanValueObject from '../../../Shared/domain/primitive-value-object/BooleanValueObject'

export default class ClientHasParkingArea extends BooleanValueObject {
    constructor(value: boolean) {
        super(value)
    }
}
