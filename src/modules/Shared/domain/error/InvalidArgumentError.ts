export default class InvalidArgumentError extends Error {
    constructor(public message: string) {
        super(message)
        this.name = InvalidArgumentError.name
    }
}
