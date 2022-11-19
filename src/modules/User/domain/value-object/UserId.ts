import UuidValueObject from '../../../Shared/domain/primitive-value-object/UuidValueObject'

export default class UserId extends UuidValueObject {
    constructor(readonly value: string) {
        super(value)
    }
}
