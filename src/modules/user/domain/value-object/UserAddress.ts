import InvalidValueError from '../../../shared/domain/error/InvalidValueError'
import StringValueObject from '../../../shared/domain/primitive-value-object/StringValueObject'

export default class UserAddress extends StringValueObject {
    constructor(readonly value: string) {
        super(value)
        this.guard(value)
    }

    guard(value: string): void {
        if (value.length < 5) throw new InvalidValueError(value)
        if (StringValueObject.areAllSpaces(value)) throw new InvalidValueError(value)
    }
}
