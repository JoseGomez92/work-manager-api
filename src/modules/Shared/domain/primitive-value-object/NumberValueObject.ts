import InvalidValueError from '../error/InvalidValueError'

export default abstract class NumberValueObject {
    constructor(readonly value: number) {
        this.guard(value)
    }

    guard(value: unknown) {
        if (typeof value !== 'number') throw new InvalidValueError(value)
    }
}
