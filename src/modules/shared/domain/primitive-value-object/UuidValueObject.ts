import { validate, v4 } from 'uuid'
import InvalidValueError from '../error/InvalidValueError'

export default class UuidValueObject {
    constructor(readonly value: string) {
        this.guard()
    }

    private guard() {
        if (!validate(this.value)) throw new InvalidValueError(this.value)
    }

    static createRandom(): string {
        return v4()
    }
}
