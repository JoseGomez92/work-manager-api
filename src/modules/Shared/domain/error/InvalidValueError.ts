export default class InvalidValueError extends Error {
    constructor(value: unknown) {
        super(`The value <${value}> is not valid.`)
        this.name = InvalidValueError.name
    }
}
