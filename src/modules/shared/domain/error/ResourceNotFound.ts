export default class ResourceNotFound extends Error {
    constructor(resource: unknown) {
        super(`Resource <${resource}> has not been found.`)
        this.name = ResourceNotFound.name
    }
}
