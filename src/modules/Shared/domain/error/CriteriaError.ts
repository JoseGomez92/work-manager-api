export default class CriteriaError extends Error {
    constructor(message: string) {
        super(message)
        this.name = CriteriaError.name
    }
}
