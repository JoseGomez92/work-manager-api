import InvalidValueError from '../../../Shared/domain/error/InvalidValueError'
import StringValueObject from '../../../Shared/domain/primitive-value-object/StringValueObject'

export default class ClientPhoneNumber extends StringValueObject {
    constructor(readonly value: string) {
        super(value)
    }

    guard(value: string): void {
        // TODO: Check if this lenght limit apply for all cases
        if (value.length < 9) throw new InvalidValueError(value)
        if (StringValueObject.areAllSpaces(value)) throw new InvalidValueError(value)
    }
}
