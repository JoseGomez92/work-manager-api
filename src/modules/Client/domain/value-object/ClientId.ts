import UuidValueObject from '../../../Shared/domain/primitive-value-object/UuidValueObject'

export default class ClientId extends UuidValueObject {
    constructor(readonly value: string) {
        super(value)
    }
}
