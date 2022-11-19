export default class ResourceAlreadyExists extends Error {
    constructor(message: string) {
        super(`Resource conflict: <${message}>`)
        this.name = ResourceAlreadyExists.name
    }
}
