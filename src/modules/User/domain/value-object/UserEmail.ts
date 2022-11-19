import InvalidValueError from '../../../Shared/domain/error/InvalidValueError'
import StringValueObject from '../../../Shared/domain/primitive-value-object/StringValueObject'

export default class UserEmail extends StringValueObject {
    private static readonly emailRegex = /^\S+@\S+\.\S+$/

    constructor(readonly value: string) {
        super(value)
        this.guard(value)
    }

    guard(value: string): void {
        if (!UserEmail.emailRegex.test(value)) throw new InvalidValueError(value)
    }
}
