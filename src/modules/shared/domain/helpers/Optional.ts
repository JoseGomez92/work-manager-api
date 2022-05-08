export default class Optional<T> {
    constructor(private readonly value: T | null | undefined) {}

    get(): T | null {
        return this.value ? this.value : null
    }

    isEmpty(): boolean {
        return !this.value
    }
}
