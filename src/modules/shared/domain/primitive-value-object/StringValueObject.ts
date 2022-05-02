import InvalidValueError from '../error/InvalidValueError'

export default abstract class StringValueObject {
    constructor(readonly value: string) {
        this.guard(value)
    }

    guard(value: string) {
        if (typeof value !== 'string') throw new InvalidValueError(value)
    }

    static isEmpty(value: string): boolean {
        return value.length === 0
    }

    static areAllSpaces(value: string): boolean {
        return /\s/g.test(value)
    }
}
