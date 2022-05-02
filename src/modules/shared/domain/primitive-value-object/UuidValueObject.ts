import { validate, v4 } from 'uuid'
import InvalidValueError from '../error/InvalidValueError'

export default class UuidValueObject {
    constructor(readonly value: string) {
        this.guard(value)
    }

    private guard(value: unknown) {
        if (typeof value !== 'string') throw new InvalidValueError(value)
        if (!validate(value)) throw new InvalidValueError(this.value)
    }

    static createRandom(): string {
        return v4()
    }
}
