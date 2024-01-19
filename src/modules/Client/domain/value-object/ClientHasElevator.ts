import BooleanValueObject from '../../../Shared/domain/primitive-value-object/BooleanValueObject'

export default class ClientHasElevator extends BooleanValueObject {
    constructor(value: boolean) {
        super(value)
    }
}
