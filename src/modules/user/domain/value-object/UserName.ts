import InvalidValueError from '../../../shared/domain/error/InvalidValueError'
import StringValueObject from '../../../shared/domain/primitive-value-object/StringValueObject'

export default class UserName extends StringValueObject {
    constructor(value: string) {
        super(value)
    }

    guard(value: string): void {
        if (value.length < 3) throw new InvalidValueError(value)
        if (StringValueObject.areAllSpaces(value)) throw new InvalidValueError(value)
    }
}
