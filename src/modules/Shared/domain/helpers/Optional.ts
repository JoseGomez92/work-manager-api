export default class Optional<T> {
    private readonly value: T | null

    constructor(value: T | null | undefined) {
        this.value = value ? value : null
    }

    get(): Optional<T>['value'] {
        return this.value
    }

    isEmpty(): boolean {
        return !this.value
    }
}
