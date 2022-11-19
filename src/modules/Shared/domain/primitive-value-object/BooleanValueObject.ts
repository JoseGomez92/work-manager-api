import InvalidValueError from '../error/InvalidValueError'

export default abstract class BooleanValueObject {
    constructor(readonly value: boolean) {
        this.guard(value)
    }

    guard(value: unknown) {
        if (typeof value !== 'boolean') throw new InvalidValueError(value)
    }
}
