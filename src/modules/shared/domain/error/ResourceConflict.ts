export default class ResourceConflict extends Error {
    constructor() {
        super(`The operation cannot be completed because there is a conflict.`)
        this.name = ResourceConflict.name
    }
}
