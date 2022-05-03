export default abstract class AggregateRootCollection<T> {
    constructor(private readonly values: Array<T>) {}

    get(): Array<T> {
        return this.values
    }

    isEmpty(): boolean {
        return this.values.length === 0
    }
}
