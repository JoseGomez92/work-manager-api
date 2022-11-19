export default class InternalError extends Error {
    constructor(public message: string) {
        super(message)
        this.name = InternalError.name
    }
}
