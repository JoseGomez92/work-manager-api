import BooleanValueObject from '../../../Shared/domain/primitive-value-object/BooleanValueObject'

export default class ClientHasLightPoint extends BooleanValueObject {
    constructor(value: boolean) {
        super(value)
    }
}
