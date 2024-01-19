import InvalidValueError from '../../../Shared/domain/error/InvalidValueError'
import StringValueObject from '../../../Shared/domain/primitive-value-object/StringValueObject'

export default class ClientAddress extends StringValueObject {
    constructor(value: string) {
        super(value)
    }

    guard(value: string): void {
        if (value.length < 5) throw new InvalidValueError(value)
        if (StringValueObject.areAllSpaces(value)) throw new InvalidValueError(value)
    }
}
