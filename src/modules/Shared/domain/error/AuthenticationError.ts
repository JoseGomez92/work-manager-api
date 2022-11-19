export default class AuthenticationError extends Error {
    constructor() {
        super('Authentication error')
        this.name = AuthenticationError.name
    }
}
